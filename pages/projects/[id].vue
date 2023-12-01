<!-- components/Tabs.vue -->
<script setup lang="ts">
import { LazyTabsBuild, LazyTabsConfiguration, LazyTabsSecrets } from '#components'

const route = useRoute('projects-id')
console.log(route.params)

const { data, pending, error, refresh } = await useFetch(`/api/projects/${route.params.id}`)
if (data.value) {
  const activeProject = useActiveProject()
  activeProject.value = data.value
}

const selectedTab = ref(0)

const tabs = [
  { label: 'configuration', component: LazyTabsConfiguration },
  { label: 'build', component: LazyTabsBuild },
  { label: 'secrets', component: LazyTabsSecrets },
]

function selectTab(index: number) {
  selectedTab.value = index
}
// onMounted( () => setPageLayout('application-layout'))
</script>

<template>
  <div class="p-5 w-full">
    <div class="flex items-center justify-between mb-20">
      <div class="flex items-center space-x-2 ">
        <h1 class="text-2xl font-bold">
          Configurations
        </h1>
        <UBadge>Healthy</UBadge>
      </div>
      <!-- Left side with buttons and icons -->
      <div class="flex space-x-2">
        <UButton
          icon="i-heroicons-arrow-path-solid" size="sm" color="sky" variant="solid" label="Restart"
          :trailing=" false "
        />
        <UButton
          icon="i-heroicons-arrow-path-solid" size="sm" color="red" variant="solid" label="Force Redeploy"
          :trailing=" false "
        />
        <UButton icon="i-heroicons-pause" size="sm" color="amber" variant="solid" label="Stop" :trailing=" false " />
        <UButton
          icon="i-heroicons-arrow-up-right" size="sm" color="primary" variant="solid" label="Open"
          :trailing=" false "
        />
      </div>

      <!-- Right side with page title and badge -->
    </div>
    <div class="flex  px-5 gap-3">
      <!-- Left sidebar with buttons -->
      <div class="p-2 bg-blue-600 h-fit rounded-lg">
        <UButton
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'bg-gray-300': selectedTab === index }"
          class="w-full p-2 mb-2 text-left max"
          @click="selectTab(index)"
        >
          {{ tab.label }}
        </UButton>
      </div>

      <!-- Main component area -->
      <div class=" w-full">
        <div v-for="(tab, index) in tabs" :key="index">
          <div v-if="selectedTab === index">
            <component :is="tab.component" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
