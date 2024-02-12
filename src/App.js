import './App.css';
import Home from "./components/homepage"
import React, { useState } from "react"
import Apps from './components/owner/Homed';
import Page from './components/owner/formpage';
function App() {
  const [after, setAfter] = useState(0);
  return (
    <div className="App">
        <div>
          <Apps/>
        </div>
    </div>
  );
}

export default App;