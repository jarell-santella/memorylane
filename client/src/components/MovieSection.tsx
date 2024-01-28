import { useState, useEffect } from "react"
import axios from "axios"
import './Section.css';
import './MovieSection.css';

const MovieSection = ({ year }: { year: string }) => {


  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/movie/${year}`)
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

  console.log(`http://localhost:3000/get/movie/${year}`);
  if (error) return <div>Error loading data</div>
  if (!data) return <div>Loading...</div>

  const movies = Object.keys(data).map((yearKey) => {
    const movie = data[yearKey];
    const { title, releaseDate, imagePath } = movie;
    return { yearKey, title, releaseDate, imagePath };
  });

  console.log('movies: ', movies[0]);
  console.log('movies: ', movies[0].releaseDate);
  console.log('movies: ', movies[0].title);

  return (
    <div className="section movies">
      <div className="spotlight"></div>
      <div className="spotlight"></div>
      <div className="spotlight"></div>
      <div className="title-mov">
        <h1>MOVIES</h1>
      </div>
      <div className="body-mov">
        <div className="card-mov">
          <div className="poster">
            <img src={movies[0].imagePath} alt={movies[0].title} />
          </div>
          <div className="mov-info">
            <p>{movies[0].title}</p>
            <p>{movies[0].releaseDate}</p>
          </div>
        </div>
        <div className="card-mov">
          <div className="poster">
            <img src={movies[1].imagePath} alt={movies[1].title} />
          </div>
          <div className="mov-info">
            <p>{movies[1].title}</p>
            <p>{movies[1].releaseDate}</p>
          </div>
        </div>
        <div className="card-mov">
          <div className="poster">
            <img src={movies[2].imagePath} alt={movies[2].title} />
          </div>
          <div className="mov-info">
            <p>{movies[2].title}</p>
            <p>{movies[2].releaseDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSection
