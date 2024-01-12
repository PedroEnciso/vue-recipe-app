<script setup lang="ts">
import type { Recipe } from "@/types";
const props = defineProps<{ recipes: Recipe[] }>();
</script>

<template>
  <ul class="w-11/12 mx-auto flex flex-col gap-2">
    <li
      class="bg-white py-4 px-4 rounded-lg hover:scale-105 cursor-pointer"
      v-for="recipe in recipes"
    >
      <router-link :to="{ name: 'recipe-detail', params: { id: recipe.id } }">
        <p class="font-semibold text-lg">{{ recipe.name }}</p>
        <div class="pt-1 flex justify-between items-center text-slate-700">
          <p>{{ recipe.ingredients.length }} ingredients</p>
          <p>{{ recipe.cook_time }} mins</p>
        </div>
      </router-link>
    </li>
  </ul>
</template>
