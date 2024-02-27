<script setup lang="ts">
import  useCatBreeds  from "@/composables/getAllCatBreeds";
import { onMounted } from "vue";

const { breeds, error, fetchBreeds} = useCatBreeds();

onMounted(async() => {
  await fetchBreeds();

  breeds.value.forEach((breed) => {
    console.log(`Breed: ${breed.name}, Breed ID: ${breed.id}`);
  });
});



</script>

<template>
  <main>
    <h1>You're pawsome feline</h1>
  </main>
</template>
