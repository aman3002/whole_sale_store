import React, { useState } from "react";
import { owner,action1, validate,user_name} from "../actions/login_sign";
import { useDispatch } from "react-redux";
async function signup(user, pass,dispatch) {
  try {
    const response = await fetch("http://localhost:3001/signup", {
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
        <button onClick={()=>dispatch(owner())}>owner</button>

      </div>
    </div>
  );
}

export default Signup;
