import React from 'react';
import './Section.css';
import SongsSection from './SongsSection';
import SportsSection from './SportsSection';
import EventsSection from './EventsSection';

const colorPalettes: { [key: string]: string[] } = {
  '1970': ['#608125', '#824920', '#467486', '#808026', '#854982', '#d2a741'],
  '1980': ['#cb87a9', '#718aa0', '#3f5d3e', '#377e7f', '#ea8777', '#bac85f'],
  '1990': ['#3f5d3e', '#7f170e', '#cb87a9', '#97cce8', '#d47861', '#584135'],
  '2000': ['#8e8257', '#badfe5', '#443121', '#d47861', '#808026', '7f170e'],
  '2010': ['#f8d3dc', '#081e3d', '#d47861', '#458933', '#449979', '#edd064'],
  '2020': ['#296218', '#798160', '#081e3d', '#1b46a5', '#449979', '#8a8681'],
};

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

export function getRandomFlip() {
    const randomVal = Math.random();
    return randomVal > 0.5;
}

const Section: React.FC<{ topic: string; year: string; }> = 
                        ({ topic, year }) => {

  const palette = getColorPalette(parseInt(year) || 2020);
  const randomColor = palette[Math.floor(Math.random() * palette.length)];

  const sectionStyle = {
    backgroundColor: randomColor,
  };

    if(topic == 'songs'){
        return(
            <SongsSection year={year} bgColor={randomColor}/>
        );
    }
    if(topic == 'sports'){
        return(
            <SportsSection year={year} bgColor={randomColor}/>
        );
    }
    if(topic == 'events'){
      return(
          <EventsSection year={year} />
      );
  }

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
