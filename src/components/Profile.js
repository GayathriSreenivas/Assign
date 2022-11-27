import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import './profile.css';
function Profile(){

    const [details,setdetails] = useState({"name":"Gayathrisreenivas",
    "phone" : "8688963441",
    "place" : "Kurnool",
    "email" : "123gayathrisreenivas@gmail.com",
    "address" : "FCIColony,Kurnool"
});
    const navigate = useNavigate();
 function logout(e){
    
    // console.log("loggedout");
    localStorage.removeItem('GS')
    localStorage.removeItem('gaya3')
    navigate('/login')
 }
 function update(e){
    navigate('/Update')
 }

 
 useEffect(() =>{
    const data = {
        "user" : localStorage.getItem("gaya3")
    }
    fetch("http://127.0.0.1:3002/getdetails",{
            method: "post",
            headers:{
                "Content-type" : "application/json",
            },
            body:JSON.stringify(data),})

        .then(res=> res.json())
        .then(res => setdetails(res) )}
          
     ,[]
 )
 

   
  
    return(
        <div class = "main">
        <div class = "first1"></div>
        <div class = "first">
            <div class = "one"><b>USER PROFILE</b></div>
            <div class = "third">Name</div>
            <div class = "fourth">{ details.name }</div>
               
                <div class = "third1">Email</div>
            <div class = "tenth">{ details.email }</div>
            <div class = "eleventh">Address</div>
            <div class = "twelevth">{details.address}</div>
            <div class = "thirteen">Mobile Number</div>
            <div class = "fourteen">{ details.mblnum }</div>
            <div class = "fifteen">Place</div>
            <div class = "sixteen">{ details.place }</div>
            <div class = "eight">
         <button  class ="but1" type="submit" onClick={update}>Update</button>
     </div>
            <div class = "eight">
         <button  class ="but2" type="submit" onClick={logout}>Logout</button>
     </div>
        </div>
        <div class = "second">
             <img className = "image"src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="Docker"/>
        </div>
        <div class = "second2"></div>
        </div>
        
    )
}
export default Profile;
   