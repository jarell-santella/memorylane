import axios from "axios"
import { parse, HTMLElement } from "node-html-parser"
import { HTMLParseError } from "../errors"
import { formatSongData } from "../utils/formatting"

export const fetchTopBillboard = async (year: number) => {
  return axios
    .get(
      "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Billboard_Year-End_number-one_singles_and_albums&format=json",
      {
        headers: { "User-Agent": "memorylane" },
      }
    )
    .then((response) => {
      console.log("test")
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
      const rowData: (string | null)[] = Array.from(
        row.querySelectorAll("td")
      ).map((cell) =>
        formatSongData(cell.textContent ? cell.textContent.trim() : "")
      )
      return {
        pop: { single: rowData[1], album: rowData[2] },
        soul: { single: rowData[3], album: rowData[4] },
        country: { single: rowData[5], album: rowData[6] },
      }
    })
    .catch((error): void => {
      throw error
    })
}
