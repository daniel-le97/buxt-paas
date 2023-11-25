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
      <!-- <ULink to="/one" active-class="text-primary" :inactive-class=" inactive ">
        one
      </ULink>
       -->
      <!-- <NuxtLink href="/login" class="nav-item " active-color="orange">Login</NuxtLink> -->
      <!-- <span class=" h-1 bg-white w-4"></span> -->
    </div>
    <UDivider
    :label="router.name == 'index' ? 'home' : router.name"
    :ui="{ label: '' }"
    />
  </section>
</template>


<script lang="ts" setup>
const router = useRoute()
// const router = useRouter().getRoutes().map( route => { to: route.path} );

const inactive = "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"

</script>

<style></style>

