import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Section.css"
import { getRandomFlip } from "./Section.tsx"
import { shuffle } from "../util/shuffle.ts"
import frontJersey from "../assets/front-jersey.png"
import backJersey from "../assets/back-jersey.png"
import SportPanel, { Sport } from "./SportPanel.tsx"

interface SportsSectionProps {
  year: string
  bgColor: string
}

const SportsSection: React.FC<SportsSectionProps> = ({ year, bgColor }) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  // randomizing 2 years and setting array for all the years
  const getRandomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min)

  const currentYear = new Date().getFullYear()

  const halfwayYear = (parseInt(year) + currentYear) / 2
  const yearsToSubtract = Math.floor((currentYear - parseInt(year)) * 0.1)

  const years: number[] = [
    parseInt(year),
    getRandomNumber(
      parseInt(year) + yearsToSubtract + 1,
      halfwayYear - yearsToSubtract * 0.5
    ),
    getRandomNumber(
      halfwayYear + yearsToSubtract + 1,
      currentYear - yearsToSubtract
    ),
  ]

  const sports: string[] = ["nba", "nhl", "nfl"]

  shuffle(sports)

  useEffect(() => {
    const requests = years.map((year, index) =>
      axios.get(`http://localhost:3000/${sports[index]}/${year}`)
    )

    Promise.all(requests)
      .then((responses) => {
        const results = responses.map((response) => response.data)

        const responseObject: any = {}
        sports.forEach((sport, index) => {
          responseObject[sport] = results[index]
        })
        console.log(responseObject)
        setData(responseObject)
      })
      .catch((error: any) => {
        setError(error)
      })
  }, [year])

  const flip = getRandomFlip()
  const topic = "Sports"

  if (error) return <div>Error loading data: {error}</div>
  if (!data) return <div>Loading...</div>

  if (flip) {
    console.log(sports)
    return (
      <section
        className={`section sports`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="title">
          <img className="top" src={frontJersey} alt="" />
          <h1>{topic.toUpperCase()}</h1>
          <div className="back">
            <p>{year.slice(-2)}</p>
            <img src={backJersey} alt="" />
          </div>
        </div>
        <div className="body">
          <div className="row r1">
            <SportPanel
              sport={sports[0] as Sport}
              text={data[sports[0] as Sport].text}
            />
          </div>
          <div className="row r2">
            <SportPanel
              sport={sports[1] as Sport}
              text={data[sports[1] as Sport].text}
            />
          </div>
          <div className="row r3">
            <SportPanel
              sport={sports[2] as Sport}
              text={data[sports[2] as Sport].text}
            />
          </div>
        </div>
      </section>
    )
  } else {
    return (
      <section
        className={`section sports`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="body">
          <div className="row r1">
            <SportPanel
              sport={sports[0] as Sport}
              text={data[sports[0] as Sport].text}
            />
          </div>
          <div className="row r2">
            <SportPanel
              sport={sports[1] as Sport}
              text={data[sports[1] as Sport].text}
            />
          </div>
          <div className="row r3">
            <SportPanel
              sport={sports[2] as Sport}
              text={data[sports[2] as Sport].text}
            />
          </div>
        </div>
        <div className="title">
          <img className="top" src={frontJersey} alt="" />
          <h1>{topic.toUpperCase()}</h1>
          <div className="back">
            <p>{year.slice(-2)}</p>
            <img src={backJersey} alt="" />
          </div>
        </div>
      </section>
    )
  }
}

export default SportsSection
