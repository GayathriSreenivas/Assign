import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './resetpassword.css';
function Resetpassword(){
const[gs , setgs] = useState(1);
const [mail,setmail] = useState(null);
const [mobile,setmobile] = useState(null)
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
//1st component
function gaya3(){
    document.getElementById("err").innerHTML = ""
    const fun = document.getElementById("Name");
    // console.log(fun.value);
    
    const fun1 = document.getElementById("num");
    setmail(fun.value)
    setmobile(fun1.value)
    // console.log(fun1.value);
    fetch('http://127.0.0.1:3002/generateotp',{
        method : "POST",
        headers :{
            "content-type" :"application/json"
        },
        body :JSON.stringify({
            "email" : fun.value,
            "number" : fun1.value
        })
    }).then((res)=>res.json())
      .then(gs =>{
        // console.log(gs)
        if(gs.status=="nodata"){
            document.getElementById("err").innerHTML = "Entered unregistered Mail Id or Mobile number...!"}
        else{
        fun.value = ""
        setgs(2)}
        })
       
}
//2nd component
function gaya31(){
    document.getElementById("err").innerHTML = ""
    const fun2 = document.getElementById("ot");
    // console.log(fun2.value);
    fetch('http://127.0.0.1:3002/verifyotp',{
        method : "POST",
        headers:{
            "content-type" : "application/json"
        },
        body :JSON.stringify({
            "otp" : fun2.value,
            "mail" : mail,
            "mobile" : mobile
        })
  }).then((res)=>res.json())
    .then(g =>{
        if(g.status=="invalid"){
            document.getElementById("err").innerHTML = "Invalid Otp...!"
        }
        else{
        fun2.value = ""
        setgs(0)
        }
    })

}
//3rd component
function gaya312(){
    document.getElementById("err").innerHTML = "";
    const fun3 = document.getElementById("pwd");
    // console.log(fun3.value);
    const fun4 = document.getElementById("repwd");
    if((fun3.value.length||fun4.value.length)<=8){
        document.getElementById("err").innerHTML = "Invalid Password (minimum length is 8)..";
    }
    else{
    // console.log(fun4.value); 
    if(fun3.value==fun4.value){
    fetch('http://127.0.0.1:3002/resetpassword',{
        method : "POST",
        headers :{
            "content-type":"application/json"
        },
        body :JSON.stringify({
            "password" :fun3.value,
            "email" : mail
        })

  }).then((res)=>res.json())
    .then(g =>{
        navigate('/')
    })
}
else{
    document.getElementById("err").innerHTML = "Passwords does'nt match...!"
}
    }

}

    if(gs == 1){
        return(
            <div class = "main">
        <div class = "first1"></div>
        <div class = "first">
            <div class = "one"><b>RESET PASSWORD</b></div>
            <div class = "third">Email</div>
            <div class = "fourth">
                <input type="email" id="Name" name="Email" placeholder="Enter registered email"/></div>
            <div class = "five">Mobile Number</div>
            <div class = "sixth">
                <input type="text" id="num" name="MobileNum" placeholder="Enter registered mobile number"/></div>
                <div class = "numerror"><span id = "err" class="error"></span></div> 
        <div class = "eight">
            <button  class ="but1" type="button" onClick={gaya3}>Send OTP</button>
        </div>
        </div>
        <div class = "second"></div>
        <div class = "second2"></div>
        </div>
        )
    }

    else if(gs == 2){
        return(
            <div class = "main">
        <div class = "first1"></div>
        <div class = "first">
            <div class = "one"><b>RESET PASSWORD</b></div>
            <div class = "third">OTP</div>
            <div class = "fourth">
                <input class="otpinput" type="text" id="ot" name="Enterotp"  placeholder="Enter OTP"/></div>
                <div class = "otperror"><span id = "err" class="error"></span></div> 
        <div class = "eight">
            <button  class ="but1" type="button" onClick={gaya31}>SUBMIT</button>
        </div>
        </div>
        <div class = "second"></div>
        <div class = "second2"></div>
        </div>
        )

    }

    else{

    
    return(
        <div class = "main">
        <div class = "first1"></div>
        <div class = "first">
            <div class = "one"><b>RESET PASSWORD</b></div>
            <div class = "third">Password</div>
            <div class = "fourth">
                <input type="password" id="pwd" name="Name2" placeholder="Enter your password"/></div>
            <div class = "five">Confirm Password</div>
            <div class = "sixth">
                <input type="password" id="repwd" name="Name2" placeholder="Re-enter your password"/></div>
            <div class = "reseterror"><span id = "err" class="error"></span></div> 
        <div class = "eight">
            <button  class ="but1" type="button" onClick = {gaya312}>Reset Password</button>
        </div>
        </div>
        <div class = "second"></div>
        <div class = "second2"></div>
        </div>
    )}
}
export default Resetpassword;