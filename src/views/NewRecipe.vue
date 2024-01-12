<script setup lang="ts">
import { ref } from "vue";
import { useRecipeStore } from "@/stores/recipes";
import Button from "@/components/UI/Button.vue";
import type { Recipe } from "@/types";

const store = useRecipeStore();

const recipeName = ref("");
const recipeCookTime = ref(0);
const recipeIngredients = ref([""]);

const recipeNameError = ref<string | null>(null);
const recipeCookTimeError = ref<string | null>(null);
const recipeIngredientsError = ref<string | null>(null);
const confirmationMessage = ref<string | null>(null);
const newRecipeID = ref("");

const addInput = () => {
  recipeIngredients.value = recipeIngredients.value.concat("");
};

const removeInput = (id: number) => {
  recipeIngredients.value = recipeIngredients.value.filter(
    (ing, index) => index !== id
  );
};

const validateInputs = (): boolean => {
  let errorCount = 0;

  if (recipeName.value === "") {
    recipeNameError.value = "Please include a recipe name.";
    errorCount++;
  }

  if (recipeCookTime.value === 0) {
    recipeCookTimeError.value = "Please include a cook time.";
    errorCount++;
  }

  if (recipeIngredients.value.join("") === "") {
    console.log(
      recipeIngredients.value.join(""),
      recipeIngredients.value.join("") === ""
    );
    recipeIngredientsError.value = "Please include at least one ingredient.";
    errorCount++;
  }

  if (errorCount > 0) {
    return false;
  }
  return true;
};

const formInputReset = () => {
  recipeName.value = "";
  recipeCookTime.value = 0;
  recipeIngredients.value = [""];
};

const submit = (e: Event) => {
  e.preventDefault();
  recipeNameError.value = null;
  recipeCookTimeError.value = null;
  recipeIngredientsError.value = null;
  confirmationMessage.value = null;

  if (!validateInputs) {
    return;
  }

  const newRecipe: Recipe = {
    id: Date.now().toString(),
    name: recipeName.value,
    cook_time: recipeCookTime.value,
    ingredients: recipeIngredients.value,
  };

  store.addRecipe(newRecipe);
  newRecipeID.value = newRecipe.id;
  confirmationMessage.value = `Successfully added ${newRecipe.name} to your recipes!`;
  formInputReset();
};
</script>

<template>
  <section class="w-11/12 mx-auto mb-4">
    <router-link to="/recipes" class="text-slate-700"
      >&larr; Back to recipes</router-link
    >
    <h2 class="text-2xl font-bold text-center">New recipe</h2>
    <form class="bg-white px-4 py-6 flex flex-col gap-4 mt-8 rounded-lg">
      <div class="flex flex-col gap-1">
        <label for="name" class="text-lg font-semibold">Recipe name</label>
        <input
          type="text"
          id="name"
          class="bg-slate-100 px-2 py-1 rounded-lg"
          v-model="recipeName"
        />
        <p v-if="recipeNameError" class="text-red-700 font-semibold">
          {{ recipeNameError }}
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <label for="cook_time" class="text-lg font-semibold"
          >Cooking time <span class="font-normal">(minutes)</span></label
        >
        <input
          type="number"
          min="0"
          id="cook_time"
          class="bg-slate-100 px-2 py-1 rounded-lg grow"
          v-model="recipeCookTime"
        />
        <p v-if="recipeCookTimeError" class="text-red-700 font-semibold">
          {{ recipeCookTimeError }}
        </p>
      </div>
      <fieldset class="flex flex-col gap-1">
        <legend class="mb-2 text-lg font-semibold">Ingredients</legend>
        <div v-for="input in recipeIngredients" class="flex gap-6 items-center">
          <input
            type="text"
            :id="`ingredient_${recipeIngredients.indexOf(input)}`"
            class="bg-slate-100 px-2 py-1 rounded-lg grow"
            v-model="recipeIngredients[recipeIngredients.indexOf(input)]"
          />
          <Button
            buttonText="remove"
            theme="danger"
            :clickHandler="
              removeInput.bind(null, recipeIngredients.indexOf(input))
            "
          />
        </div>
        <p v-if="recipeIngredientsError" class="text-red-700 font-semibold">
          {{ recipeIngredientsError }}
        </p>
        <Button
          buttonText="+ Add an ingredient"
          theme="secondary"
          :clickHandler="addInput"
        />
      </fieldset>
      <Button
        buttonText="Add recipe"
        theme="primary"
        type="submit"
        :clickHandler="submit"
      />
      <div v-if="confirmationMessage">
        <p class="font-semibold text-green-700">{{ confirmationMessage }}</p>
        <router-link
          :to="{ name: 'recipe-detail', params: { id: newRecipeID } }"
          >View recipe &#8594;
        </router-link>
      </div>
    </form>
  </section>
</template>
