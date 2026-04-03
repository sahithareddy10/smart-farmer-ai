import React, { useState } from "react";
import API from "../api/api";

function Register() {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const register = async () => {

await API.post("/auth/register",{
name,
email,
password
});

alert("Farmer Registered");

};

return(

<div>
<h2>Register Farmer</h2>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
<br/>

<input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
<br/>

<input type="password" placeholder="Password"
onChange={(e)=>setPassword(e.target.value)} />

<br/>

<button onClick={register}>Register</button>

</div>

);

}

export default Register;