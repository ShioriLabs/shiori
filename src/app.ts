import dotenv from 'dotenv'
import Discord from 'discord.js'
import * as Sentry from '@sentry/node'

import messageHandler from './messageHandler'

dotenv.config()
Sentry.init({
  dsn: process.env.SENTRY_TOKEN,
  tracesSampleRate: 1.0

})

try {
  const client = new Discord.Client()

  client.on('ready', () => {
    if (client.user) {
      client.user.setPresence({
        activity: {
          name: 'your heart',
          type: 'LISTENING'
        }
      })
      console.log(`Logged in as ${client.user.tag}`)
    }
  })

  client.on('message', messageHandler)

  client.login(process.env.DISCORD_TOKEN)
} catch (e) {
  Sentry.captureException(e)
}
