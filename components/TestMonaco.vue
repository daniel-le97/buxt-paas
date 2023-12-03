<script lang="ts" setup>
import type { Monaco } from '@monaco-editor/loader'

const props = defineProps(['value', 'language'])

const editor = ref()
const monaco = ref<Monaco>()

onMounted(async () => {
  const loader = await import('@monaco-editor/loader').then(m => m?.default)

  monaco.value = await loader.init()

  monaco.value.editor.create(editor.value, {
    theme: 'vs-dark',
    language: props.language,
    value: props.value
  })
})

// function setTheme() {
//   monaco?.value?.editor.defineTheme('myCustomTheme', {
//     base: 'vs', // can also be vs-dark or hc-black
//     inherit: true, // can also be false to completely replace the builtin rules
//     rules: [
//       { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
//       { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
//       { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
//     ],
//     colors: {
//       'editor.background': '#000000',
//       'editor.foreground': '#ffffff',
//     }
//   })

//   monaco?.value?.editor.setTheme('myCustomTheme')
// }
</script>

<template>
  <div ref="editor" class="editor" />
</template>

<style scoped>
.editor {
  flex: 1;
}
</style>
