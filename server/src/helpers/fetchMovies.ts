import axios from 'axios';
import { DataNotFound } from '../errors';

export const fetchMovie = async (year: number) => {
    const stringYear = year.toString();

    return axios
        .get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${stringYear}-01-01&primary_release_date.lte=${stringYear}-12-31&sort_by=popularity.desc`,
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
                throw new DataNotFound("couldn't find movie data for given year")
            }

            return {
                title: response.data.results[0].original_title,
                releaseDate: response.data.results[0].release_date,
                imagePath: "https://image.tmdb.org/t/p/original" + response.data.results[0].poster_path
            };
        })
        .catch((error): void => {
            throw error
          });
}