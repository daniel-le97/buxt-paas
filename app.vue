<script setup>
import SideNavBar from './components/navigation/sideNavBar.vue'

onMounted(() => {
  const eventSource = new EventSource('http://localhost:3000/api/sse')

  eventSource.addEventListener('message', (event) => {
    const parsed = JSON.parse(event.data)

    if (parsed.event.includes('build'))
      useBuildSSE().value += parsed.data

    console.log({raw:event.data, parsed})
  })

  eventSource.addEventListener('error', (error) => {
    console.error('EventSource failed:', error)
    eventSource.close()
  })
})
</script>

<template>
  <div class="flex w-full  min-h-screen">
    <div class="">
      <SideNavBar />
    </div>
    <NuxtPage />
    <UNotifications />
  </div>
</template>
