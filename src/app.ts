import dotenv from 'dotenv'
import Discord from 'discord.js'

import messageHandler from './messageHandler'

dotenv.config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', messageHandler)

client.login(process.env.DISCORD_TOKEN)
