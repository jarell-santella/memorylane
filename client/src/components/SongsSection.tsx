import React, { useEffect, useState } from "react"
import "./Section.css"
import axios from "axios"
import { getRandomFlip } from "./Section.tsx"

const songCompliments: string[] = [
  "This song is fire!",
  "Absolute vibe!",
  "Can't stop grooving!",
  "An instant classic!",
  "Pure magic!",
  "So catchy!",
  "Iconic tune!",
  "Bringing back memories!",
  "On repeat for days!",
  "Ear candy!",
  "Feel-good anthem!",
  "Masterpiece in every beat!",
  "i mean its alright.",
  "GOATED",
]

function getRandomSongCompliment() {
  const randomVal = Math.floor(Math.random() * songCompliments.length)
  return songCompliments[randomVal]
}

const genres = ["pop", "soul", "country"]

const getRandomGenre = (): string => {
  return genres[Math.floor(Math.random() * genres.length)]
}

interface SongsSectionProps {
  year: string
  bgColor: string
}

interface SongData {
  artistName: string
  songName: string
  thumbnail: string | null
}

const SongsSection: React.FC<SongsSectionProps> = ({ year, bgColor }) => {
  const topic = "Songs"

  const flip = getRandomFlip()

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const randomGenres = Array.from({ length: 3 }, () => getRandomGenre())

  const getSongData = (index: number): SongData => {
    return data[data.years[index]][randomGenres[index]]
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/billboard/${year}`)
      .then((response) => {
        // Get years returned in ascending order and add it as field in JSON
        response.data.years = Object.keys(response.data)
          .map((key) => parseInt(key))
          .sort((a, b) => a - b)
        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
  }, [year])

  if (error) return <div>Error loading data: {error}</div>
  if (!data) return <div>Loading...</div>

  if (flip) {
    return (
      <section className={`section music`} style={{ backgroundColor: bgColor }}>
        <div className="body">
          <div className="side left">
            <div className="age-msg">
              <p>{getRandomSongCompliment()}</p>
            </div>
            <div className="card c1">
              <div className="screen">
                <div className="thumbnail">
                  <img
                    src={getSongData(0).thumbnail!}
                    alt={getSongData(0).artistName}
                  />
                </div>
                <div className="info">
                  <p>Title: {getSongData(0).songName}</p>
                  <p>Artist: {getSongData(0).artistName}</p>
                  <p>Year: {data.years[0]}</p>
                </div>
              </div>
              <div className="bottom">
                <a
                  href={
                    "https://www.google.com/search?q=" +
                    getSongData(0).artistName +
                    " " +
                    getSongData(0).songName
                  }
                  target="blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="side middle">
            <div className="age-msg">
              <p>{getRandomSongCompliment()}</p>
            </div>
            <div className="card c2">
              <div className="screen">
                <div className="thumbnail">
                  <img
                    src={getSongData(1).thumbnail!}
                    alt={getSongData(1).artistName}
                  />
                </div>
                <div className="info">
                  <p>Title: {getSongData(1).songName}</p>
                  <p>Artist: {getSongData(1).artistName}</p>
                  <p>Year: {data.years[1]}</p>
                </div>
              </div>
              <div className="bottom">
                <a
                  href={
                    "https://www.google.com/search?q=" +
                    getSongData(1).artistName +
                    " " +
                    getSongData(1).songName
                  }
                  target="blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="side right">
            <div className="age-msg">
              <p>{getRandomSongCompliment()}</p>
            </div>
            <div className="card c3">
              <div className="screen">
                <div className="thumbnail">
                  <img
                    src={getSongData(2).thumbnail!}
                    alt={getSongData(2).artistName}
                  />
                </div>
                <div className="info">
                  <p>Title: {getSongData(2).songName}</p>
                  <p>Artist: {getSongData(2).artistName}</p>
                  <p>Year: {data.years[2]}</p>
                </div>
              </div>
              <div className="bottom">
                <a
                  href={
                    "https://www.google.com/search?q=" +
                    getSongData(2).artistName +
                    " " +
                    getSongData(2).songName
                  }
                  target="blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="title">
          <h1>{topic.toUpperCase()}</h1>
        </div>
      </section>
    )
  } else {
    return (
      <section className={`section music`} style={{ backgroundColor: bgColor }}>
        <div className="title">
          <h1>{topic.toUpperCase()}</h1>
        </div>
        <div className="body">
          <div className="side left">
            <div className="age-msg">
              <p>{getRandomSongCompliment()}</p>
            </div>
            <div className="card c1">
              <div className="screen">
                <div className="thumbnail">
                  <img
                    src={getSongData(0).thumbnail!}
                    alt={getSongData(0).artistName}
                  />
                </div>
                <div className="info">
                  <p>Title: {getSongData(0).songName}</p>
                  <p>Artist: {getSongData(0).artistName}</p>
                  <p>Year: {data.years[0]}</p>
                </div>
              </div>
              <div className="bottom">
                <a
                  href={
                    "https://www.google.com/search?q=" +
                    getSongData(0).artistName +
                    " " +
                    getSongData(0).songName
                  }
                  target="blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="side middle">
            <div className="age-msg">
              <p>{getRandomSongCompliment()}</p>
            </div>
            <div className="card c2">
              <div className="screen">
                <div className="thumbnail">
                  <img
                    src={getSongData(1).thumbnail!}
                    alt={getSongData(1).artistName}
                  />
                </div>
                <div className="info">
                  <p>Title: {getSongData(1).songName}</p>
                  <p>Artist: {getSongData(1).artistName}</p>
                  <p>Year: {data.years[1]}</p>
                </div>
              </div>
              <div className="bottom">
                <a
                  href={
                    "https://www.google.com/search?q=" +
                    getSongData(1).artistName +
                    " " +
                    getSongData(1).songName
                  }
                  target="blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="side right">
            <div className="age-msg">
              <p>{getRandomSongCompliment()}</p>
            </div>
            <div className="card c3">
              <div className="screen">
                <div className="thumbnail">
                  <img
                    src={getSongData(2).thumbnail!}
                    alt={getSongData(2).artistName}
                  />
                </div>
                <div className="info">
                  <p>Title: {getSongData(2).songName}</p>
                  <p>Artist: {getSongData(2).artistName}</p>
                  <p>Year: {data.years[2]}</p>
                </div>
              </div>
              <div className="bottom">
                <a
                  href={
                    "https://www.google.com/search?q=" +
                    getSongData(2).artistName +
                    " " +
                    getSongData(2).songName
                  }
                  target="blank"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SongsSection
