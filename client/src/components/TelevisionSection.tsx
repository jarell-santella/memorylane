import { useState, useEffect } from "react"
import axios from "axios"

const EventsSection = ({ year }: { year: string }) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/tvshow/${year}`)
      .then((response) => {
        setData(response.data) // Data is available in the `data` property of the response
        console.log(year)
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setError(error)
      })
  }, [year])

  if (error) return <div>Error loading data</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      {Object.keys(data).map((yearKey) => (
        <div key={yearKey}>
          <h3>Year: {yearKey}</h3>
          <img src={data[yearKey].imagePath} />
          <p>Title: {data[yearKey].title}</p>
          <p>Release Date: {data[yearKey].releaseDate}</p>
        </div>
      ))}
    </>
  )
}

export default EventsSection
