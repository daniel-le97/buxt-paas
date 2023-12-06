// import { createServer } from 'node:http'
// import { App, createNodeMiddleware } from 'octokit'

// const app = new App({
//   appId: '',
//   privateKey: '',
//   webhooks: { secret:'' },
// })

// app.webhooks.on('issues.opened', ({ octokit, payload }) => {
//   return octokit.rest.issues.createComment({
//     owner: payload.repository.owner.login,
//     repo: payload.repository.name,
//     body: 'Hello, World!',
//     issue_number: payload.issue.number
//   })
// })

// const middleware = createNodeMiddleware(app)

// export default fromNodeMiddleware(middleware)
// Your app can now receive webhook events at `/api/github/webhooks`
// createServer(createNodeMiddleware(app)).listen(3000)

export default defineEventHandler(async () => {
  const tty = await import('node:tty')
})
