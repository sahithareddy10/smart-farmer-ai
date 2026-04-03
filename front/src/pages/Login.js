import React,{useState} from "react";
import API from "../api/api";

function Login(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const login = async () => {

await API.post("/auth/login",{email,password});

alert("Login Successful");

};

return(

<div>

<h2>Farmer Login</h2>

<input placeholder="Email"
onChange={(e)=>setEmail(e.target.value)} />

<br/>

<input type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)} />

<br/>

<button onClick={login}>Login</button>

</div>

);

}

export default Login;