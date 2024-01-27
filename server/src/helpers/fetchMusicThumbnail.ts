import axios from "axios"
import { InvalidDataError } from "../errors"

export const fetchMusicThumbnail = async (
  songName: string,
  artistName: string
) => {
  return axios
    .get(`https://api.genius.com/search?q=${encodeURIComponent(songName)}`, {
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_API_TOKEN}`,
      },
    })
    .then((response) => {
      for (const hit of response.data.response.hits) {
        // This can be problematic if the first artist's artistName is a superset " featuring"
        if (
          hit.result.title === songName &&
          hit.result.primary_artist.name === artistName.split(" featuring")[0]
        ) {
          return hit.result.song_art_image_thumbnail_url
        }
        throw new InvalidDataError("Could not find song")
      }
    })
    .catch((error): void => {
      console.error("Error: ", error)
      throw error
    })
}
