<script setup lang="ts">
import useCatBreeds from "@/composables/getAllCatBreeds";
import CatBreedSearch from "@/components/CatBreedSearch.vue";
import { getRelatedCatBreedImages } from "@/composables/getRelatedCatBreedImages";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface BreedDetail {
  id: string;
  url: string;
  breeds: {
    id: string;
    name: string;
    description: string;
    temperament: string;
  }[];
}

const { breeds, error, fetchBreeds } = useCatBreeds();
const searchResults = ref<BreedDetail[] | null>(null);
const breedDetails = ref<BreedDetail[]>([]);

const updateSearchResults = (newResults: BreedDetail[]) => {
  searchResults.value = newResults;
};

const allMatchingBreed = async (breedId: string) => {
  const searchMatches = searchResults.value?.filter(
    (breed) => breed.id === breedId
  );

  if (searchMatches && searchMatches.length > 0) {
    try {
      const response = await getRelatedCatBreedImages(breedId);

      response.forEach((breed) => {
        breedDetails.value.push({
          id: breed.id,
          url: breed.url,
          breeds: breed.breeds.map((breed) => {
            return {
              id: breed.id,
              name: breed.name,
              description: breed.description,
              temperament: breed.temperament,
            };
          }),
        });
      });
    } catch (err: any) {
      error.value = err;
    }
  }
};

const showCatBreedDetailsView = (cardId:string) => {
  router.push({ name: "CatBreed", params: { breedID: cardId } });
};

onMounted(async () => {
  await fetchBreeds();
});
</script>

<template>
  <main class="main_home_view">
    <section class="hero_banner">
      <img
        src="@/assets/images/hero_banner.jpg"
        alt="Cat banner"
        class="w-full h-96 object-cover"
      />
    </section>
    

   <section class="search container">
    <div class="hero-text  max-w-[500px] mx-auto mt-5">
      <h1 class="text-6xl font-bold font-secondary capitalize text-center pt-4">
        Your pawsome feline
      </h1>
    </div>
    <CatBreedSearch
      :breeds="breeds"
      @update="updateSearchResults"
      @breed-selected="allMatchingBreed"
    />
    <div class="cat_items" v-if="breedDetails && breedDetails.length > 0">
      <div class="image" v-for="catBreed in breedDetails" :key="catBreed.id">
        <img :src="catBreed.url" alt="Breed image" loading="lazy" />
        <button
          :id="catBreed.id"
          class="bg-primary p-2 rounded-sm text-cyan-50 font-light"
          @click="showCatBreedDetailsView(catBreed.id)"
        >
          More Details
        </button>
      </div>
    </div>
   </section>
  </main>
</template>

<style scoped>
.main_home_view {
  min-height: calc(100vh - 10rem);
}
.cat_items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
