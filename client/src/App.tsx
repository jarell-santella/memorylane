import React, { useState } from 'react';
import { BootUp } from './boot-up';
import Transition from './transition';
import './App.css';

function App() {
  const [year, setYear] = useState("");
  const [complete, setComplete] = useState(false);

  // Function to handle input change in BootUp component
  const handleInput = (input:any) => {
    setYear(input);
  };

  const handleBoot = (state: boolean) => {
    console.log("it is complete: " + state);
    setComplete(state);
  };
  
  return (
    <>
      <BootUp onInput={handleInput} isComplete={handleBoot}/>
      {complete ? <Transition time={year}/> : null}
    </>
  );
}

export default App;
