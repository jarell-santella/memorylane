import { useState, useEffect } from "react"
import axios from "axios"
import './events.css';
import './Section.css';
import Section from "./Section"

const EventsSection = ({ year }: { year: string }) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/events/${year}`)
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



  //Getting todays date
  const weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
  const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  let today = new Date();
  let day = weekday[today.getDay()];
  let dd = today.getDate();
  let mm = months[today.getMonth()];
  let date = day + ', ' + mm + ' ' + dd + ", " + year;


  //Throw away text for the unreadable background
  let smol_text = "In the bustling streets of New York City, where the echoes of diverse voices weave a tapestry of stories, each corner holds a secret waiting to be unfolded. From the towering skyscrapers to the hidden alleys, the city breathes history, ambition, and dreams. Amidst the ever-flowing river of yellow taxis and the constant hum of life, the pulse of the city beats with the rhythm of its inhabitants. A symphony of voices, cultures, and experiences, intertwining to create a narrative that is uniquely New York. In the heart of Times Square, where the glow of billboards paints the night with vibrant hues, the city's heartbeat is felt the strongest. Here, beneath the glow of neon lights, stories unfold like the pages of a well-worn newspaper, capturing the essence of a city that never sleeps. As the morning sun rises over Central Park, joggers weave through the pathways, and coffee shops hum with the anticipation of a new day. The aroma of bagels and the sound of honking horns create a harmony that is quintessentially New York. From the historic pages of the New York Times to the contemporary narratives of the digital age, the city's stories are etched into the collective memory of its people. In the quiet corners of libraries and the lively discussions of local cafes, the city's spirit thrives. This is New York – a city of dreams, a city of stories, where every street corner tells a tale, and every skyline paints a picture of ambition and resilience."
  
  //Headlines
  let headlines = ["THIS JUST IN!", "BREAKING NEWS!", "EXTRA EXTRA!", "READ ALL ABOUT IT!", "STOP THE PRESSES!", "HOT OFF THE PRESS!"]
  
  function getRandomHeadline(){
    const randomVal = Math.floor(Math.random() * headlines.length);
    return headlines[randomVal];
}
  return (
    <>
      {/* {Object.keys(data).map((yearKey) => (
        <div key={yearKey}>
          <h3>Year: {yearKey}</h3>
          <p>Event Date: {data[yearKey].eventDate}</p>
          <p>Event Name: {data[yearKey].eventName}</p>
        </div>
      ))} */}
      <div className="section holder">
      <p className="background-text">{smol_text + smol_text + smol_text + smol_text + smol_text}</p>
        <div className="top-row">
          <h1 className="top-left-box">"The pasts most important blasts!"</h1>
          <h1 className="events-title">Historical Events</h1>
          <div className="top-right">
            <h1 className="top-right-big">Nostolgia Edition</h1>
            <p className="top-right-lil">Take a ride down memory lane exploring the worlds most historic events throughout the years</p>
          </div>
        </div>
        <div className="bar">
          <p>VOL.CLXIX...</p>
          <p>No.40,997</p>
          <p>©1970 NEW YORK TIMES COMPANY</p>
          <p>NEW YORK, {date}</p>
          <p>10 CENTS</p>
        </div>
        <div className="info-row">
          {Object.keys(data).map((yearKey, index) => (
            <div key={index} className="info ">
              <h1 className="headline">{getRandomHeadline()}</h1>
              <p className="info-date">{data[yearKey].eventDate}</p>
              <h1 className="info-name">{data[yearKey].eventName}</h1>
              <a className="read-more-link" href={'https://www.google.com/search?q=' + data[yearKey].eventName} target='blank'>Read More</a>
            </div>
          ))}

        </div>

      </div>
    </>
  )
}

export default EventsSection
