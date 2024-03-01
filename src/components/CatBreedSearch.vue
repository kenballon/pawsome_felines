<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const isSearchFocused = ref(false);
const searchTerm = ref("");
const emit = defineEmits(["update", "breed-selected"]);

const props = defineProps({
  breeds: {
    type: Array as () => Breed[],
    default: () => [], 
  },
  breedName: {
    type: String,
    default: ''
  }
});

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

const filteredBreeds = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase();

  if (!lowerCaseSearchTerm) {
    return isSearchFocused.value ? props.breeds : [];
  }
  return props.breeds.filter((breed: Breed) => {
    return breed.name.toLowerCase().includes(lowerCaseSearchTerm) && breed.image && breed.image.url;
  });
  
});

const handleSearchFocus = () => {
  isSearchFocused.value = true;
};

const handleSelectedBreed = (breed: Breed) => {
  emit("breed-selected", breed.id);
  setSearchTerm(breed.name);
  isSearchFocused.value = false;
};

const setSearchTerm = (term: string) => {
  searchTerm.value = term; 
};

watch(filteredBreeds, (newVal) => {
  emit("update", newVal);
});

watch(() => props.breedName, (newBreedName) => {
  setSearchTerm(newBreedName);
});

onMounted(() => {
  if (props.breedName) {
    setSearchTerm(props.breedName);
  }
});
</script>

<template>
  <div class="search_input_container flex flex-col relative py-7 max-w-[500px] mx-auto">
    <input
      type="search"
      v-model="searchTerm"
      placeholder="Search for cat breed"
      id="search"
      class="border border-gray-400 w-full px-4 rounded-sm"
      @focus="handleSearchFocus"
      autocomplete="off"      
      aria-label="Search for cat breed"
    />

    <div
      id="breed_results"
      class="border-gray-200 bg-slate-50 shadow-lg shadow-indigo-100/70 rounded-bl-md rounded-br-md"
      v-if="isSearchFocused && filteredBreeds.length > 0"
      role="listbox"
    >
      <ul
        class="breed_results_list w-full flex flex-col gap-1 max-h-[350px] overflow-auto"
      >
        <li
          class="breed_item relative p-3 hover:bg-indigo-100 cursor-pointer"
          v-for="breed in filteredBreeds"
          :key="breed.id"
          @click="handleSelectedBreed(breed)"
          role="option"        
        >
          <div class="relative flex w-full py-1 justify-between items-center" >
            <div>
              <span class="block text-sm font-semibold text-gray-800">
                {{ breed.name }}
              </span>
            </div>
            <div class="cat_thumb">
              <picture>
                <img
                  :src="breed.image.url ? breed.image.url : '/src/assets/images/cat-default.webp'"
                  alt="Breed image"
                  loading="lazy"
                  class="cat_search_res_img object-cover rounded-md aspect-[1/1]"
                />
              </picture>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cat_search_res_img {
  max-width: 40px;
  max-height: 40px;
}

input[type="search"] {
  height: 72px;
}

#breed_results {
  position: absolute;
  width: 100%;
  z-index: 5;
  backdrop-filter: blur(50px);
  top: 6.45rem;
}
</style>
