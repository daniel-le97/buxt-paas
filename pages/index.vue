<template>
  <div>
   <div v-for="stack in stacks">
    {{ stack }}
  </div>
  </div>
</template>

<script lang="ts" setup>
const {data:stacks} = await useFetch('/api/compose/keys')

import { useMagicKeys, whenever } from '@vueuse/core'

const {shift_a} = useMagicKeys()


whenever(shift_a, () => {
const router = useRouter()
router.push('/applications')
  console.log('Shift+A have been pressed')
})

</script>

<style></style>

