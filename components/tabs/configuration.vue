<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const schema = z.object( {
  repoURL: z.string().min( 1 ),
  installCommand: z.string().nullable(),
  buildCommand: z.string().nullable(),
  startCommand: z.string().nullable(),
  buildPack: z.string().min( 1, 'Must be at least 8 characters' )
} );

type Schema = z.output<typeof schema>;

const state = reactive( {
  repoURL: 'https://github.com/daniel-le97/astro-portfolio',
  buildCommand: 'bun run build',
  startCommand: 'bun run start',
  installCommand: 'bun i',
  buildPack: 'nixpacks'
} );

const options = [
  { label: 'nixpacks', value: 'nixpacks' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];

async function onSubmit ( event: FormSubmitEvent<Schema> ) {
  // Do something with data
  console.log( event.data );

  const res = await $fetch('/api/repo', {
    method: "POST",
    body: event.data
  })
  if (res) {
    const id = useActiveId()
    id.value = res
    changeIndex(1)
    
  }
  
}

const changeIndex = (number?:number) => {
  const index = useTabIndex();
  index.value = number ?? index.value + 1;

};
</script>

<template>
  <div>

    <UForm :schema=" schema " :state=" state " class="space-y-4" @submit=" onSubmit ">
      <UFormGroup label="repo URL" name="repoURL">
        <UInput v-model=" state.repoURL " type="url" />
      </UFormGroup>

      <div class="flex space-x-4">
        <div class="w-1/2">
          <UFormGroup label="install command" name="installCommand">
            <UInput v-model=" state.installCommand " placeholder="npm install" type='text' />
          </UFormGroup>
          <UFormGroup label="build command" name="buildCommand">
            <UInput v-model=" state.buildCommand " placeholder="npm run build" type='text' />
          </UFormGroup>
          <UFormGroup label="start command" name="startCommand">
            <UInput v-model=" state.startCommand " placeholder="npm run serve" type='text' />
          </UFormGroup>
        </div>
        <div class="w-1/2">
          <UFormGroup label="choose a build pack" name="buildPack">
            <USelect v-model=" state.buildPack " :options=" options " />
          </UFormGroup>
        </div>
      </div>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

