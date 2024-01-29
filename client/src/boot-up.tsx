import React, { useState, useEffect } from "react"
import './boot-up.css'


interface BootUpProps {
    onInput: (input: string) => void;
    isComplete: (state:boolean) => void;
}

export const BootUp: React.FC<BootUpProps> = ({ onInput, isComplete }) => {

const [lines, setLines] = useState<string[]>([]);
const [input, setInput] = useState<string>("");
const [loaded, setLoaded] = useState<boolean>(false);

useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/terminal.txt');
      const text = await response.text();
      
      // Split the text based on both line endings and <br/> tags
      const linesArray = text.split(/\r?\n/);
  
      // Remove empty strings from the array
      const linesWithLineBreaks = linesArray.map(line => line.replace(/<br\s*\/?>/g, '\n'));
  
      setLines(linesWithLineBreaks);
    };
    
    fetchData();
    }, []);

    function handleInputValue(e:any) {
        if (e.key === 'Enter') {
            setInput(e.target.value.slice(2))
            onInput(e.target.value.slice(2))
        }
    }

    useEffect(() => {
        // Show the input field after a delay of 10.25 seconds (10250 milliseconds)
        const timeoutId = setTimeout(() => {
          setLoaded(true);
        }, 10250);
    
        // Clear the timeout when the component is unmounted or when input is received
        return () => clearTimeout(timeoutId);
      }, []);
      
    return (
        <div className="containe">
            <div id="crt">
                {lines.map((line, index) => {
                    let style=""
                    if (line[0]==='$'){ //Makes input differnt colour
                        style="rainbow"
                        line = line.substring(1)
                    }

                    if (line[0]==='>'){
                        return(
                            loaded ? <input key={index} className="year-input" defaultValue={"> "} onKeyDown={handleInputValue} autoFocus onBlur={({ target }) => target.focus()}></input> : <></>
                        )
                    }

                    if (line[0]==='!'){
                        line = "Loading memories from " + input + "...";
                    }
                    if (index <= 41 || index > 41 && input != "" && Number(input) >= 1960 && Number(input) <= 2024 ){
                        if (index == 50){
                            setTimeout(() => {
                                isComplete(true)
                            }, 3000);
                        }
                        return(
                            <pre key={index} className={`typing ${style}`} style={{ "--step": line.length, "--delay": index > 41 ? index-41 : index} as React.CSSProperties}>
                                {line}
                            </pre>
                        )
                    } else if (input != "" && (Number(input) > 2024 || Number(input) < 1960)){
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);
                        return(
                            <p className="bad-input">Please enter a year between 1960 and 2024 &gt;:|</p>
                        )
                    }
                })}
            </div>
        </div>
    )
}