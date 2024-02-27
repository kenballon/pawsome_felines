<script setup lang="ts">
import useCatBreeds from "@/composables/getAllCatBreeds";
import CatBreedSearch from "@/components/CatBreedSearch.vue";
import { getRelatedCatBreedImages } from "@/composables/getRelatedCatBreedImages";
import { onMounted, ref } from "vue";

interface BreedDetail {
  id: string;
  url: string;
  breeds: { id: string; name: string; description: string; temperament:string; }[];
}

const breedDetails = ref<BreedDetail[]>([]);

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
      response.forEach((breed) => {
        breedDetails.value.push({
          id: breed.id,
          url: breed.url,
          breeds: breed.breeds.map(breed =>{
            return {
              id: breed.id,
              name: breed.name,
              description: breed.description,
              temperament: breed.temperament
            }
          })
        });
      });
    } catch (err: any) {
      error.value = err;
    }
  }

};

const showDetails = async (mimingDets:string) => {
  try {
    const match = breedDetails.value?.filter((breed) => breed?.id === mimingDets);
    if (match && match.length > 0) {
      const breed = match[0].breeds[0];
      if (breed) {
        const catDetails = {
          name: breed.name,
          description: breed.description,
          image: match[0].url,
          id: match[0].id,
          temperament: match[0].breeds[0].temperament
        };

        console.log(catDetails);
      } else {
        console.error('Breed is undefined or null');
      }
    }
  } catch (error) {
    console.error('Error in showDetails:', error);
  }
};


onMounted(async () => {
  await fetchBreeds();
});
</script>

<template>
  <main class="container">
    <h1 class="text-3xl font-bold font-secondary capitalize">
      Your pawsome feline
    </h1>

    <CatBreedSearch :breeds="breeds" @update="updateSearchResults" />
    <ul class="breed_wrapper cursor-pointer">
      <li
        class="breed_item"
        v-if="searchResults && searchResults.length"
        v-for="breed in searchResults"
        :key="breed.id"
        @click="allMatchingBreed(breed)"
      >
        <div class="details">
          {{ breed.name }}
        </div>
      </li>
    </ul>
    <div class="cat_items">
      <div class="image" v-for="(catBreed) in breedDetails" :key="catBreed.id">
        <img :src="catBreed.url" alt="Breed image" loading="lazy"/>
        <button :id="catBreed.breeds[0].id"
          class="bg-primary p-2 rounded-sm text-cyan-50 font-light"
          @click="showDetails(catBreed.id)"
        >
          More Details
        </button>
      </div>
    </div>
    <div class="loadmore">
      <button>Load More</button>
    </div>
  </main>
</template>

<style scoped>
.cat_items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  padding: 0;
}
.cat_items .image {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  align-items: center;
}

.cat_items .image img {
  aspect-ratio: 2/3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.cat_items .image button {
  position: absolute;
  bottom: 2rem;
  padding: 1rem;
  border-radius: 4px;
  width: calc(100% - 1rem);
}
.cat_items .image button:hover {
  background-color: rgb(182, 72, 72);
}
</style>
