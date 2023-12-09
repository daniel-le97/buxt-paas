import { Octokit } from 'octokit'
import { Probot, createNodeMiddleware, createProbot } from 'probot'
import consola from 'consola'

// For more information, see https://probot.github.io/docs/development/
export function probot(app: Probot) {
  app.log.info('Yay, the app was loaded!')
  app.onAny(async (context) => {
    consola.info('onAny')
    app.log.info(context.payload)
  })
}

const probotApp = new Probot({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
  secret: process.env.WEBHOOK_SECRET,
  // webhookPath: "/api/webhooks",
})

export default fromNodeMiddleware(createNodeMiddleware(probot, { webhookPath: '/api/webhooks', probot: probotApp }))
