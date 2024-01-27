export interface SongData {
  artistName: string | null
  songName: string | null
}

export function formatSongData(songData: string): SongData {
  const parts = songData.split("\n")

  // "-" means that there is no data in that cell
  if (parts.length !== 2 || songData.trim() === "—") {
    return { artistName: null, songName: null }
  }

  return {
    artistName: parts[1].replace(/\[[0-9]+\]/g, ""),
    songName: parts[0].replace(/\[[0-9]+\]|"/g, ""),
  }
}
