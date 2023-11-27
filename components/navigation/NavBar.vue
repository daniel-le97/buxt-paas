<template>
  <section>

    <div class=" hidden lg:inline-flex relative  overflow-hidden w-full p-4 space-x-5">
      <ULink to="/" active-class="text-primary" :inactive-class=" inactive ">
        Home
      </ULink>
      <!-- <NuxtLink href="/about" class="nav-item " active-color="orange">About</NuxtLink> -->
      <ULink to="/applications" active-class="text-primary" :inactive-class=" inactive ">
        applications
      </ULink>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' , arrow: false}">
    <UButton color="white" label="Providers" trailing-icon="i-heroicons-chevron-down-20-solid"  />
  </UDropdown>
      <!-- <ULink to="/providers" active-class="text-primary" :inactive-class=" inactive ">
        providers
      </ULink> -->

    </div>
    <UDivider
    :label="router.name == 'index' ? 'home' : router.name"
    :ui="{ label: '' }"
    />
  </section>
</template>


<script lang="ts" setup>
const router = useRoute()

const items = [
   [{
    label: 'Caprover',
    to: '/providers/caprover',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['e'],
    click: () => {
      console.log('Edit')
    }
    
  }, {
    label: 'Portainer',
    to: '/providers/portainer',
    icon: 'i-heroicons-document-duplicate-20-solid',
    shortcuts: ['d'],
  }]
]
// const router = useRouter().getRoutes().map( route => { to: route.path} );

const inactive = "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"

</script>

<style></style>

