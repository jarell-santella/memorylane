import React, { useEffect, useState } from 'react';
import './Section.css';
import axios from 'axios';

const colorPalettes: { [key: string]: string[] } = {
  '1970': ['#608125', '#824920', '#467486', '#808026', '#854982', '#d2a741'],
  '1980': ['#cb87a9', '#718aa0', '#3f5d3e', '#377e7f', '#ea8777', '#bac85f'],
  '1990': ['#3f5d3e', '#7f170e', '#cb87a9', '#97cce8', '#d47861', '#584135'],
  '2000': ['#8e8257', '#badfe5', '#443121', '#d47861', '#808026', '7f170e'],
  '2010': ['#f8d3dc', '#081e3d', '#d47861', '#458933', '#449979', '#edd064'],
  '2020': ['#296218', '#798160', '#081e3d', '#1b46a5', '#449979', '#8a8681'],
};

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


const getColorPalette = (year: number) => {
  if (year < 1970) {
    return colorPalettes['1970'];
  } else if (year > 2020) {
    return colorPalettes['2020'];
  } else {
    const decade = `${Math.floor(year / 10) * 10}`;
    console.log('the decade is:',decade)
    return colorPalettes[decade];
  }
};

function getRandomFlip() {
    const randomVal = Math.random();
    return randomVal > 0.5;
}


const Section: React.FC<{ topic: string; year: string; }> = 
                        ({ topic, year }) => {

//   console.log('the topic is: ', topic);
//   console.log('the year is: ', year);
  const palette = getColorPalette(parseInt(year) || 2020);
//   console.log(palette);
  const randomColor = palette[Math.floor(Math.random() * palette.length)];

  const sectionStyle = {
    backgroundColor: randomColor,
  };

  const flip = getRandomFlip();
  const yearInt = parseInt(year);

  const [data, setData] = useState<any>(null);

  const getStr = 'http://localhost:3000/billboard/' + year;
  console.log(getStr);

  if(topic == 'songs'){

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
              setData(genresData);
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
            <section className={`section music`} style={sectionStyle}>
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
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
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
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
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
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
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
            <section className={`section music`} style={sectionStyle}>
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
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
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
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
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
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/IPod_wheel.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
            );
    }}

  return (
    <section className={`section ${topic}`} style={sectionStyle}>
        <div className="title">
            <h1>{topic.toUpperCase()}</h1>
        </div>
        <div className="body">
            <div className="card c1">
            </div>
            <div className="card c2">
            </div>
            <div className="card c3">
            </div>
        </div>
    </section>
  );
};

export default Section;
