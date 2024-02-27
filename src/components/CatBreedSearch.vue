<script setup lang="ts">
import { ref, computed, defineProps, watch } from "vue";

const props = defineProps({
  breeds: Array,
});

const searchTerm = ref("");
const emit = defineEmits(["update"]);

const filteredBreeds = computed(() => {
  if (!searchTerm.value) {
    return [];
  }
  return props.breeds.filter((breed) => {
    return breed.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

watch(filteredBreeds, (newVal, oldVal) => {
  emit("update", newVal);
});

</script>

<template>
  <div>
    <input type="search" v-model="searchTerm" placeholder="Search for cat breed" class="p-2">
    <select name="catbreedselect" id="catbreedselect">
      <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
        {{ breed.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
