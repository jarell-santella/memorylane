import './App.css';
import Section from './components/Section.tsx';


function App() {

  return (
    <>
      <div>
        <Section topic='songs' year='2004' />
        <Section topic='sports' year='2004' />
        <Section topic='events' year='2004' />
      </div>
    </>
  )
}

export default App
