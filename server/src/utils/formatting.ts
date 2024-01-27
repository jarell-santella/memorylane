export function formatSongData(songData: string): string | null {
  const parts = songData.split("\n")
  if (parts.length === 2) {
    songData = parts[1] + " - " + parts[0]
  }
  // "-" means that there is no data in that cell
  return songData.trim() === "—" ? null : songData.replace(/\[[0-9]+\]/g, "")
}
