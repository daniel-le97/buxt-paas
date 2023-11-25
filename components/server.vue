<template>
  <div v-for="stuff in data">
    <UContainer >
      <div>
        <div>{{ stuff.name }}</div>
        <UButton type="button" @click="() => save(stuff)">save</UButton>
      </div>
      <UTextarea v-if="stuff.data" autoresize resize  v-model="(stuff.data as string)" :rows="stuff.data.toString().split('\n').length" class="w-full p-2 h-80 pb-2" ></UTextarea>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>

async function save(data:any){
  await useFetch('/api/compose/' + data.name, {
    method: 'PUT',
    body: JSON.stringify(data.data)
  })
}

  const {data} = useFetch('/api/compose')
 
</script>

<style>

</style>

