import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./homepage.css";
import { useSelector } from "react-redux";
function Homes() {
  const [home, sethome] = useState(false);
  const homep=useSelector((state)=>state.reduc1)
  return (
    <div>
      {homep === false ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>
          <Signup />
        </div>
      )}
    </div>
  );
}

export default Homes;
