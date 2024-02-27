<script setup lang="ts">
import { ref, computed, defineProps, watch } from "vue";

interface Breed {
  id: string;
  name: string;
  // add other properties if needed
}

const props = defineProps({
  breeds: {
    type: Array as () => Breed[],
    default: () => [], // provide a default value
  },
});

const searchTerm = ref("");
const emit = defineEmits(["update"]);

const filteredBreeds = computed(() => {
  if (!searchTerm.value) {
    return [];
  }
  return props.breeds.filter((breed: Breed) => {
    return breed.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const handleClick = (breed: Breed) => {
  console.log(`Clicked on breed: ${breed.name}`);
};

watch(filteredBreeds, (newVal, oldVal) => {
  emit("update", newVal);
});
</script>

<template>
  <div>
    <input
      type="search"
      v-model="searchTerm"
      placeholder="Search for cat breed"
      class="p-2"
    />
    <!-- <ul>
      <li
        v-for="breed in filteredBreeds"
        :key="breed.id"
        @click="handleClick(breed)"
      >
        {{ breed.name }}
      </li>
    </ul> -->
  </div>
</template>
