import axios, { AxiosResponse } from 'axios'

import Staff from '../class/Staff'
import Anime from '../class/Anime'

const aniListClient = axios.create({
  baseURL: 'https://graphql.anilist.co',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  method: 'POST'
})

const aniListAPI = (query: string, variables: unknown): Promise<AxiosResponse> => {
  return aniListClient({
    data: {
      query,
      variables
    }
  })
}

// #region QUERIES

const STAFF_QUERY = `
  query($q: String!) {
    Staff(search: $q) {
      id
      name {
        native
        full
      }
      description
      image {
        medium
      }
      siteUrl
    }
  }
`

const ANIME_QUERY = `
    query($q: String!) {
      Media(type: ANIME, search: $q) {
        id
        title {
          english
          romaji
          native
        }
        description
        season
        seasonYear
        episodes
        coverImage {
          medium
        }
        genres
        siteUrl
        characters (sort: ROLE, perPage: 5) {
          edges {
            node {
              name {
                full
              }
              siteUrl
            }
            voiceActors (language: JAPANESE) {
              name {
                full
              }
              siteUrl
            }
          }
        }
      }
    }
`

// #endregion

const getStaff = async (query: string): Promise<Staff | null | undefined> => {
  const staffDetail = await aniListAPI(STAFF_QUERY, {
    q: query
  })

  return staffDetail.data.data.Staff
}

const getAnime = async (query: string): Promise<Anime | null | undefined> => {
  const animeDetail = await aniListAPI(ANIME_QUERY, {
    q: query
  })

  return animeDetail.data.data.Media
}

export default { getStaff, getAnime }
