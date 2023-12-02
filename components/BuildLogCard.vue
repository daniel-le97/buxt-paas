<script setup>
const props = defineProps(['branch', 'date', 'id', 'duration'])
</script>

<template>
  <div class="flex flex-col pt-10 w-1/4 space-y-4 ">
    <div class=" rounded-md flex   hover:bg-zinc-700 p-2 transition-all duration-150">
      <div class="w-1/3">
        <div class="flex flex-col items-center justify-center text-center space-y-0.5">
          <strong>Main</strong>
          <div class="text-sm">
            manual
          </div>
          <span class=" pb-0.5 px-2 bg-zinc-800 rounded-lg  flex items-center justify-center text-green-300 font-semibold">success</span>
        </div>
      </div>
      <div class="w-2/3  text-sm flex flex-col items-center justify-center text-center">
        <div class="text-xs">
          16 days ago
        </div>
        <div class="flex gap-1 ">
          <span>finished in </span> <strong> 222.3ms</strong>
        </div>
      </div>
    </div>
  </div>
</template>
