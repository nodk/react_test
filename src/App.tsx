import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import MapPane from "./Map/MapPane";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MapPane />
    </div>
  )
}

export default App
