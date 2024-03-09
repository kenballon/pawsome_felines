<script setup lang="ts">
import CatBreedSearch from "@/components/CatBreedSearch.vue";

</script>

<template>
  <main class="main_home_view">
    <section class="hero_banner">
      <img
        src="@/assets/images/hero_cat_img.jpeg"
        alt="Cat banner"
        class="w-full h-96 object-cover"
      />
    </section>

    <section class="search container">
      <div class="hero-text max-w-[500px] mx-auto mt-5">
        <router-link :to="{ name: 'home' }">
          <h1
            class="text-6xl font-bold font-secondary capitalize text-center text-indigo-50 pt-4 text-shadow-default cursor-pointer"
          >
            pawsome feline search
          </h1>
        </router-link>
      </div>

      <CatBreedSearch />

      <!-- <div class="flex flex-col gap-3 pb-[10rem] items-center">
        <div v-show="isLoading">
          <h2 class="text-3xl font-bold text-gray-500">
            We're calling our cat for their photo... 😇
          </h2>
        </div>
        <div v-show="!isLoading">
          <div class="cat_items" v-if="breedDetails && breedDetails.length > 0">
            <div
              class="image"
              v-for="(catBreed, index) in breedDetails.slice(0, displayCount)"
              :key="index"
            >
              <img :src="catBreed.url" alt="Breed image" />
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
            v-show="breedDetails.length > displayCount"
            class="bg-primary p-2 h-[56px] hover:bg-secondary hover:text-pink-950 mt-7 rounded-sm text-cyan-50 font-light w-full"
            @click="loadMore"
          >
            Load More
          </button>
        </div>
      </div> -->
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
