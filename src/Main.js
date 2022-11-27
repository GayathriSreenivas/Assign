import React,{Component, useEffect}from "react";
import {Link } from 'react-router-dom';
import './Main.css';
import { useNavigate } from "react-router-dom";
export function Main(){
function fun(e){
    document.getElementById("err").innerHTML = "";
    e.preventDefault()
    const form ={
        "email":e.target[0].value,
        "password":e.target[1].value

    }
    fetch('http://127.0.0.1:3002/login',{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(form)
    }).then(res=>res.json())
    .then(gs=>{ //localStorage.setItem("GS",gs.token)
        if(gs.message=="Success"){
            localStorage.setItem("GS",gs.token)
            localStorage.setItem("gaya3",gs.Email)
            navigate('/pro')
        }
        else{
            document.getElementById("err").innerHTML = "Invalid Email or Password...!"
        }
    })

}
const navigate = useNavigate();
useEffect(() =>{

    fetch("http://127.0.0.1:3002/getusername",{
        method: "get",
        headers:{
            "x-access-token": localStorage.getItem("GS")
        }
    })
    .then(res => res.json())
    .then(data =>{ 
        console.log(data)
        if(data.isLoggedIn ) navigate("/pro")
         })}
    ,[] 
)


    return(

        <div class = "main">
        <div class = "first1"></div>
        <div class = "first">
            <div class = "one"><b>WELCOME BACK!</b></div>
            <div class = "two">Welcome Back!Please enter your details</div>
            <form method ="post" onSubmit={fun} >
            <div class = "third">Email</div>
            <div class = "fourth">
                <input type="email" id="username" name="Name" placeholder="Enter your email"/></div>
            <div class = "five">Password</div>
            <div class = "sixth">
                <input type="password" id="password" name="Name" placeholder="Enter your password"/></div>
            <div class = "loginerror"><span id = "err" class="error"></span></div>    
        <div class = "seventh">
            <div class = "login-forgot">
            <Link to="/for">Forgot Password</Link>
            </div>
            </div>
        <div class = "eight">
            <button  class ="but1" type="submit">Sign In</button>
        </div>
        </form>
        <div class = "nine">Dont have an account ?<span><Link to="/sign">Sign up</Link></span></div>
        </div>
        <div class = "second"></div>
        <div class = "second2"></div>
        </div>

    );
}
export default Main;
