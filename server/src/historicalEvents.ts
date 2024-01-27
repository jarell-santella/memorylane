import axios, { AxiosResponse } from 'axios';

// variables used for request
const year = 2020; // placeholder, needs to be changed
const currentYear = new Date().getFullYear();
const apiKey = 'HtRf0xMWbc/x6VphtgdRGg==FEkcU81DXwIAe5hM';

// call request
axios.get(`https://api.api-ninjas.com/v1/historicalevents?year=${year}`, {
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json'
  }
})

  .then(function (response) {
    // Handle success
    console.log('Response:', response.data);

    // picking random entry from the year, returning object for given index
    function genRandYear(selectedYear:number, curYear:number):number { // returns a random year in between the 2 years provided
      const randomFloat = Math.random();
      const randomNumber = Math.floor(randomFloat * (curYear - selectedYear + 1)) + selectedYear;
      return randomNumber;
    };

    const randYear = genRandYear(year, currentYear);
    const entry = response.data[randYear];

    // entry information [day, month, event description]
    const entryInfo = [entry.day, entry.month, entry.event];

  })
  .catch(function (error) {
    // Handle error
    console.error('Error:', error);
  });
