<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  repoUrl: z.string().min(1),
  installCommand: z.string().nullable(),
  buildCommand: z.string().nullable(),
  startCommand: z.string().nullable(),
  buildPack: z.string().min(1, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = useActiveProject()

const options = [
  { label: 'nixpacks', value: 'nixpacks' },
  { label: 'dockerfile', value: 'dockerfile' },
  { label: 'docker-compose', value: 'docker-compose' },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // event.preventDefault()
  // Do something with data
  console.log(event.data)

  // const res = await useFetch('/api/build', {
  //   method: 'POST',
  //   body: event.data,
  // })
}
</script>

<template>
  <div v-if="state.application">
    <UForm :schema=" schema " :state=" state.application " class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Repo URL" name="repoUrl">
        <UInput v-model=" state.application.repoUrl " type="url" />
      </UFormGroup>

      <div class="flex space-x-4">
        <div class="w-1/2 flex flex-col space-y-3">
          <UFormGroup label="Install command" name="installCommand" required>
            <UInput v-model=" state.application.installCommand " placeholder="npm install" type="text" />
          </UFormGroup>
          <UFormGroup label="Build command" name="buildCommand" required>
            <UInput v-model=" state.application.buildCommand " placeholder="npm run build" type="text" />
          </UFormGroup>
          <UFormGroup label="Start command" name="startCommand" required>
            <UInput v-model=" state.application.startCommand " placeholder="npm run serve" type="text" />
          </UFormGroup>
        </div>
        <div class="w-1/2">
          <UFormGroup label="choose a build pack" name="buildPack">
            <USelect v-model=" state.application.buildPack" :options=" options " />
          </UFormGroup>
        </div>
      </div>

      <UButton type="submit">
        Save
      </UButton>
    </UForm>
  </div>
  <div v-else>loading...</div>
</template>
