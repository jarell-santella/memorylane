import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { fetchTopBillboard } from "./helpers/fetchTopBillboard"
import { fetchHistoricalEvents } from "./helpers/fetchHistoricalEvents"
import { fetchShows } from "./helpers/fetchShows"
import { fetchMovie } from "./helpers/fetchMovies"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Express is running!")
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
      .then((data) => {
        res.json(data)
      })
      .catch((error) => {
        res.status(500).json({ error: error.name })
      })
  }
)

app.get(
  "/movie/:year",
  async (req: Request, res: Response): Promise<void> => {
    const year: number = parseInt(req.params.year)

    if (isNaN(year)) {
      res.status(400).json({ error: "Invalid year" })
      return
    }

    fetchMovie(year)
      .then((data) => {
        res.json(data)
      })
      .catch((error) => {
        res.status(500).json({ error: error.name })
      })
  }
)

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
