<script setup lang="ts">
import type { WatchStopHandle } from 'vue'

definePageMeta({
  auth: true,
})
const data = ref()
let source: ReturnType<typeof useEventSource> | null
const watcher: Record<string, WatchStopHandle> = {}
onMounted(() => {
  source = useEventSource('http://localhost:3000/api/sse')
  watcher.data = watch(source.data, (value) => {
    data.value = value
  })
  watcher.event = watch(source.event, (value) => {
    console.log(value)
  })
  watcher.error = watch(source.error, (value) => {
    console.log(value)
  })
  watcher.status = watch(source.status, (value) => {
    console.log(value)
  })
})

onBeforeUnmount(() => {
  try {
    source?.close()
    source = null
    watcher.data?.()
    watcher.error?.()
    watcher.event?.()
    watcher.status?.()
  }
  catch (error) {
    console.log(error)
  }
})
</script>

<template>
  hello {{ data }}
</template>
