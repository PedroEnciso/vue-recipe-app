<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import RecipeList from "@/components/RecipeCollection/RecipeList.vue";
import Button from "@/components/UI/Button.vue";
import { useRecipeStore } from "@/stores/recipes";

const router = useRouter();
const { recipes } = storeToRefs(useRecipeStore());

const handleNewRecipe = () => {
  router.push("/recipes/new");
};
</script>

<template>
  <div class="w-11/12 mx-auto mb-4 flex justify-between items-center">
    <h2 class="text-2xl font-bold">Your recipes</h2>
    <Button
      buttonText="+ New"
      theme="primary"
      :clickHandler="handleNewRecipe"
    />
  </div>
  <p v-if="!recipes || recipes.length === 0" class="text-lg font-bold">
    There are no availabe recipes.
  </p>
  <RecipeList v-else :recipes="recipes" />
</template>

<!-- 
  DATA:
  const recipes = [
  {
    name: "Grilled Lemon Herb Chicken",
    ingredients: [
      "boneless chicken breasts",
      "lemons",
      "olive oil",
      "garlic",
      "rosemary",
      "salt",
      "black pepper",
    ],
    cook_time: 30,
    id: "0",
  },
  {
    name: "Vegetarian Quinoa Salad",
    ingredients: [
      "quinoa",
      "cherry tomatoes",
      "cucumber",
      "red onion",
      "feta cheese",
      "olive oil",
      "balsamic vinegar",
      "salt",
      "pepper",
    ],
    cook_time: 20,
    id: "1",
  },
  {
    name: "Chocolate Banana Smoothie",
    ingredients: [
      "bananas",
      "milk",
      "cocoa powder",
      "Greek yogurt",
      "honey",
      "ice cubes",
    ],
    cook_time: 10,
    id: "2",
  },
];

 -->
