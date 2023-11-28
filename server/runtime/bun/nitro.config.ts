import { fileURLToPath } from 'node:url'
import type { NitroPreset } from 'nitropack'

export default <NitroPreset>{
  extends: 'node-server', // You can extend existing presets
  entry: fileURLToPath(new URL('./entry.ts', import.meta.url)),
  exportConditions: ['bun', 'worker', 'node', 'import', 'default'],
  commands: {
    preview: 'bun .output/server/index.mjs',
  },
}
