<script setup lang="ts">
import  useCatBreeds  from "@/composables/getAllCatBreeds";
import { onMounted } from "vue";

const { breeds, error, fetchBreeds} = useCatBreeds();

onMounted(async() => {
  await fetchBreeds();  
});

</script>

<template>
  <main class=" container">
    <h1 class="text-3xl font-bold font-secondary capitalize">You're pawsome feline</h1>
    <select name="catbreedselect" id="catbreedselect">
      <option v-for="breed in breeds" :key="breed.id" :value="breed.id">{{ breed.name }}</option>
    </select>
  </main>
</template>
