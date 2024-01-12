import { defineStore } from "pinia";
import type { Recipe } from "@/types";

const initialState = [
  {
    id: "1",
    name: "Chicken Enchiladas",
    ingredients: [
      "shredded cooked chicken",
      "tortillas",
      "enchilada sauce",
      "black beans",
      "corn",
      "cheese",
      "cilantro",
      "sour cream",
    ],
    cook_time: 40,
  },
  {
    id: "2",
    name: "Spaghetti Bolognese",
    ingredients: [
      "ground beef",
      "onions",
      "garlic",
      "tomato sauce",
      "red wine",
      "carrots",
      "celery",
      "spaghetti",
      "parmesan cheese",
    ],
    cook_time: 45,
  },
  {
    id: "3",
    name: "Chicken Tikka Masala",
    ingredients: [
      "chicken thighs",
      "yogurt",
      "tomato puree",
      "onions",
      "garlic",
      "ginger",
      "garam masala",
      "cumin",
      "coriander",
      "cream",
    ],
    cook_time: 50,
  },
  {
    id: "4",
    name: "Japanese Ramen with Miso Broth",
    ingredients: [
      "ramen noodles",
      "miso paste",
      "soy sauce",
      "seaweed",
      "tofu",
      "green onions",
      "shiitake mushrooms",
      "boiled egg",
    ],
    cook_time: 35,
  },
];

export const useRecipeStore = defineStore("recipes", {
  state: (): State => ({
    recipes: undefined,
  }),
  getters: {
    getRecipeById: (state) => {
      return (recipeId: string) => {
        if (state.recipes) {
          return state.recipes.find((recipe) => recipe.id === recipeId);
        } else {
          return undefined;
        }
      };
    },
  },
  actions: {
    getRecipes() {
      const recipeString = localStorage.getItem("recipes");
      if (recipeString) this.recipes = JSON.parse(recipeString);
    },
    setRecipes(recipes: Recipe[]) {
      const recipeString = JSON.stringify(recipes);
      // update localStorage with current recipe state
      localStorage.setItem("recipes", recipeString);
    },
    addRecipe(recipe: Recipe) {
      if (!this.recipes) {
        this.recipes = [recipe];
        this.setRecipes([recipe]);
      } else {
        // update recipes state
        this.recipes = this.recipes.concat(recipe);
        // update db (localStorage)
        this.setRecipes(this.recipes);
      }
    },
    deleteRecipe(recipeId: string) {
      if (!this.recipes) return;
      // update recipes state
      this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
      // update db (localStorage)
      this.setRecipes(this.recipes);
    },
    initiateRecipeState() {
      this.setRecipes(initialState);
    },
  },
});

interface State {
  recipes: Recipe[] | undefined;
}
