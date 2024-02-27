<script setup lang="ts">
import useCatBreeds from "@/composables/getAllCatBreeds";
import CatBreedSearch from "@/components/CatBreedSearch.vue";
import { getRelatedCatBreedImages } from '@/composables/getRelatedCatBreedImages';
import { onMounted, ref } from "vue";

const images = ref<string[]>([]);

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

const { breeds, error, fetchBreeds } = useCatBreeds();
const searchResults = ref<Breed[] | null>(null);


const updateSearchResults = (newResults: Breed[]) => {
  searchResults.value = newResults;
};

const allMatchingBreed = async (clickedBreed: Breed) => {
  const matches = searchResults.value?.filter(
    (breed) => breed.id === clickedBreed.id
  );
  if (matches && matches.length > 0) {
    try {
      const response = await getRelatedCatBreedImages(clickedBreed.id);    
      images.value = response.map((el: { url: string }) => el.url);
    } catch (err: any) {
      error.value = err;
    }
  }
};

onMounted(async () => {
  await fetchBreeds();
  // console.log(breeds.value);
});
</script>

<template>
  <main class="container">
    <h1 class="text-3xl font-bold font-secondary capitalize">
      You're pawsome feline
    </h1>

    <CatBreedSearch :breeds="breeds" @update="updateSearchResults" />
    <ul class="breed_wrapper cursor-pointer">
      <li class="breed_item"
        v-if="searchResults && searchResults.length"
        v-for="breed in searchResults"
        :key="breed.id"
        @click="allMatchingBreed(breed)"
      >
        <div class="details">
          {{ breed.name }} | {{ breed.id.toLocaleUpperCase() }}
        </div>
        <div class="cat_items">
          <div class="image" v-for="(url, index) in images" :key="index">
            <img :src="url" alt="Breed image" />
            <button>More Details</button>
          </div>
          
        </div>
        
      </li>
    </ul>
    <div class="loadmore">
          <button>Load More</button>
        </div>
  </main>
</template>

<style scoped>
.cat_items{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap:1rem;
  padding: 0;
}
.cat_items img{
  aspect-ratio: 2/3;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
