<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import getAllCatBreeds from "@/composables/getAllCatBreeds";

// Defined props
const props = defineProps({
  searchTerm: {
    type: String,
    default: "",
  },
});

// Interfaces
interface Breed {
  id: string;
  name: string;
  reference_image_id: string;
}

// Initialize refs
const searchTerm = ref(props.searchTerm);
const emit = defineEmits(["selectedBreed"]);
const { breeds, fetchBreeds } = getAllCatBreeds();
const inputFocused = ref(false);
const filteredBreeds = ref<Breed[]>([]);
let blurTimeout: any = null;

// Fetch breeds on mount
onMounted(fetchBreeds);

// Watch for changes in searchTerm and filter breeds
watch([searchTerm, breeds], ([newVal, newBreeds]) => {
  if (newVal) {
    filteredBreeds.value = breeds.value.filter((breed) =>
      breed.name.toLowerCase().includes(newVal.toLowerCase())
    );
  } else {
    filteredBreeds.value = newBreeds;
  }
});

// Handle breed selection
const breedSelected = (breed: Breed) => {
  searchTerm.value = breed.name;
  inputFocused.value = false;
  emit("selectedBreed", {breedId: breed.id, breedImgId: breed.reference_image_id}); 
};

// Handle input blur
const handleBlur = () => {
  blurTimeout = setTimeout(() => {
    inputFocused.value = false;
  }, 200) as any;
};

// Handle input focus
const handleFocus = () => {
  clearTimeout(blurTimeout);
  inputFocused.value = true;
  if (breeds.value.length === 0) {
    fetchBreeds();
  }
  
};

</script>

<template>
  <div
    class="search_input_container flex flex-col relative py-7 max-w-[500px] mx-auto"
  >
    <input
      type="search"
      v-model="searchTerm"
      placeholder="Search for cat breed"
      id="search"
      class="border border-gray-400 w-full px-4 rounded-sm"
      autocomplete="off"
      aria-label="Search for cat breed"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div
      id="breed_results"
      class="border-gray-200 bg-slate-50 shadow-lg shadow-indigo-100/70 rounded-bl-md rounded-br-md"
      role="listbox"
      v-show="inputFocused"
    >
      <ul
        class="breed_results_list w-full flex flex-col gap-1 max-h-[350px] overflow-auto"
      >
        <li
          class="breed_item relative p-3 hover:bg-indigo-100 cursor-pointer"
          v-for="breed in filteredBreeds"
          :key="breed.id"
          @click="breedSelected(breed)"
          role="option"
        >
          <div class="relative flex w-full py-1 justify-between items-center">
            <div>
              <span class="block text-sm font-semibold text-gray-800">
                {{ breed.name }}
              </span>
            </div>
            <!-- <div class="cat_thumb">
              <picture>
                <img
                :src="breed.image.url"
                  :alt="`Breed image of ${breed.name}`"
                 
                  loading="lazy"
                  class="cat_search_res_img object-cover rounded-md aspect-[1/1]"
                />
              </picture>
            </div> -->
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
