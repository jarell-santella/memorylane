import React, { useEffect, useState } from 'react';
import './Section.css';
import axios from 'axios';
import { getRandomFlip } from './Section.tsx'

const songCompliments: string[] = [
    "This song is fire!",
    "Absolute vibe!",
    "Can't stop grooving!",
    "An instant classic!",
    "Pure magic!",
    "So catchy!",
    "Iconic tune!",
    "Bringing back memories!",
    "On repeat for days!",
    "Ear candy!",
    "Feel-good anthem!",
    "Masterpiece in every beat!",
    "i mean its alright.",
    "GOATED",
];

function getRandomSongCompliment(){
    const randomVal = Math.floor(Math.random() * songCompliments.length);
    return songCompliments[randomVal];
}

interface SongsSectionProps {
    year: string;
    bgColor: string;
  }

const SongsSection: React.FC<SongsSectionProps> = ({ year, bgColor }) => {

    const topic = 'Songs';

    const getStr = 'http://localhost:3000/billboard/' + year;
    console.log(getStr);
    const yearInt = parseInt(year);
    const flip = getRandomFlip();

    const [musicMatrix, setMusicMatrix] = useState<string[][]>([]);
    musicMatrix.push([]);
    musicMatrix.push([]);
    musicMatrix.push([]);

    useEffect(() => {
        console.log('hello');
        const fetchData = async () => {
            try {
              const response = await axios.get(getStr);
              const responseData = response.data;
          
              interface GenreData {
                artistName: string;
                songName: string;
                thumbnail: string;
              }
          
              // Extract data for each genre
              const genresData: { [key: string]: GenreData } = {};
              const newMusicMatrix: string[][] = [];
              var i = 0;
              for (const genre in responseData) {
                if (Object.hasOwnProperty.call(responseData, genre)) {
                  const genreData = responseData[genre];
                  const { artistName, songName, thumbnail } = genreData;
                  genresData[genre] = { artistName, songName, thumbnail };
                  console.log('the artist name is: ', genresData[genre].artistName);
                  newMusicMatrix[i] = [artistName, songName, thumbnail];
                  i++;
                  console.log('cur music matrix: ', newMusicMatrix)
                }
              }
          
              // Set the extracted data to the state
              setMusicMatrix(newMusicMatrix);
            } catch (error) {
              console.error('Error fetching data: ', error);
            }
          };
    
      fetchData();
    }, []);

    console.log('OK I EXTRACTED:', musicMatrix)
    if(flip){
        return(
            <section className={`section music`} style={{backgroundColor: bgColor}}>
                <div className="body">
                    <div className="side left">
                    <div className="age-msg">
                            <p>{getRandomSongCompliment()}</p>
                    </div>
                        <div className="card c1">
                            <div className="screen">
                                <div className="thumbnail">
                                    <img src={musicMatrix[0][2]} alt={musicMatrix[0][1]} />
                                </div>
                                <div className="info">
                                    <p>Title: {musicMatrix[0][1]}</p>
                                    <p>Artist: {musicMatrix[0][0]}</p>
                                    <p>Year: {yearInt}</p>
                                </div>
                            </div>
                            <div className="bottom">
                                <a href={'https://www.google.com/search?q=' + musicMatrix[0][1] + ' ' + musicMatrix[0][0]} target='blank'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="side middle">
                        <div className="age-msg">
                            <p>{getRandomSongCompliment()}</p>
                        </div>
                        <div className="card c2">
                            <div className="screen">
                                <div className="thumbnail">
                                        <img src={musicMatrix[1][2]} alt={musicMatrix[1][1]} />
                                    </div>
                                    <div className="info">
                                        <p>Title: {musicMatrix[1][1]}</p>
                                        <p>Artist: {musicMatrix[1][0]}</p>
                                        <p>Year: {yearInt}</p>
                                    </div>
                            </div>
                            <div className="bottom">
                                <a href={'https://www.google.com/search?q=' + musicMatrix[1][1] + ' ' + musicMatrix[1][0]} target='blank'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="side right">
                        <div className="age-msg">
                                <p>{getRandomSongCompliment()}</p>
                        </div>
                        <div className="card c3">
                        <div className="screen">
                            <div className="thumbnail">
                                <img src={musicMatrix[2][2]} alt={musicMatrix[2][1]} />
                            </div>
                            <div className="info">
                                <p>Title: {musicMatrix[2][1]}</p>
                                <p>Artist: {musicMatrix[2][0]}</p>
                                <p>Year: {yearInt}</p>
                            </div>
                            </div>
                            <div className="bottom">
                                <a href={'https://www.google.com/search?q=' + musicMatrix[2][1] + ' ' + musicMatrix[2][0]} target='blank'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="title">
                    <h1>{topic.toUpperCase()}</h1>
                </div>
            </section>   
            );
    }
    else{
        return(
            <section className={`section music`} style={{backgroundColor: bgColor}}>
                <div className="title">
                    <h1>{topic.toUpperCase()}</h1>
                </div>
                <div className="body">
                    <div className="side left">
                    <div className="age-msg">
                            <p>{getRandomSongCompliment()}</p>
                    </div>
                        <div className="card c1">
                            <div className="screen">
                                <div className="thumbnail">
                                    <img src={musicMatrix[0][2]} alt={musicMatrix[0][1]} />
                                </div>
                                <div className="info">
                                    <p>Title: {musicMatrix[0][1]}</p>
                                    <p>Artist: {musicMatrix[0][0]}</p>
                                    <p>Year: {yearInt}</p>
                                </div>
                            </div>
                            <div className="bottom">
                                <a href={'https://www.google.com/search?q=' + musicMatrix[0][1] + ' ' + musicMatrix[0][0]} target='blank'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="side middle">
                        <div className="age-msg">
                            <p>{getRandomSongCompliment()}</p>
                        </div>
                        <div className="card c2">
                            <div className="screen">
                                <div className="thumbnail">
                                        <img src={musicMatrix[1][2]} alt={musicMatrix[1][1]} />
                                    </div>
                                    <div className="info">
                                        <p>Title: {musicMatrix[1][1]}</p>
                                        <p>Artist: {musicMatrix[1][0]}</p>
                                        <p>Year: {yearInt}</p>
                                    </div>
                            </div>
                            <div className="bottom">
                                <a href={'https://www.google.com/search?q=' + musicMatrix[1][1] + ' ' + musicMatrix[1][0]} target='blank'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="side right">
                        <div className="age-msg">
                                <p>{getRandomSongCompliment()}</p>
                        </div>
                        <div className="card c3">
                        <div className="screen">
                            <div className="thumbnail">
                                <img src={musicMatrix[2][2]} alt={musicMatrix[2][1]} />
                            </div>
                            <div className="info">
                                <p>Title: {musicMatrix[2][1]}</p>
                                <p>Artist: {musicMatrix[2][0]}</p>
                                <p>Year: {yearInt}</p>
                            </div>
                            </div>
                            <div className="bottom">
                                <a href={'https://www.google.com/search?q=' + musicMatrix[2][1] + ' ' + musicMatrix[2][0]} target='blank'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
            );
    }
};

export default SongsSection