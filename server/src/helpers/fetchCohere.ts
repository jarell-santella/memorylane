import axios from 'axios';

const apiKey = 'Bearer 74fPI0l6AJzJAPro2P0xK7Atl0BQLjUsbGWe1hp9';

// asking chat bot for nba team that won in year
export const fetchNBA = async (year: number) => {
    const stringYear = year.toString();

    return axios
        .post(
            'https://api.cohere.ai/v1/chat',
            {
                model: 'command',
                message: `can you tell me who won the nba finals in ${stringYear}`,
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `${apiKey}`,
                },
            }
        )
        .then(response => {

            // checking if the returned text from cohere is returning a paragraph
            const periodIndex = response.data.text.indexOf('.');

            let teamReturn = periodIndex !== -1
            ? response.data.text.substring(0, periodIndex)
            : response.data.text;

            return {
              text: teamReturn,
            };
          })
        .catch((error): void => {
            throw error
        });
}

// asking chat bot for nhl team that won in year
export const fetchNHL = async (year: number) => {
    const stringYear = year.toString();

    return axios
        .post(
            'https://api.cohere.ai/v1/chat',
            {
                model: 'command',
                message: `can you tell me who won the NHL stanley cup in ${stringYear}`,
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `${apiKey}`,
                },
            }
        )
        .then(response => {

            // checking if the returned text from cohere is returning a paragraph
            const periodIndex = response.data.text.indexOf('.');

            let teamReturn = periodIndex !== -1
            ? response.data.text.substring(0, periodIndex)
            : response.data.text;

            return {
              text: teamReturn,
            };
          })
        .catch((error): void => {
            throw error
        });
}

// asking chat bot for team that won superbowl in year
export const fetchNFL = async (year: number) => {
    const stringYear = year.toString();

    return axios
        .post(
            'https://api.cohere.ai/v1/chat',
            {
                model: 'command',
                message: `can you tell me who won the superbowl in ${stringYear}`,
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `${apiKey}`,
                },
            }
        )
        .then(response => {

            // checking if the returned text from cohere is returning a paragraph
            const periodIndex = response.data.text.indexOf('.');

            let teamReturn = periodIndex !== -1
            ? response.data.text.substring(0, periodIndex)
            : response.data.text;

            return {
              text: teamReturn,
            };
          })
        .catch((error): void => {
            throw error
        });
}

// using cohere to return a link based on the message given to the chatbot
// input the object.text from the previous fetchNBA, fetchNFL, fetchNHL into this function to return the link
export const fetchLink = async (linkText: string) => {

    return axios
        .post(
            'https://api.cohere.ai/v1/chat',
            {
                model: 'command',
                message: `can you give me a link to learn more about ${linkText}`,
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `${apiKey}`,
                },
            }
        )
        .then(response => {

            // checking for the first occurrance of a link
            const originalText = response.data.text;
            const regex = /(https?:\/\/[^\s]+)/;

            // Match the first HTTP link in the text
            const match = originalText.match(regex);

            // If a match is found, extract the link from the match
            const firstLink = match ? match[0] : "https://www.google.ca";

            return {
              returnedLink: firstLink,
            };
          })
        .catch((error): void => {
            throw error
        });
}