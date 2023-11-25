<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const schema = z.object( {
  email: z.string().email( 'Invalid email' ),
  password: z.string().min( 8, 'Must be at least 8 characters' )
} );

type Schema = z.output<typeof schema>;

const state = reactive( {
  repoURL: undefined,
  type: undefined,
  buildCommand: undefined,
  startCommand: undefined,
  installCommand: undefined
} );

async function onSubmit ( event: FormSubmitEvent<Schema> ) {
  // Do something with data
  console.log( event.data );
}
</script>

<template>
  <UForm :schema=" schema " :state=" state " class="space-y-4" @submit=" onSubmit ">
    <UFormGroup label="repo URL" name="repo URL">
      <UInput v-model=" state.repoURL " type="url" />
    </UFormGroup>

    <UFormGroup label="install command" name="install command">
      <UInput v-model=" state.installCommand " type='text'/>
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

