<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container">

    <div class="wrapper py-[2.5rem]">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink :to="{name: 'CatBreed'}">cat breed detailed</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>
