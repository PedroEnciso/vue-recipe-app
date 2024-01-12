<script setup lang="ts">
const props = defineProps<{ ingredients: string[] }>();
</script>

<template>
  <section class="bg-white rounded-t-3xl pb-12 pt-6 mt-4">
    <div class="w-11/12 mx-auto">
      <p class="text-xl font-semibold">Ingredients</p>
      <ul class="flex flex-col gap-1 mt-2">
        <li
          class="py-2 border-b-2 border-amber-400 border-opacity-30"
          v-for="ingredient in ingredients"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>
  </section>
</template>
