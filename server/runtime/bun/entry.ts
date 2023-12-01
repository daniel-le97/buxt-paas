import '#internal/nitro/virtual/polyfill'

const nitroApp = useNitroApp()
const webHandler = toWebHandler(nitroApp.h3App)

const server = Bun.serve({
  port: process.env.NITRO_PORT || process.env.PORT || 3000,
  async fetch(request: Request) {
    console.log(`received request: ${request.url}`)

    return await webHandler(request)
  },
})

console.log(`Listening on http://localhost:${server.port}...`)
