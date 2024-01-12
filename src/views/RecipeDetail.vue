<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useRecipeStore } from "@/stores/recipes";
import IngredientList from "@/components/RecipeDetail/IngredientList.vue";
import ErrorSection from "@/components/RecipeDetail/ErrorSection.vue";
import RecipeTitleSection from "@/components/RecipeDetail/RecipeTitleSection.vue";
import { storeToRefs } from "pinia";

const route = useRoute();
const id = route.params.id as string;

const { getRecipeById } = storeToRefs(useRecipeStore());
const recipe = getRecipeById.value(id);

const router = useRouter();
const { deleteRecipe } = useRecipeStore();
const handleDeleteTask = (id: string) => {
  const confirm = window.confirm(
    "Are you sure you want to delete this task? This action cannot be reversed."
  );
  if (confirm) {
    deleteRecipe(id);
    router.push("/recipes");
  }
};
</script>

<template>
  <ErrorSection v-if="!recipe" />
  <RecipeTitleSection
    v-if="recipe"
    :name="recipe.name"
    :cook_time="recipe.cook_time"
    :deleteTask="handleDeleteTask.bind(null, recipe.id)"
  />
  <IngredientList v-if="recipe" :ingredients="recipe.ingredients" />
</template>
