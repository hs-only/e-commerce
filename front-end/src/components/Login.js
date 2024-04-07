import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth)
        navigate("/");
    },[]);
    const handleLogin=async ()=>{
        console.warn(email,password);
        let result= await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result= await result.json();
        console.warn(result);
        if(!result.auth)
        alert("Please login");
        else{
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/');
        }
    }
    
    return (
        <div className="login">
            <h1 style={{ marginLeft: '13%' }}>Login</h1>
            <input className="inputBox" type="email" placeholder="Enter Email" 
            onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input className="inputBox" type="password" placeholder="Enter Password" 
            onChange={(e)=>setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login;