<script lang="ts" setup>
import type { WatchStopHandle } from 'vue'

const buildData = useBuildSSE()

interface EventWatch {
  [key: string]: WatchStopHandle | null
}

const logs = [
  { id: 1, duration: 222 },
  { id: 2, duration: 222 },
  { id: 3, duration: 222 },
  { id: 4, duration: 222 },
  { id: 5, duration: 222 },
]

const defaults: EventWatch = {}

async function handleClick() {
  const watchEvents = useState<EventWatch>('event-source', () => defaults)
  // const data = useState('event-data', () => '')

  const { data, status, error, close } = useEventSource(`http://localhost:3000/api/build/${6}`)

  if (data.value)
    buildData.value += JSON.parse(data.value).message

  const end = () => Object.values(watchEvents.value).forEach((fn) => {
    if (fn) {
      fn()
      close()
    }
  })

  watchEvents.value.data = watch(data, () => {
    if (data.value)
      buildData.value += JSON.parse(data.value).message
  })

  watchEvents.value.status = watch(status, () => {
    const sending = status.value === 'CONNECTING' || status.value === 'OPEN'
    if (!sending)
      end()
  })

  watchEvents.value.error = watch(error, () => {
    end()
  })
}
</script>

<template>
  <section class="flex  flex-col items-center  justify-center w-full space-y-3 ">
    <div class="lg:flex space-x-3 w-full">
      <label class="block dark:text-white text-gray-700 text-3xl  font-bold mb-2" for="build-logs">
        Build Logs
      </label>
      <UButton type="button" class=" font-bold py-1" @click="handleClick">
        Build It
      </UButton>
      <UTooltip>
        <UIcon name="uil:rocket" class="text-2xl" />
        <template #text>
          <span class="italic">Hello World!</span>
        </template>
      </UTooltip>
    </div>
    <UDivider class="w-full" />
    <div class="w-full flex">
      <div class="p-2  w-4/5">
        <div class="p-2 bg-zinc-700 rounded-md">
          <pre id="pre-build" class="scrollable-pre screen"> {{ buildData }}</pre>
        </div>
      </div>

      <!-- BUILD STATUS -->
      <BuildLogCard />
      <!-- BUILD STATUS -->
    </div>
  </section>
</template>

<style>
.scrollable-pre {
  min-height: 55vh;
  max-height: 500px; /* Set the desired fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #ccc; /* Optional: add a border for styling */
  padding: 10px; /* Optional: add padding for better appearance */
}
</style>
