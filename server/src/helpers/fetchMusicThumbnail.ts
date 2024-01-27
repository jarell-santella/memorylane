import axios from "axios"
import { InvalidDataError } from "../errors"

export const fetchMusicThumbnail = async (
  songName: string,
  artistName: string
) => {
  axios
    .get(`https://api.genius.com/search?q=${encodeURIComponent(songName)}`, {
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_API_TOKEN}`,
      },
    })
    .then((response) => {
      for (const hit of response.data.response.hits) {
        if (
          hit.result.title === songName &&
          artistName.split(" featuring")[0].includes(hit.result.artist_names)
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
