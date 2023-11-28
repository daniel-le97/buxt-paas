<script setup lang="ts">
// import { useFetch } from 'your-fetch-library'; // Replace with the actual library you're using
import { useRouter } from 'vue-router'

const { data: templates } = await useFetch('/api/providers/portainer/templates')

function toggleDescription(template: any) {
  template.showFullDescription = !template.showFullDescription
}
async function getTemplate(index: number) {
  const { data: found } = await useFetch(`/api/providers/portainer/templates/${index}`)
  console.log(found.value)
}
const { shift_a } = useMagicKeys()
whenever(shift_a, () => {
  const router = useRouter()
  router.push('/applications')
  console.log('Shift+A has been pressed')
})
</script>

<template>
  <div class="grid grid-cols-3 gap-12 items-center justify-center p-24">
    <div v-for="template in templates" :key="template.name" class="group shadow-md hover:shadow-xl transition-all duration-150 ease-linear relative p-2 rounded-md dark:bg-gray-900 h-full">
      <div class="flex items-center space-x-3">
           <NuxtImg
          v-if="JSON.stringify(template.logo)"
          :src="template.logo"
          :label="template.logo"
          height="5vh"
          class="w-16  "
        />
        <div class="text-xl font-bold font-serif">
          {{ template.name }}
        </div>
        <span class="group-hover:translate-x-4 transition-transform duration-150 ease-linear">
          <Icon  name="material-symbols:arrow-right-alt-rounded" :size="'25'" />
      </span>
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

   
    </div>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
