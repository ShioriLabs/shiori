import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'

import anilist from '../../util/anilistQueries'

const Staff = new Resolver('staff', async (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.channel.send('You need to insert something to search!')
    return
  }
  const searchQuery = args.join(' ')
  const sentMessage = await message.channel.send(`Searching ${searchQuery} on AniList...`)
  const result = await anilist.getStaff(searchQuery)

  if (!result) {
    await sentMessage.edit(`Can't find ${searchQuery} on AniList!`)
    return
  }

  const descriptionSections = result.description ? result.description.split('\n\n') : ['No description available.']
  const slicedDescription = descriptionSections.slice(0, 3).join('\n\n')
  const reformattedDescription = slicedDescription.replace(/__/g, '**')
  const embedMessage = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle(`${result.name.first}${result.name.last ? ` ${result.name.last}` : ''} (${result.name.native})`)
    .setURL(result.siteUrl)
    .setDescription(reformattedDescription)
    .setThumbnail(result.image.medium)
    .setFooter('Content from AniList', 'https://anilist.co/img/icons/favicon-32x32.png')

  await sentMessage.edit('Here\'s what I found on AniList:')
  await sentMessage.edit(embedMessage)
}, 'Get an anime staff\'s detail')

const Anime = new Resolver('anime', async (message: Message, args: string[]) => {
  if (args.length === 0) {
    message.channel.send('You need to insert something to search!')
    return
  }
  const searchQuery = args.join(' ')
  const sentMessage = await message.channel.send(`Searching ${searchQuery} on AniList...`)
  const result = await anilist.getAnime(searchQuery)

  if (!result) {
    await sentMessage.edit(`Can't find ${searchQuery} on AniList!`)
    return
  }

  // const descriptionSections = result.description ? result.description.split('\n\n') : ['No description available.']
  // const slicedDescription = descriptionSections.slice(0, 3).join('\n\n')
  // const reformattedDescription = slicedDescription.replace(/__/g, '**')
  const embedMessage = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle(`${result.title.english ? result.title.english : result.title.romaji}`)
    .setURL(result.siteUrl)
    .setDescription(result.description.replace(/<br>/g, ''))
    .addFields([
      {
        name: 'Alternate Name',
        value: `${result.title.romaji && result.title.english ? `${result.title.romaji}, ` : ''}${result.title.native ? ` ${result.title.native}` : ''}`
      },
      {
        name: 'Season',
        value: `${result.season} ${result.seasonYear}`,
        inline: true
      },
      {
        name: 'Episodes',
        value: result.episodes,
        inline: true
      },
      {
        name: 'Genres',
        value: result.genres.join(', '),
        inline: true
      }
    ])
    .setThumbnail(result.coverImage.medium)
    .setFooter('Content from AniList', 'https://anilist.co/img/icons/favicon-32x32.png')

  await sentMessage.edit('Here\'s what I found on AniList:')
  await sentMessage.edit(embedMessage)
}, 'Get an anime staff\'s detail')

export default [
  Staff,
  Anime
]
