<script setup lang="ts">
const props = defineProps<{
  buttonText: string;
  clickHandler: (e?: Event) => void;
  theme: "primary" | "danger" | "secondary";
  type?: "submit";
}>();

let buttonType = "button";
if (props.type) {
  buttonType = props.type;
}
</script>

<template>
  <button
    :type="buttonType"
    @click="clickHandler"
    class="px-2 py-1 text-white font-semibold rounded-lg border-b-2 border-transparent hover:translate-y-1"
    :class="
      theme === 'primary'
        ? 'bg-amber-600 hover:bg-amber-400'
        : theme === 'danger'
        ? 'bg-red-600 hover:bg-red-400'
        : theme === 'secondary' && 'bg-teal-600 hover:bg-teal-400'
    "
  >
    {{ buttonText }}
  </button>
</template>
