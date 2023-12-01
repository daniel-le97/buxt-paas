<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  repoURL: z.string().min(1),
  installCommand: z.string().nullable(),
  buildCommand: z.string().nullable(),
  startCommand: z.string().nullable(),
  buildPack: z.string().min(1, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  repoURL: 'https://github.com/daniel-le97/astro-portfolio',
  buildCommand: 'bun run build',
  startCommand: 'bun run start',
  installCommand: 'bun i',
  buildPack: 'nixpacks',
})

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
  <div>
    <UForm :schema=" schema " :state=" state " class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Repo URL" name="repoURL">
        <UInput v-model=" state.repoURL " type="url" />
      </UFormGroup>

      <div class="flex space-x-4">
        <div class="w-1/2 flex flex-col space-y-3">
          <UFormGroup label="Install command" name="installCommand" required>
            <UInput v-model=" state.installCommand " placeholder="npm install" type="text" />
          </UFormGroup>
          <UFormGroup label="Build command" name="buildCommand" required>
            <UInput v-model=" state.buildCommand " placeholder="npm run build" type="text" />
          </UFormGroup>
          <UFormGroup label="Start command" name="startCommand" required>
            <UInput v-model=" state.startCommand " placeholder="npm run serve" type="text" />
          </UFormGroup>
        </div>
        <div class="w-1/2">
          <UFormGroup label="choose a build pack" name="buildPack">
            <USelect v-model=" state.buildPack " :options=" options " />
          </UFormGroup>
        </div>
      </div>

      <UButton type="submit">
        Save
      </UButton>
    </UForm>
  </div>
</template>
