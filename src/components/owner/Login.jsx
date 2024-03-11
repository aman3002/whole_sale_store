import React, { useState } from "react";
import { action1,owner,owner_validate,user_name } from "../../actions/login_sign";
import {useDispatch } from "react-redux";
async function loger(user, pass,dispatch) {
  try {
    const response = await fetch("http://localhost:3001/login_owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password: pass }),
    });

    if (response.ok) {
      dispatch(owner_validate());

      console.log("login up successfully");
    } if(response.status==401) {
      alert("incorrect login/password ");
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
    console.log("open")
    dispatch(user_name(user))
    // You can add additional logic here if needed
  };const handleGoogleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("ibkjn")
      // Redirect to Google authentication endpoint
      window.location.replace("http://localhost:3001/auth/google-login-owner");
  
      // Wait until the user is redirected back from Google authentication
      // This code will not execute until the user comes back from Google authentication
      window.addEventListener("focus", async () => {
        // Fetch user data from your backend after successful authentication
        const response = await fetch("http://localhost:3001/user");
        const userData = await response.json();
        console.log(userData);
        const cook={validates:true}
        const setcookie=await fetch("http://localhost:3001/cookie",{
          method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password: pass }),
        })
      });
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
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
                <button onClick={()=>dispatch(owner())}> be a user</button>
                <br />
        {/* <button className="google" onClick={handleGoogleLogin}>
          login with google
        </button> */}

      </div>
    </div>
  );
}

export default Login;
