<script setup>
import SideNavBar from './components/navigation/sideNavBar.vue'

onMounted(() => {
  const eventSource = new EventSource('http://localhost:3000/api/sse')

  eventSource.addEventListener('message', (event) => {
    console.log(event.data)
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
