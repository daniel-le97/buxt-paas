import '#internal/nitro/virtual/polyfill'

const nitroApp = useNitroApp()
const webHandler = toWebHandler(nitroApp.h3App)

// @ts-expect-error global bun
const server = Bun.serve({
  port: process.env.NITRO_PORT || process.env.PORT || 3000,
  async fetch(request: Request) {
    return await webHandler(request)
  },
})

console.log(`Listening on http://localhost:${server.port}...`)
