<script setup lang="ts">
import useCatBreeds from "@/composables/getAllCatBreeds";
import CatBreedSearch from "@/components/CatBreedSearch.vue";
import { getRelatedCatBreedImages } from "@/composables/getRelatedCatBreedImages";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  breedID: {
    type: String,
    required: true,
  },
});

interface BreedDetail {
  id: string;
  url: string;
}

const { breeds, error, fetchBreeds } = useCatBreeds();
const searchResults = ref<BreedDetail[] | null>(null);
const breedDetails = ref<BreedDetail[]>([]);
const displayCount = ref(5);
const isLoading = ref(false);

const updateSearchResults = (newResults: BreedDetail[]) => {
  searchResults.value = newResults;
};

const allMatchingBreed = async (breedId: string) => {
  breedDetails.value = [];
  displayCount.value = 5;
  isLoading.value = true;

  const searchMatches = searchResults.value?.filter(
    (breed) => breed.id === breedId
  );

  if (searchMatches && searchMatches.length > 0) {
    try {
      const details = await fetchAndProcessBreedDetails(breedId);
      breedDetails.value = details;
    } catch (err: any) {
      error.value = err;
    }
  }

  isLoading.value = false;
};

const fetchAndProcessBreedDetails = async (breedId: string) => {
  
  const response = await getRelatedCatBreedImages(breedId);

  if (!response) {
    throw new Error('Response is undefined');
  }

  return response.map((breed) => ({
    id: breed.id,
    url: breed.url,
    breeds: breed.breeds.map((breed) => ({
      id: breed.id,
      name: breed.name,
      description: breed.description,
      temperament: breed.temperament,
    })),
  }));
};


const showCatBreedDetailsView = (catBreedID: string) => {
  router.push({ name: "CatBreed", params: { catBreedID: catBreedID } });
};

const loadMore = () => {
  displayCount.value += 5;
};

onMounted(async () => {
  isLoading.value = true;
  try {
    await fetchBreeds();
  } catch (err: any) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
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
      <div class="hero-text max-w-[500px] mx-auto mt-5">
        <h1
          class="text-6xl font-bold font-secondary capitalize text-center text-indigo-50 pt-4 text-shadow-default"
        >
          pawsome feline search
        </h1>
      </div>
      <CatBreedSearch
        :breeds="breeds"
        @update="updateSearchResults"
        @breed-selected="allMatchingBreed"
      />

      <div class="flex flex-col gap-3 pb-[10rem] items-center">
        <div v-if="isLoading">
        <h2 class="text-3xl font-bold text-gray-500">We're calling our cat for their photo... 😇</h2>
        </div>
        <div v-else>
          <div class="cat_items" v-if="breedDetails && breedDetails.length > 0">
          <div
            class="image"
            v-for="(catBreed, index) in breedDetails.slice(0, displayCount)"
            :key="index"
          >
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
        </div>

        <div class="load_more_btn_wrapper w-full max-w-[450px]">
          <button
            v-if="breedDetails.length > displayCount"
            class="bg-primary p-2 h-[56px] hover:bg-secondary hover:text-pink-950 mt-7 rounded-sm text-cyan-50 font-light w-full"
            @click="loadMore"
          >
            Load More
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.search {
  position: relative;
  margin-top: -220px;
}
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
  background-color: #b64848;
}
</style>
