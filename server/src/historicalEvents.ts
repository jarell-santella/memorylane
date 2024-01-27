import axios, { AxiosResponse } from 'axios';

// variables used for request
const year = 2020; // placeholder, needs to be changed

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
    function genRandNum(min:number, max:number):number { // returns 
      const randomFloat = Math.random();
      const randomNumber = Math.floor(randomFloat * (max - min + 1)) + min;
      return randomNumber;
    };

    const randNum = genRandNum(0, response.data.length - 1);
    const entry = response.data[randNum];

    // entry information [day, month, event description]
    const entryInfo = [entry.day, entry.month, entry.event];

  })
  .catch(function (error) {
    // Handle error
    console.error('Error:', error);
  });
