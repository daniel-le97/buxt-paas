<script setup>
import { ref } from 'vue'

import Button from '~/components/Button.vue'

// Import the Button component

const collapsed = ref(false)

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

function handleButtonClick() {
  // Handle button click
}
</script>

<template>
  <div :class="{ 'hidden': collapsed, 'w-1/5': !collapsed, 'w-1/12': collapsed }" class="bg-gray-800 p-4 h-screen transition-width duration-300">
    <!-- Sidebar content -->
    <button class="text-white p-2" @click="toggleCollapse">
      Toggle
    </button>
    <Button @click="handleButtonClick">
      Button 1
    </Button>
    <Button @click="handleButtonClick">
      Button 2
    </Button>
    <!-- Add other buttons/content here -->
  </div>
</template>

<style scoped>
/* Add other styling as needed */
</style>
