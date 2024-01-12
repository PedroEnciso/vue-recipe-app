<script setup lang="ts">
const props = defineProps<{
  name: string;
  cook_time: number;
  deleteTask: () => void;
}>();
import Button from "@/components/UI/Button.vue";
</script>

<template>
  <section class="w-11/12 mx-auto">
    <div class="flex justify-between items-center">
      <router-link to="/recipes" class="text-slate-700"
        >&larr; Back to recipes</router-link
      >
      <Button
        buttonText="Delete recipe"
        :clickHandler="deleteTask"
        theme="danger"
      />
    </div>

    <h2 class="text-2xl font-bold mt-4">
      {{ name }}
    </h2>
    <p class="mt-2">Cook time: {{ cook_time }} mins</p>
  </section>
</template>
