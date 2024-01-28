import axios from 'axios';
import { DataNotFound } from '../errors';

export const fetchHistoricalEvents = async (year: number) => {
    let stringYear = '';
    // checking if the year is the current year, if it is then we take the prior year
    if(year === new Date().getFullYear()){
        const prevYear = year - 2;
        stringYear = prevYear.toString();
    } else if (year === new Date().getFullYear() - 1){
        const prevYear = year - 1;
        stringYear = prevYear.toString();
    } else {
        stringYear = year.toString();
    }

    return axios
        .get(
            `https://api.api-ninjas.com/v1/historicalevents?year=${stringYear}`, 
            {
              headers: {
                'X-Api-Key': `${process.env.EVENTS_API_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then(function (response) {

            // checking if data contains objects with data
            if (response.data.length === 0){
              throw new DataNotFound("couldn't find historical data for given year")
            }

            // picking random entry from the year, returning object for given index
            function genRandNum(min:number, max:number):number { // returns 
              const randomFloat = Math.random();
              const randomNumber = Math.floor(randomFloat * (max - min + 1)) + min;
              return randomNumber;
            };

            const randNum = genRandNum(0, response.data.length - 1);
            const entry = response.data[randNum];
        
            // entry information date, short description/title
            const entryDate = `${entry.year}-${entry.month}-${entry.day}`;
            return {
              eventDate: entryDate,
              eventName: entry.event
            };
        
          })
          .catch((error): void => {
            console.log(process.env.EVENTS_API_TOKEN);
            throw error
          });
    }
