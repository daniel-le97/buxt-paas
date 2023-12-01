<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch('/api/projects')

async function handleProjectCreate() {
  const project = await $fetch('/api/projects', {
    method: 'POST',
    body: {
      user: 'me',
    },
  })
  const activeProject = useActiveProject()
  activeProject.value = project

  await navigateTo(`/projects/${project.id}`)
  // execute()
}
async function naver(id: string) {
  await navigateTo(`/projects/${id}`)
}
</script>

<template>
  <div class="m-2 p-2 ">
    <div class="flex justify-end">
      <UButton @click="handleProjectCreate">
        Create +
      </UButton>
    </div>
    <div class="flex justify-evenly flex-row align-middle gap-7">
      <div v-for="project in data" :key="project.id" class="flex justify-evenly align-middle">
        <div class="bg-slate-600" @click="naver(project.id)">
          <div>
            {{ project.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
