import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import RecipeCollection from "@/views/RecipeCollection.vue";
import RecipeDetail from "@/views/RecipeDetail.vue";
import NewRecipe from "@/views/NewRecipe.vue";
import "./index.css";

const routes = [
  { path: "/", redirect: "/recipes" },
  { path: "/recipes", name: "recipes", component: RecipeCollection },
  { path: "/recipes/:id", name: "recipe-detail", component: RecipeDetail },
  { path: "/recipes/new", name: "new-recipe", component: NewRecipe },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
