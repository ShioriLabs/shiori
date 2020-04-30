import { Message, StreamDispatcher, MessageEmbed, Guild } from 'discord.js'
import ytdl from 'ytdl-core'
import YouTube from 'yt-search'

import Resolver from '../../class/Resolver'
import { addContext, removeContext, getContext } from '../../util/audioSearchContext'
import UserAudioContext from '../../class/UserAudioContext'

let dispatchers: Array<{server: Guild; dispatcher: StreamDispatcher}> = []

const Join = new Resolver('join', (message: Message) => {
  if (message.member.voice.channel) {
    message.member.voice.channel.join()
  } else {
    message.channel.send('You need to be in a voice channel to made me join a voice channel!')
  }
}, 'Join a voice channel')

const Leave = new Resolver('leave', (message: Message) => {
  message.guild.me.voice.channel.leave()
}, 'Leave current voice channel')

const Play = new Resolver('play', async (message: Message, args: string[]) => {
  const joinedArgs = args.join(' ')
  if (message.guild.me.voice.channel) {
    if (!dispatchers.find(item => {
      return item.server.id === message.guild.id
    })) {
      if (!isNaN(Number.parseInt(joinedArgs))) {
        const selected = Number.parseInt(joinedArgs)
        const context = getContext(message.member)
        if (context) {
          const selectedSong = context.context[selected - 1]
          const dispatcher = message.guild.me.voice.connection.play(ytdl(selectedSong.url, {
            filter: 'audioonly'
          }))
          dispatchers.push({
            server: message.guild,
            dispatcher
          })

          const nowPlayingEmbed = new MessageEmbed()
            .setColor('#ffaaa5')
            .setTitle('Now Playing')
            .setDescription(`${selectedSong.title} by ${selectedSong.channel}`)
          message.channel.send(nowPlayingEmbed)
          await context.audioMessage.delete()
          removeContext(context.user)
        }
      }
    }
  } else {
    message.channel.send('I\'m currently not in any voice channel. Please `=join` first!')
  }
})

const Search = new Resolver('search', async (message: Message, args: string[]) => {
  const result = (await YouTube({
    search: args.join(' '),
    pageStart: 1,
    pageEnd: 2
  })).videos.slice(0, 5).map((item: YouTube.VideoSearchResult): UserAudioContext => {
    return {
      title: item.title,
      channel: item.author.name,
      url: item.url
    }
  })

  const resultEmbed = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle(`Search result for "${args.join(' ')}"`)
    .addFields(result.map((item, index: number) => {
      return {
        name: `${index + 1}: ${item.title}`,
        value: `By ${item.channel}`
      }
    }))
    .addField('\u200B', 'Type `=play <number>` to add song into the queue')
  const audioMessage = await message.channel.send(resultEmbed)
  addContext(message.member, audioMessage, result)
})

const Stop = new Resolver('stop', async (message: Message) => {
  dispatchers = dispatchers.filter(item => {
    if (item.server.id === message.guild.id) {
      item.dispatcher.destroy()
    } else return item
  })
})

export default {
  id: 'music',
  name: 'Music',
  description: 'Play them tunes',
  commands: [
    Join,
    Leave,
    Play,
    Stop,
    Search
  ]
}
