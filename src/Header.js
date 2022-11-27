import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
function Header(){
    const navigate = useNavigate();
    function gsgs(){
        navigate("/")
    }
    return(
        <div className="Header">
            <button  class = "but1" name ="button" type ="button" onClick ={gsgs}>Home</button>
        </div>
    );
}
export default Header;