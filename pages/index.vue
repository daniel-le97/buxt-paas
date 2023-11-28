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

// function handleImgError(template: any) {
//   templates.value = templates.value?.map((_template) => {
//     const found = _template.name === template.name
//     if (found)
//       return { ..._template, logo: '/docker-compose.png' }

//     return _template
//   })

//   // template.logo = '/docker-compose.png'
// }
</script>

<template>
  <div class="grid grid-cols-3 gap-12 items-center justify-center p-24">
    <div
      v-for="template in templates"
      :key="template.name"
      class="relative p-2 rounded-md bg-gray-900 h-full"
    >
      <div class="flex flex-row justify-between align-middle">
        <div class="text-xl font-bold px-2 pt-4">
          {{ template.name }}
        </div>
        <button class="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" @click="getTemplate(template.index)">
          deploy
        </button>
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

      <img
        :src="template.logo"
        :title="template.logo"
        height="5vh"
        class="w-16 absolute -top-10 -left-6 border bg-white"
      >
    </div>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
