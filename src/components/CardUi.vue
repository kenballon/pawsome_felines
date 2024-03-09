<script setup lang="ts">
const props = defineProps({
  selectedBreed: {
    type: String,
    default: "",
  },
}); 


</script>

<template>
    <div>
        <div class="image">
            <img :src="catBreedImage.url" alt="Breed image" />
            <button class="bg-primary p-2 rounded-sm text-cyan-50 font-light">More Details</button>
        </div>
    </div>
</template>



