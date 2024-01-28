import React from 'react';
import './Section.css';
import { getRandomFlip } from './Section.tsx'
import frontJersey from '../assets/front-jersey.png'
import backJersey from '../assets/back-jersey.png'

interface SportsSectionProps {
    year: string;
    bgColor: string;
  }

const SportsSection: React.FC<SportsSectionProps> = ({ year, bgColor }) => {
    
    // randomizing 2 years and setting array for all the years 
    const getRandomNumber = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1) + min)

    const currentYear = new Date().getFullYear()

    const halfwayYear = (parseInt(year) + currentYear) / 2
    const yearsToSubtract = Math.floor((currentYear - parseInt(year)) * 0.1)

    const years: number[] = [
      parseInt(year),
      getRandomNumber(
        parseInt(year) + yearsToSubtract + 1,
        halfwayYear - yearsToSubtract * 0.5
      ),
      getRandomNumber(
        halfwayYear + yearsToSubtract + 1,
        currentYear - yearsToSubtract
      ),
    ]



    const flip = getRandomFlip();
    const topic = 'Sports';
    
    if(flip){
        return(
            <section className={`section sports`} style={{backgroundColor: bgColor}}>
            <div className="title">
                <img className='top' src={frontJersey} alt="" />
                <h1>{topic.toUpperCase()}</h1>
                <div className="back">
                    <p>{year.slice(-2)}</p>
                    <img src={backJersey} alt="" />
                </div>
            </div>
            <div className="body">
                <div className="row r1">
                    <div className="side-title">
                        <img src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png" alt="" />
                    </div>
                    <div className="mid-info">

                    </div>
                    <div className="side-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1024px-Basketball_Clipart.svg.png" alt="" />
                    </div>
                </div>
                <div className="row r2">
                    <div className="side-img">
                    <img src="https://pngimg.com/d/american_football_PNG59.png" alt="" />
                    </div>
                    <div className="mid-info">

                    </div>
                    <div className="side-title">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" alt="" />
                    </div>
                </div>
                <div className="row r3">
                <div className="side-title">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png" alt="" />
                    </div>
                    <div className="mid-info">

                    </div>
                    <div className="side-img">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/018/062/545/small/ice-hockey-player-sport-team-png.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
        );
    }
    else{
        return(
            <section className={`section sports`} style={{backgroundColor: bgColor}}>
            <div className="body">
                <div className="row r1">
                    <div className="side-title">
                        <img src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png" alt="" />
                    </div>
                    <div className="mid-info">

                    </div>
                    <div className="side-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1024px-Basketball_Clipart.svg.png" alt="" />
                    </div>
                </div>
                <div className="row r2">
                    <div className="side-img">
                    <img src="https://pngimg.com/d/american_football_PNG59.png" alt="" />
                    </div>
                    <div className="mid-info">

                    </div>
                    <div className="side-title">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" alt="" />
                    </div>
                </div>
                <div className="row r3">
                <div className="side-title">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png" alt="" />
                    </div>
                    <div className="mid-info">
                    </div>
                    <div className="side-img">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/018/062/545/small/ice-hockey-player-sport-team-png.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="title">
                <img className='top' src={frontJersey} alt="" />
                <h1>{topic.toUpperCase()}</h1>
                <div className="back">
                    <p>{year.slice(-2)}</p>
                    <img src={backJersey} alt="" />
                </div>
            </div>
        </section>
        );
    }
};

export default SportsSection