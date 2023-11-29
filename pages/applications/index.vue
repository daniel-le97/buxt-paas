<script setup lang="ts">
const tabItems = ref([
  {
    key: 'configuration',
    label: 'Configuration',
    description: 'Configure your settings here.',
    icon: 'uil:wrench',
  },
  {
    key: 'build',
    label: 'Build',
    description: 'Start your Build here, Plug in a public repository and select build when ready.',
    icon: 'uil:abacus',
  },
  {
    key: 'password',
    label: 'Password',
    description: 'Change your password here. After saving, you\'ll be logged out.',
    icon: 'uil:shield',
  },

  {
    key: 'secrets',
    label: 'Secrets',
    description: 'Manage your secrets here.',
    icon: 'uil:lock-alt',
  },
  {
    key: 'application',
    label: 'Application',
    description: 'Manage your application settings here.',
    icon: 'uil:book',
  },
])

async function doTheThing() {
  // Ensure EventSource is not initialized multiple times

  const repo = useRepo()

  const sendRepo = await $fetch('/api/repo', {
    method: 'POST',
    body: {
      repo: repo.value,
    },
  })
  console.log(sendRepo)

  // const eventSource = new EventSource('http://localhost:3000/api')

  // eventSource.addEventListener('message', (event: { data: any }) => {
  //   const data = event.data
  //   console.log(data)

  //   // Parse the data if needed
  //   try {
  //     const parsedData = JSON.parse(data)
  //     console.log('Parsed Data:', parsedData)
  //     hello.value += `${parsedData.data}\n`
  //     // Do something with parsedData
  //   }
  //   catch (error) {
  //     console.error('Error parsing JSON:', error)
  //   }
  // })

  // eventSource.addEventListener('error', () => {
  //   eventSource.close()
  //   // console.error('EventSource error:', errorEvent)
  //   // Handle errors if needed
  // })

  // eventSource.addEventListener('close', () => {
  //   eventSource.close()
  //   // console.log('EventSource connection closed')

  //   // Handle the connection close if needed
  // })
}

// const state = reactive({count: 0})

// const {$io} = useNuxtApp()
// onMounted(() => {
//   $io.connect()
//   $io.on('new-count', (count) => {
//     state.count = count
//   })
//   $io.onAny((event, ...args) => {
//     console.log(event, ...args);

//   })

// })

const tabIndex = useTabIndex()
</script>

<template>
  <main class=" px-5">
    <div class="flex items-center justify-between mb-20">
      <div class="flex items-center space-x-2 ">
        <h1 class="text-2xl font-bold">
          Configurations
        </h1>
        <UBadge>HEALTHY</UBadge>
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

    <UTabs
      v-model=" tabIndex "
      orientation="vertical"
      :items=" tabItems "
      :ui="{
        wrapper: 'flex items-start gap-4 min-h-screen',
        list: {
          width: 'w-64',
          background: 'dark:bg-zinc-800',
          padding: 'p-2',
          marker: {
            background: ' dark:bg-emerald-600 bg-emerald-400',
          },
        },

      }"
    >
      <template #default="{ item, index, selected }">
        <div class="flex items-center justify-between w-full gap-2 relative truncate ">
          <Icon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

          <span class="truncate"> {{ item.label }}</span>
        </div>
      </template>

      <template #item=" { item } ">
        <UCard class="dark:bg-zinc-900   ring-0">
          <div v-if=" item.key === 'build' " class="space-y-3">
            <TabsBuild />
          </div>
          <div v-if=" item.key === 'configuration' " class="space-y-3">
            <TabsConfiguration />
          </div>
          <div v-if=" item.key === 'application' " class="space-y-3 ">
            <!-- <Server /> -->
          </div>
          <div v-if=" item.key === 'secrets' " class="space-y-3">
            <TabsSecrets />
          </div>
        </UCard>
      </template>
    </UTabs>
  </main>
</template>
