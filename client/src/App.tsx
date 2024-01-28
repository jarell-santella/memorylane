import React, { useState } from 'react';
import { BootUp } from './boot-up';
import { Transition } from './transition';
import Section from './components/Section.tsx';
import './App.css';

function App() {

  const [year, setYear] = useState("");
  const [bootComplete, setBootComplete] = useState(false);
  const [transComplete, setTransComplete] = useState(false);

  // Function to handle input change in BootUp component
  const handleInput = (input:any) => {
    setYear(input);
  };

  const handleBoot = (state: boolean) => {
    console.log("it is complete: " + state);
    setBootComplete(state);
  };

  const handleTransition = (state: boolean) => {
    console.log("it is complete: " + state);
    setTransComplete(state);
  };
  
  return (
    <>
      {transComplete ? (
        <>
          <div className="mode-white"></div>
          <div className='sections'>
            <Section topic='songs' year={year} />
            <Section topic='sports' year={year} />
            <Section topic='events' year={year} />
          </div>
        </>
      ) : (
        <>
          {!bootComplete && <BootUp onInput={handleInput} isComplete={handleBoot}/>}
          {bootComplete && !transComplete && <Transition year={Number(year)} isComplete={handleTransition}/>}
        </>
      )}
    </>
  );
}

export default App;
