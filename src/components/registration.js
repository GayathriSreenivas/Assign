import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './registration.css';
function Registration(){
  
    function submitted(e){
        e.preventDefault();
        var ele = document.getElementById('pswd')
        
        var pwd = ele.value
        if(pwd.length<8){
           document.getElementById('gs1').style.display = "block"
        }
        else{
            document.getElementById('gs1').style.display = "none"
        const form = {
            "name":e.target[0].value,
            "email":e.target[1].value,
            "password":e.target[2].value,
        
            "mblnum":e.target[3].value,
            "place":e.target[4].value,
            "address" : e.target[5].value
        }
        // console.log(form)
        fetch('http://127.0.0.1:3002/register',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body : JSON.stringify(form)
        }).then((res)=> res.json())
        .then((output)=>{
            navigate('/login')
        })
        // console.log(form)
    }
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
        // console.log(data)
        if(data.isLoggedIn ) navigate("/pro")
         })}
    ,[]
)
    return(
        <div class = "main">
        <div class = "first1"></div>
        <div class = "firstreg">
            <div class = "one"><b>WELCOME</b></div>
            <div class = "two">Please enter your details</div>
            <div class = "third">Name</div> 
            <form method = "post" onSubmit ={submitted}>
            <div class = "fourth">
                <input type="text" id="Name" name="Name" placeholder="Enter your name"/></div>
            <div class = "five">Email</div>
            <div class = "sixth">
                <input type="email" id="email" name="email" placeholder="Enter your Email"/></div>
                <div class = "registration-seventh">Password</div>
            <div class = "eigth">
                <input type="password" id="pswd" name="password" placeholder="Enter your Password"/>
                <div id="gs1"> Invalid Password (min 8 characters) </div>
                </div>
            <div class = "eleventh">Mobile number</div>
            <div class = "twevelth">
                <input type="text" id="num" name="number" placeholder="Enter your number"/></div>
            <div class = "thirteen">Place</div>
            <div class = "fourteenth">
                <input type="text" id="loc" name="location" placeholder="Enter your Location"/></div>
                <div class = "thirteen">Address</div>
                <div class = "fourteenth">
                <input type="text" id="add" name="address" placeholder="Enter your Address"/></div>
        <div class = "eight">
            <button  class ="but1" type="submit">Register</button></div>
        </form>
        </div>
        <div class = "secondreg"></div>
        <div class = "second2"></div>
        </div>
    )
}
export default Registration;