<template>
  <TestMonaco :value="value" :language="language"/>
</template>

<script lang="ts" setup>
 const value = ref('')
 const language = ref('typescript')
</script>