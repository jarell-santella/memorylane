import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"
import { fetchTopBillboard } from "./helpers/fetchTopBillboard"
import { getRandomNumber } from "./utils/random"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Express is running!")
})

// Use this just for temporarily testing
app.get("/test/:year", (req: Request, res: Response) => {
  const year: number = parseInt(req.params.year)
  res.send({year: year})
})

app.get(
  "/billboard/:year",
  async (req: Request, res: Response): Promise<void> => {
    const year: number = parseInt(req.params.year)

    if (isNaN(year)) {
      res.status(400).json({ error: "Invalid year" })
      return
    }
    fetchTopBillboard(year)
      .then((response) => {
        res.json(response)
      })
      .catch((error) => {
        res.status(500).json({ error: error.name })
      })
  }
)

app.get(
  "/get/:section/:year",
  async (req: Request, res: Response): Promise<void> => {
    const section: string = req.params.section.toString()
    const year: number = parseInt(req.params.year)

    if (isNaN(year)) {
      res.status(400).json({ error: "Invalid year" })
      return
    }

    const currentYear = new Date().getFullYear()

    const halfwayYear = (year + currentYear) / 2
    const yearsToSubtract = Math.floor((currentYear - year) * 0.1)

    const years: number[] = [
      year,
      getRandomNumber(
        year + yearsToSubtract + 1,
        halfwayYear - yearsToSubtract * 0.5
      ),
      getRandomNumber(
        halfwayYear + yearsToSubtract + 1,
        currentYear - yearsToSubtract
      ),
    ]

    // Create an array of promises
    const requests = years.map((year) =>
      axios.get(
        `http://localhost:${process.env.PORT || 3000}/${section}/${year}`
      )
    )

    try {
      // Execute all requests simultaneously
      const responses = await Promise.all(requests)

      // Extract data from responses
      const results = responses.map((response) => response.data)

      // Construct the response object
      const responseObject: any = {}
      years.forEach((year, index) => {
        responseObject[year] = results[index]
      })

      // Send the response
      res.json(responseObject)
    } catch (error: any) {
      // Handle any errors that occurred during the requests
      res.status(500).json({ error: error.message })
    }
  }
)

app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
