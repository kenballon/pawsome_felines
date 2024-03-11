<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import CatBreedSearch from "@/components/CatBreedSearch.vue";
import CardUi from "@/components/CardUi.vue";
import { getRelatedCatBreedImages } from "@/composables/getRelatedCatBreedImages";

const props = defineProps({
  breedID: {
    type: String,
    default: "",
  },
});

interface CatBreedImage {
  id: string;
  url: string;
}

const selectedBreedImageId = ref("");
const selectedBreedId = ref("");
const relatedImages = ref<CatBreedImage[]>([]);

const handleSelectedBreed = async ({
  breedId,
  breedImgId,
}: {
  breedId: string;
  breedImgId: string;
}) => {
  relatedImages.value = [];
  selectedBreedId.value = breedId;
  selectedBreedImageId.value = breedImgId;
  const images = await getRelatedCatBreedImages(breedId);  
  relatedImages.value = images || [];
};

onMounted(() => {
  if (props.breedID) {
    selectedBreedId.value = props.breedID;    
  }
})

</script>

<template>
  <main class="main_home_view">
    <section class="hero_banner">
      <img
        src="@/assets/images/cat_wall.png"
        alt="Cat banner"
        class="w-full h-96 object-cover"
      />
    </section>

    <section class="search container pb-[4rem]">
      <div class="hero-text max-w-[500px] mx-auto mt-5">
        <router-link :to="{ name: 'home' }">
          <h1
            class="text-6xl font-bold font-secondary capitalize text-center text-indigo-50 pt-4 cursor-pointer"
          >
            pawsome feline search
          </h1>
        </router-link>
      </div>

      <CatBreedSearch @selectedBreed="handleSelectedBreed" />
      <div class="cards_wrapper grid gap-2">
        <CardUi
          v-for="(image, index) in relatedImages"
          :key="index"
          :id="image.id"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  text-shadow: 1px 1px 2px darksalmon, 0 0 25px orangered, 0 0 5px palevioletred;
}
.search {
  position: relative;
  margin-top: -220px;
}
.main_home_view {
  min-height: calc(100vh - 10rem);
}
.cards_wrapper {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 0;
}
</style>
