<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink :to="{name: 'CatBreed'}">cat breed detailed</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>
