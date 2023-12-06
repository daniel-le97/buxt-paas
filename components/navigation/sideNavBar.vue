<script setup lang="ts">
const SideNavBar = ref<HTMLElement | null>(null)
const isCollapsed = ref(false)

function handleCollapse() {
  if (SideNavBar.value) {
    isCollapsed.value = !isCollapsed.value
    const newWidth = isCollapsed.value ? '15rem' : '5rem'

    SideNavBar.value.style.width = newWidth
    SideNavBar.value.style.transition = 'width 0.3s ease'
  }
}

const navItems = [
  {
    link: '/',
    icon: 'uil:home',
    label: 'Home',

  },
  {
    link: '/projects',
    icon: 'material-symbols:add-box-outline',
    label: 'Projects',

  },
  {
    link: '/providers/portainer',
    icon: 'uil:apps',
    label: 'Portainer',

  },
  {
    link: '/providers/caprover',
    icon: 'ri:apps-2-fill',
    label: 'Caprover',
  },
  {
    link: '/login',
    icon: 'material-symbols:login-rounded',
    label: 'Login',
  },

]
</script>

<template>
  <div ref="SideNavBar" class="flex flex-col items-center justify-between w-20 h-full bg-zinc-800 text-white p-1 py-3">
    <div class=" flex flex-col  w-full  justify-center items-center  space-y-3">
      <UTooltip v-for="navItem in navItems" :key="navItem.label" :text="navItem.label" :popper="{ placement: 'right' }">
        <NuxtLink :to="navItem.link" class="flex items-center justify-center " active-class="active">
          <RippleBtn>
            <Icon :name="navItem.icon" class="text-5xl" />
          </RippleBtn>
        </NuxtLink>
      </UTooltip>
    </div>
  </div>
</template>

<style scoped>
.active{
@apply text-emerald-300 bg-gray-200/20 cursor-pointer rounded-md
}
</style>
