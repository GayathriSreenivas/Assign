import React, { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home(){
    const [gs , setgs] = useState('login');
    const navigate = useNavigate()
    function gsgs(){
        navigate(gs)
    }
  
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
        if(data.isLoggedIn ) setgs('pro')
        else setgs('login')
         })}
    ,[]
)

    if(gs=='login'){
        return (
            <div className="cls">
           <button className="one1" name ="button" type ="button" onClick ={gsgs}>Login</button>
            </div>
        )
    }
    else{
        return(
            <div className="cls">
        <button className="one1" name ="button" type ="button" onClick ={gsgs}>Profile</button>
            </div>
        )
    }


}
export default Home; 