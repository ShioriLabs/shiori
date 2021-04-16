import { Message, MessageEmbed } from 'discord.js'
import axios from 'axios'
import jsqr from 'jsqr'
import Jimp from 'jimp'

import Resolver from '../../class/Resolver'
import WikipediaAPIResponse from '../../class/WikipediaAPIResponse'

const Define = new Resolver('define', async (message: Message, args?: string[]) => {
  if (!args || args.length === 0) {
    message.channel.send('You need to insert something to search!')
  } else {
    const sentMessage = await message.channel.send('Let me search Wikipedia for that...')
    const query = encodeURI(args.join(' '))
    const { data: searchResult } = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json`)
    if (searchResult.query.search.length === 0) {
      await sentMessage.edit(`Can't find \`${args.join(' ')}\` in Wikipedia. Please try again`)
      return
    }
    const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?&action=query&prop=extracts|info&titles=${encodeURI(searchResult.query.search[0].title)}&format=json&inprop=url&explaintext=true&exlimit=1&exintro=true`)
    const page: WikipediaAPIResponse = Object.values(data.query.pages)[0] as WikipediaAPIResponse
    let extract = page.extract
    if (extract.length > 1950) {
      extract = `${extract.substring(0, 1954)}... (${extract.length - 1950} more characters)`
    }

    const resultMessage = new MessageEmbed()
      .setColor('#f55875')
      .setTitle(page.title)
      .setURL(page.fullurl)
      .setDescription(extract)
      .setFooter('Content from Wikipedia')
    await sentMessage.edit('Here\'s what I found on Wikipedia:')
    await sentMessage.edit(resultMessage)
  }
}, 'Get a definition of something from Wikipedia')

const Urban = new Resolver('urban', async (message: Message, args?: string[]) => {
  if (!args || args.length === 0) {
    message.channel.send('You need to insert something to search!')
  } else {
    const sentMessage = await message.channel.send('Let me search Urban Dictionary for that...')
    const query = encodeURI(args.join(''))
    const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${query}`)
    if (data.list.length === 0) {
      await sentMessage.edit(`Can't find ${args.join(' ')} on Urban Dictionary`)
      return
    }
    const result = data.list[0]
    const resultMessage = new MessageEmbed()
      .setColor('#f55875')
      .setTitle(result.word)
      .setURL(result.permalink)
      .setDescription(result.definition)
      .setFooter('Content from Urban Dictionary')
      .addFields([
        {
          name: 'Examples',
          value: result.example,
          inline: false
        }
      ])
    await sentMessage.edit('Here\'s what I found on Urban Dictionary:')
    await sentMessage.edit(resultMessage)
  }
}, 'Get a definition of something from Urban Dictionary')

const ScanQR = new Resolver('scan-qr', async (message: Message) => {
  const image = message.attachments.first()
  if (image) {
    const attachmentFile = await axios.get(image.url, { responseType: 'arraybuffer' })
    const attachmentBuffer = Buffer.from(attachmentFile.data)
    const imageObject = await Jimp.read(attachmentBuffer)
    const result = jsqr(new Uint8ClampedArray(imageObject.bitmap.data), imageObject.bitmap.width, imageObject.bitmap.height)
    if (result) {
      message.reply(`That QR Code contains: ${result.data}`)
    } else {
      message.reply('That QR Code seems invalid, let\'s try again!')
    }
  }
})

export default {
  id: 'util',
  name: 'Utilities',
  description: 'Useful commands for getting real world info',
  commands: [
    Define,
    Urban,
    ScanQR
  ]
}
