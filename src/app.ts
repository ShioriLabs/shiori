import dotenv from 'dotenv'
import Discord from 'discord.js'

import MessageHandler from './MessageHandler'

dotenv.config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', MessageHandler)

client.login(process.env.DISCORD_TOKEN)
