<script setup lang="ts">
import { onMounted } from "vue";
import useCatBreedDetails from '../composables/getCatBreedDetails';

const props = defineProps({
  breedID: {
    type: String,
    required: true,
  }
});

const { breedDetails, error, fetchBreedDetails  } = useCatBreedDetails(props.breedID);

onMounted(async () => {
  await fetchBreedDetails();  
});

</script>


<template>
  <div class="container breed">

    <h1 class=" text-4xl">breed detailed view</h1>
 
  </div>
</template>