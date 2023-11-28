<template>
    <div class="grid grid-cols-3 gap-12 items-center justify-center p-24">
    <div v-for="template in props" :key="template.name" class="relative p-2 rounded-md bg-gray-900 h-full">
      <div class="flex flex-row justify-between align-middle">
        <div class="text-xl font-bold px-2 pt-4">
          {{ template.name }}
        </div>
      </div>
      <UDivider class="mt-2" />
      <div class="p-2">
        <template v-if="template.description?.length >= 240">
          <div v-if="!template?.showFullDescription" class="truncate">
            {{ `${template?.description?.slice(0, 240)}...` }}
          </div>
          <div v-else>
            {{ template.description }}
          </div>
          <button class="text-primary" @click="toggleDescription(template)">
            {{ template?.showFullDescription ? 'Show less' : 'Show more' }}
          </button>
        </template>
        <template v-else>
          {{ template?.description }}
        </template>
      </div>

      <NuxtImg
        v-if="JSON.stringify(template.logo)"
        :src="template.logo"
        :label="template.logo"
        height="5vh"
        class="w-16 absolute -top-10 -left-6 border bg-white"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<Template[]>()

  // this component is currently unused
  
interface Template {
  name: string
  description: string
  logo: string
  index: number
  showFullDescription: boolean
}
</script>

<style>

</style>

