import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'

const RockPaperScissor = new Resolver('rps', async (message: Message) => {
  const choices = ['✌', '✊', '✋']
  const player1 = {
    player: `${message.author.tag}`,
    choice: choices[Math.floor(Math.random() * choices.length)]
  }
  const player2 = {
    player: message.mentions.users.first()?.tag ?? 'Shiori',
    choice: choices[Math.floor(Math.random() * choices.length)]
  }
  const msg = new MessageEmbed({
    title: 'Rock-Paper-Scissor',
    color: '#f55875',
    fields: [
      {
        name: player1.player,
        value: player1.choice,
        inline: true
      },
      {
        name: player2.player,
        value: player2.choice,
        inline: true
      }
    ]
  })

  message.channel.send(msg)
}, 'Play rock-paper-scissors with someone!')

export default {
  id: 'games',
  name: 'Games',
  description: 'Play simple games with others!',
  commands: [
    RockPaperScissor
  ]
}
