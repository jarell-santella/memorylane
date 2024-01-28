import React, { useState, useEffect } from "react"
import axios from "axios"
import "./SportsSection.css"
import { shuffle } from "../util/shuffle.ts"
import { Sport } from "./SportPanel.tsx"

interface SportsSectionProps {
  year: string
}

const SportsSection: React.FC<SportsSectionProps> = ({ year }) => {
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

  if (error) return <div>Error loading data: {error}</div>
  if (!data) return <div>Loading...</div>

  var text = [data[sports[0] as Sport].text, data[sports[1] as Sport].text, data[sports[2] as Sport].text]

    return (
    <section className={`section sports`}>
        <div className="title">
            <h1>SPORTS</h1>
        </div>
        <div className="container">
            <div className="card">
                <div className="image">
                    <img src='https://cdn.worldvectorlogo.com/logos/nba.svg' />
                </div>
                <div className="content">
                    <h3>{text[0]}</h3>
                    <p></p>
                </div>
            </div>    
            <div className="card">
                <div className="image">
                    <img src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png' />
                </div>
                <div className="content">
                    <h3>{text[1]}</h3>
                    <p></p>
                </div>
            </div>    
            <div className="card">
                <div className="image">
                    <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png' />
                </div>
                <div className="content">
                    <h3>{text[2]}</h3>
                    <p></p>
                </div>
            </div>    
        </div>
    </section>
    );
}

export default SportsSection
