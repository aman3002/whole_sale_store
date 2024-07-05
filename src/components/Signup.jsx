import React, { useState } from "react";
import { owner,action1, validate,user_name} from "../actions/login_sign";
import { useDispatch } from "react-redux";
async function signup(user, pass,dispatch) {
  try {
    const response = await fetch(`${process.env.REACT}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password: pass }),
    });

    if (response.ok) {
      dispatch(validate())
      console.log("Signed up successfully");
    } else {
      if(response.status==403){
        alert("username already exist")
      }
    }
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
}

function Signup({data}) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const handleSignup = async () => {
    await signup(user, pass,dispatch);
    // You can add additional logic here if needed
  };
  const dispatch=useDispatch()
  dispatch(user_name(user))
  const handleGoogleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("ibkjn")
      // Redirect to Google authentication endpoint
      window.location.replace(`${process.env.REACT}/auth/google-login`);
      // Wait until the user is redirected back from Google authentication
      // This code will not execute until the user comes back from Google authentication
      window.addEventListener("focus", async () => {
        // Fetch user data from your backend after successful authentication
        const response = await fetch(`${process.env.REACT}/user`);
        const userData = await response.json();
        console.log(userData);
        const cook={validates:true}
        const setcookie=await fetch(`${process.env.REACT}/cookie`,{
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
        <h1>signup</h1><br/>
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
        <button onClick={()=>handleSignup()}>Submit</button>
        <p>  HAVE AN ACCOUNT?</p> <button onClick={()=>dispatch(action1())} className="size" value="signup">login</button> 
        <button onClick={()=>dispatch(owner())}> be a owner</button>
        <br/>
        <button className="google" onClick={handleGoogleLogin}>
          signup with google
        </button>

      </div>
    </div>
  );
}

export default Signup;
