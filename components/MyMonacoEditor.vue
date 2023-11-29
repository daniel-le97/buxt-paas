<!-- this was taken from https://github.com/unjs/unstorage/blob/main/demo/Editor.vue -->
<script>
import { defineComponent } from 'vue'
import * as monaco from 'monaco-editor/esm'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'auto',
    },
  },
  watch: {
    value(newValue) {
      this.editor.setValue(newValue)
    },
    language(newValue) {
      this.editor.setModelLanguage(this.editor.getModule(), newValue)
    },
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.editor, {
      value: this.value,
      language: this.language,
      theme: 'vs-dark',
    })
  },
})
</script>

<template>
  <div ref="editor" class="editor" />
</template>

<style scoped>
.editor {
  flex: 1;
}
</style>
