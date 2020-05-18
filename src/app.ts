import dotenv from 'dotenv'
import Discord from 'discord.js'

import messageHandler from './messageHandler'

dotenv.config()

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
