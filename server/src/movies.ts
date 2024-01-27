import axios, { AxiosResponse } from 'axios';

const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDFiMGU4NTdkMGFjMTlmNWU3NDhhYTRmMzg2ZTgxNyIsInN1YiI6IjY1YjRhNjJhMWM2MzViMDE3YjEyZWI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0l6t6cmeD3ZNFN_KRZmmP8_fzMaoRybGF-_XqYTqwUc';

export const fetchMovie = async (year: number) => {

    return axios
        .get(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31&sort_by=popularity.desc", 
            {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                  }
            }
        )
        .then(function (response) {

            if (response.data.length === 0){
                throw new nullDataError("couldn't find movie data for given year")
            }

            return {
                title: response.data.results[0].original_title,
                releaseDate: response.data.results[0].release_date
            };
        })
        .catch(function (error) {
            // Handle error
            console.error('Error:', error);
        });
}