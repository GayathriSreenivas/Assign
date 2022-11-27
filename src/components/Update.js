import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import './registration.css';
function Update(){
    const navigate = useNavigate();
    const [details,setdetails] = useState({"name2":"Gayathrisreenivas",
    "phone" : "8688963441",
    "place" : "Kurnool",
    "email" : "123gayathrisreenivas@gmail.com",
    "address" : "FCIColony,Kurnool"
});
function Cancelfun(e){
    navigate('/pro')
} 

    function updated(e){
        e.preventDefault();
        const form = {
            "Name":e.target[0].value,
            "mblnum":e.target[1].value,
            "place":e.target[2].value,
            "email" : localStorage.getItem("gaya3")
        }
         
        fetch("http://127.0.0.1:3002/update",{
            method : "POST",
            headers:{
                "content-type":"application/json"
        
            },
            body:JSON.stringify(form),

        }).then(res => res.json())
          .then(res=>{
                // console.log(res)
          })


       
    
        // console.log(form)
        alert("Success")
        navigate('/pro')
    
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
        if(data.isLoggedIn ){
            
            const data = {
                "user" : localStorage.getItem("gaya3")
            }
            // console.log(data)
            fetch("http://127.0.0.1:3002/getdetails",{
                    method: "post",
                    headers:{
                        "Content-type" : "application/json",
                    },
                    body:JSON.stringify(data),})
        
                .then(res=> res.json())
                .then(res => setdetails(res) )


        }else{
            navigate('/login')
        }
         })}
    ,[]
)
    return(
        <div class = "main">
        <div class = "first1"></div>
        <div class = "first-reg">
            <div class = "one"><b>Update Details</b></div>
            <div class = "two">Please enter your details to update</div>
            <div class = "third">Edit Name</div> 
            <form method = "post" onSubmit ={updated}>
            <div class = "fourth">
                <input type="text" id="Name" defaultValue={details.name} name="Name" placeholder="Enter your name"/></div>
           
               
            <div class = "eleventh">Edit Mobile number</div>
            <div class = "twevelth">
                <input type="text" id="num" name="number" defaultValue={details.mblnum} placeholder="Enter your number"/></div>
            <div class = "thirteen">Edit Place</div>
            <div class = "fourteenth">
                <input type="text" id="loc" name="location" defaultValue={details.place} placeholder="Enter your Location"/></div>
                
        <div class = "eight">
            <button  class ="but1" type="submit" >Update</button></div>
            <div class = "eight">
            <button  class ="but1" type="submit" onClick={Cancelfun}>Cancel</button></div>
        </form>
        </div>
        <div class = "second-reg"></div>
        <div class = "second2"></div>
        </div>
    )
}
export default Update;