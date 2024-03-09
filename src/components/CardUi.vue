<script setup lang="ts">
import {ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import getCatBreedDetails from "@/composables/getCatBreedDetails";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
}); 

const router = useRouter();
const {breedDetails, fetchBreedDetails} = getCatBreedDetails(props.id);

onMounted(() => {
  if(props.id) {
    fetchBreedDetails();
  }
});

const catBreedImage = computed(() => {
  return breedDetails.value[0]?.url || '';
});

const handleMoreDetails = () => {
  router.push({ name: "CatBreed", params: { catBreedID: props.id } });
};

</script>

<template>
    <div class="image" v-show="props.id" :id="props.id">
            <img class="cat_image" :src="catBreedImage" alt="Breed image" />
            <button class="bg-primary p-2 rounded-sm text-cyan-50 font-light" @click="handleMoreDetails">More Details</button>
        </div>
</template>

<style scoped>
.image{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;;
}
.cat_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

button{
  width: 100%;
}
</style>

