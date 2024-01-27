import axios from "axios"
import { InvalidDataError } from "../errors"

export const fetchMusicThumbnail = async (songName: string, artistName: string) => {
  return axios
    .get(`https://api.genius.com/search?q=${encodeURIComponent(songName)}`, {
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_API_TOKEN}`,
      },
    })
    .then((response) => {
      for (const hit of response.data.response.hits) {
        const resultSongName = hit.result.title
          .replace(/’/g, "")
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "")
        const formattedSongName = songName
          .replace(/'/g, "")
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "")
        const resultArtistName = hit.result.primary_artist.name
          .replace(/’/g, "")
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "")
        const formattedArtistName = artistName
          .split(" featuring")[0]
          .replace(/'/g, "")
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "")

        // This can be problematic if the first artist's artistName is a superset " featuring"
        if (
          resultSongName === formattedSongName && (resultArtistName.includes(formattedArtistName) || formattedArtistName.includes(resultArtistName))
        ) {
          return hit.result.song_art_image_thumbnail_url
        }
      }
      return null;
    })
    .catch((error): void => {
      console.error("Error: ", error)
      throw error
    })
}
