import axios from 'axios';
import { DataNotFound } from '../errors';

const apiKey = 'HtRf0xMWbc/x6VphtgdRGg==FEkcU81DXwIAe5hM';

export const fetchHistoricalEvents = async (year: number) => {
  const stringYear = year.toString();

    return axios
      .get(`https://api.api-ninjas.com/v1/historicalevents?year=${stringYear}`, {
        headers: {
          'X-Api-Key': apiKey,
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
        const entryDate = entry.year + entry.month + entry.day;
        return {
          eventDate: entryDate,
          eventName: entry.event
        };
    
      })
      .catch((error): void => {
        throw error
      });
}
