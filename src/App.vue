<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/stores/recipes";

// call get recipes on initial load
const { getRecipes, initiateRecipeState } = useRecipeStore();
getRecipes();
// check if any recipes were loaded from localStorage
const { recipes } = storeToRefs(useRecipeStore());

if (!recipes.value) {
  // if recipes is undefined, call initializeRecipeState
  initiateRecipeState();
}
</script>

<template>
  <header class="pt-12 pb-6 text-center bg-slate-900">
    <h1 class="text-4xl font-semibold text-slate-50">Flavorfolio</h1>
    <p class="text-slate-200 mt-2">
      Effortlessly document, save, and revisit your favorite recipes!
    </p>
  </header>

  <main class="pt-8 text-slate-900">
    <router-view></router-view>
  </main>
</template>
