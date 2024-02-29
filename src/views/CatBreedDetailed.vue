<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useCatBreedDetails from "../composables/getCatBreedDetails";

const props = defineProps({
  catBreedID: {
    type: String,
    required: true,
  },
});

const { breedDetails, error, fetchBreedDetails } = useCatBreedDetails(
  props.catBreedID
);

const router = useRouter();

const goBack = (breedId: string) => {
  router.push({ name: "home", params: { breedID: breedId } });
  console.log(breedId);
  
};

onMounted(async () => {
  await fetchBreedDetails();
});
</script>

<template>
  <div class="container breed flex items-center w-full">
    <div class="cat_detail_wrapper max-w-[600px] mx-auto">
      <div v-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div class="cat_dets flex flex-col items-center">
        <div
          class="wrapper flex flex-col gap-4"
          v-for="cat in breedDetails"
          :key="cat.id" :data-breed="cat.breeds[0].id"
        >
          <div class="img_wrapper relative">
            <img
              :src="cat.url"
              :alt="cat.breeds[0].name"
              width="400"
              class="cat_img_detailed w-full object-cover rounded-md"
            />
            <button
              @click="goBack(cat.breeds[0].id)"
              class="goback_btn bg-slate-100 hover:bg-secondary border-gray-700 rounded-md py-3 px-8 text-gray-900"
            >
              Go Back
            </button>
          </div>
          <div class="breed_text_details flex flex-col gap-3">
            <div class="headline_block">
              <h1 class="text-4xl font-bold text-gray-800">
                {{ cat.breeds[0].name }}
              </h1>
              <h2 class="font-semibold text-gray-600 text-xl my-2">
                Origin: {{ cat.breeds[0].origin }}
              </h2>
              <h3 class="font-medium text-gray-600">
                {{ cat.breeds[0].temperament }}
              </h3>
            </div>
            <div class="desc_block py-3">
              <p class="text-gray-600 font-light pb-4 text-lg">
                {{ cat.breeds[0].description }}
              </p>
              <a
                :href="cat.breeds[0].wikipedia_url"
                class="text-indigo-700 hover:text-indigo-900 hover:underline capitalize"
                target="_blank"
                >read more...</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breed {
  min-height: calc(100vh - 4rem);
}
.goback_btn {
  border: 1px solid #c7c7c7;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}

.cat_img_detailed{
  aspect-ratio: 5/3;
  object-position: top;
}
</style>
