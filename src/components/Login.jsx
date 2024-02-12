import React, { useState } from "react";
import { owner,action1,validate,user_name } from "../actions/login_sign";
import {useDispatch } from "react-redux";
async function loger(user, pass,dispatch) {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password: pass }),
    });

    if (response.ok) {
      dispatch(validate());

      console.log("login up successfully");
    } else {
      console.error("Error signing up:", response.statusText);
    }
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
}

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const dispatch=useDispatch()
  const handlelogin = async () => {
    await loger(user, pass,dispatch);
    dispatch(user_name(user))
    // You can add additional logic here if needed
  };

  return (
    <div>
      <div>
        <h1>login</h1><br/>
        username &nbsp;
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />
        password &nbsp;
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          required
        />
        <button onClick={()=>handlelogin()}>Submit</button><br/>
                <p> dont HAVE AN ACCOUNT?</p> <button onClick={()=>dispatch(action1())} className="size" value="signup">signup</button> 
                <button onClick={()=>dispatch(owner())}>owner</button>

      </div>
    </div>
  );
}

export default Login;
