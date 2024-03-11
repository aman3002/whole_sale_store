import './App.css';
import React, { useState } from "react"
import Over from './components/owner/overal_output';
function App() {
  const [after, setAfter] = useState(0);
  return (
    <div className="App">
        <div>
          < Over/>
        </div>
    </div>
  );
}

export default App;