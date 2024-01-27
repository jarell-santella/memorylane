import axios from "axios"
import { parse, HTMLElement } from "node-html-parser"
import { HTMLParseError } from "../errors"
import { SongData, formatSongData } from "../utils/formatting"
import { fetchMusicThumbnail } from "./fetchMusicThumbnail"

export const fetchTopBillboard = async (year: number) => {
  return axios
    .get(
      "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Billboard_Year-End_number-one_singles_and_albums&format=json",
      {
        headers: { "User-Agent": "memorylane" },
      }
    )
    .then(async (response) => {
      const htmlContent: string = response.data.parse.text["*"]

      const root: HTMLElement = parse(htmlContent)

      const tableElement: HTMLElement | null = root.querySelector(".wikitable")

      if (!tableElement) {
        throw new HTMLParseError("Couldn't find HTML table.")
      }

      const yearCell: HTMLElement | null = tableElement.querySelector(
        `td:contains('${year}')`
      )

      if (!yearCell) {
        throw new HTMLParseError(
          `Couldn't find table cell containing '${year}'.`
        )
      }

      // Find the parent <tr> element of the yearCell
      const row: HTMLElement | null = yearCell.closest("tr")

      if (!row) {
        throw new HTMLParseError("Couldn't find parent table row element.")
      }

      // Extract data from all <td> elements in the row
      const rowData: SongData[] = Array.from(row.querySelectorAll("td")).map(
        (cell) =>
          formatSongData(cell.textContent ? cell.textContent.trim() : "")
      )

      return {
        pop: {
          artistName: rowData[1].artistName,
          songName: rowData[1].songName,
          thumbnail: await fetchMusicThumbnail(
            rowData[1].songName!,
            rowData[1].artistName!
          ),
        },
        soul: {
          artistName: rowData[3].artistName,
          songName: rowData[3].songName,
          thumbnail: await fetchMusicThumbnail(
            rowData[3].songName!,
            rowData[3].artistName!
          ),
        },
        country: {
          artistName: rowData[5].artistName,
          songName: rowData[5].songName,
          thumbnail: await fetchMusicThumbnail(
            rowData[5].songName!,
            rowData[5].artistName!
          ),
        },
      }
    })
    .catch((error): void => {
      throw error
    })
}
