import React, { useState } from "react";

async function loger(user, pass) {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password: pass }),
    });

    if (response.ok) {
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

  const handlelogin = async () => {
    await loger(user, pass);
    // You can add additional logic here if needed
  };

  return (
    <div>
      <div>
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
        <button onClick={handlelogin}>Submit</button>
      </div>
    </div>
  );
}
export default Login;