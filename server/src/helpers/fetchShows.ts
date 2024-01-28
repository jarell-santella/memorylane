import axios from 'axios';
import { DataNotFound } from '../errors';

export const fetchShows = async (year: number) => {
    const stringYear = year.toString();
    
    return axios
        .get(
            `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${stringYear}-01-01&first_air_date.lte=${stringYear}-12-31&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.MOVIE_SHOW_API_TOKEN}`
                  }
            }
        )
        .then(function (response) {

            // checking if data contains objects with data
            if (response.data.length === 0){
                throw new DataNotFound("couldn't find tv show data for given year")
            }

            return {
                title: response.data.results[0].name,
                releaseDate: response.data.results[0].first_air_date,
                imagePath: "https://image.tmdb.org/t/p/original" + response.data.results[0].poster_path
            };
        })
        .catch((error): void => {
            throw error
          });
}