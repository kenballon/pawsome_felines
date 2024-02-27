<script setup lang="ts">
import defaultImage from '@/assets/images/cat-default.webp';
import useCatBreeds from "@/composables/getAllCatBreeds";
import { onMounted } from "vue";

const { breeds, error, fetchBreeds } = useCatBreeds();

onMounted(async () => {
  await fetchBreeds();
});

</script>

<template>
  <main class=" container">
    <h1 class="text-3xl font-bold font-secondary capitalize">You're pawsome feline</h1>
    <select name="catbreedselect" id="catbreedselect">
      <option v-for="breed in breeds" :key="breed.id" :value="breed.id">{{ breed.name }}</option>
    </select>

    <div class="cat_images_wrapper">
      <div class="cat_img_item" v-for="breed in breeds" :key="breed.id">
        <picture>
          <img :src="breed.image && breed.image.url ? breed.image.url : defaultImage" :alt="'photo of a cat ' + breed.name">
        </picture>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cat_images_wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.cat_img_item img{
  width: 100%;  
  height: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
}
</style>
