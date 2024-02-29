<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
import useCatBreedDetails from "../composables/getCatBreedDetails";

const props = defineProps({
  breedID: {
    type: String,
    required: true,
  },
});

const { breedDetails, error, fetchBreedDetails } = useCatBreedDetails(
  props.breedID
);

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await fetchBreedDetails();
});
</script>

<template>
  <div class="container breed">
    <h1 class="text-4xl">breed detailed view</h1>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>

    <div class="cat_dets">
      <div class="wrapper" v-for="cat in breedDetails" :key="cat.id">
        <img :src="cat.url" :alt="cat.breeds[0].name" width="400">
        <h2 class=" text-4xl font-bold text-gray-600">{{ cat.breeds[0].name }}</h2>
        <h3>Origin: {{ cat.breeds[0].origin }}</h3>
        <p>{{ cat.breeds[0].temperament }}</p>
        <p>{{ cat.breeds[0].description }}</p>
        <a :href="cat.breeds[0].wikipedia_url">read more about {{ cat.breeds[0].name }}</a>
        <button @click="goBack">Go Back</button>
      </div>
    </div>
  </div>


</template>
