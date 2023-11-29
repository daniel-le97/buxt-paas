<script setup>
function handleClick() {
  // Handle button click
}
</script>

<template>
  <button class="bg-blue-500 text-white p-2" @click="handleClick">
    <slot />
  </button>
</template>

<style scoped>
/* Add other styling as needed */
</style>
