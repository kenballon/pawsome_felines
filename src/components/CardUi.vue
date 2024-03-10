<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import getCatBreedDetails from "@/composables/getCatBreedDetails";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const router = useRouter();
const { breedDetails, fetchBreedDetails } = getCatBreedDetails(props.id);
const isLoading = ref(true);

onMounted(async () => {
  if (props.id) {
    await fetchBreedDetails();
    isLoading.value = false;
  }
});

const catBreedImage = computed(() => {
  return breedDetails.value[0]?.url || '';
});

const handleMoreDetails = () => {
  router.push({ name: "CatBreed", params: { catBreedID: props.id } });
};

const handleImageLoad = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.classList.add('loaded');
};
</script>

<template>
  <div class="image" v-show="props.id">
    <img
      v-if="isLoading"
      src="@/assets/images/cat_wall.jpeg"
      alt="Loading..."
    />
    <img
      class="cat_image fade-in"
      :src="catBreedImage"
      alt="Breed image"
      width="250px"
      @load="handleImageLoad"
    />
    <button
      class="bg-primary p-2 rounded-sm text-cyan-50 font-light"
      @click="handleMoreDetails"
    >
      More Details
    </button>
  </div>
</template>

<style scoped>
.image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;
}
.cat_image {
  width: 100%;
  height: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 10px;
}

button {
  width: 100%;
}

.fade-in {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.fade-in.loaded {
  opacity: 1;
}
</style>
