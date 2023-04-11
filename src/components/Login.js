import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import alertContext from "../context/alert/alertContext";


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let history = useNavigate();
  const alertcontext = useContext(alertContext);

  const handleSunbmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const host = "http://localhost:5000/api";
    const response = await fetch(`${host}/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history("/");
      alertcontext.showAlert("Logged-in Successfully", "success");
    }
    else {
      alertcontext.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSunbmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login;
