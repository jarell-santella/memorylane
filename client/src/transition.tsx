import React, { useEffect, useRef } from "react";
import Clock from './clock';
import './transition.css';

export default function transition(props : any) {
    const [time, setTime] = React.useState(2024);
    const [timeUp, setTimeUp] = React.useState(false);
    let timer = useRef<any>(null);
    useEffect(() => {
            timer.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
                if (time === props.time) {
                    clearInterval(timer.current);
                }
            }, Math.max(100, 800 - 50 * Math.abs(2023 - time))
            );
            return () => {
                clearInterval(timer.current);
        }
    }, [time, props.time]);


    if (time < props.time) {
        setTime(props.time);
        clearInterval(timer.current);
        setTimeUp(true);
    }

    function clock_please(){
        return(
            <Clock />
        )
    }
    return(
        <div className="transition">
            <p className="time">{time}</p>
            {clock_please()}
            {timeUp ? <div className="white-mode"></div> : null}
        </div>    
)}