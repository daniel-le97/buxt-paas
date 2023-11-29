<script  lang="ts" setup>
const router = useRoute('providers-caprover-id').params.id

const { data: templates } = await useFetch(`/api/providers/caprover/${router}`)
const thisRef = ref<string>(JSON.stringify(templates as unknown as string)) as unknown as CaproverDockerComposeConfig
// console.log(templates.value)
</script>

<template>
  <div>
    <!-- <pre>
      {{ templates }}

    </pre> -->
    <!-- <MonacoEditor v-if="templates" v-model="templates" :options="{ theme: 'vs-dark' }" class=" min-h-screen" /> -->
    <ClientOnly>
      <LazyMyMonacoEditor :value="templates" language="typescript" class="monaco" />
    </ClientOnly>
  </div>
</template>
