import React, {useState} from "react";
import "./LoginPage.css";
import { Navigate } from "react-router-dom";
import { FaUser, FaLock} from "react-icons/fa"

function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className="LoginPage-MainContainer">
            <form  action= "" className="LoginPage-FormContainer">
                <h1>Login</h1>
                <div className="LoginPage-InputBox">
                    <input type="text" placeholder='Username' requred />
                    <FaUser className="LoginPage-Icon"/>
                </div>
                <div className="LoginPage-InputBox">
                    <input type="password" placeholder='Password' requred />
                    <FaLock className="LoginPage-Icon"/>
                </div>

                <div className="LoginPage-RememberForgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#"> Forgot Password </a>
                </div>

                <button type="submit">Login</button>

                <div className = "LoginPage-RegisterLink">
                    <p> Dont have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default  LoginPage;