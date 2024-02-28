import React, {useContext} from "react";
import "./LoginPage.css";
//import { Navigate } from "react-router-dom";
import { FaUser, FaLock} from "react-icons/fa";
import AuthContext from './AuthContext';

function LoginPage(){
    let {loginUser} = useContext(AuthContext);

    return(
        <div className="LoginPage-MainContainer">
            <form  action= "" onSubmit={loginUser} className="LoginPage-FormContainer">
                <h1>Welcome</h1>
                <div className="LoginPage-InputBox">
                    <input type="text" placeholder='Username' name="username" required />
                    <FaUser className="LoginPage-Icon"/>
                </div>
                <div className="LoginPage-InputBox">
                    <input type="password" placeholder='Password'  name="password" required />
                    <FaLock className="LoginPage-Icon"/>
                </div>

                <div className="LoginPage-RememberForgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="/register"> Forgot Password </a>
                </div>

                <button type="submit" >Login</button>

                <div className = "LoginPage-RegisterLink">
                    <p> Dont have an account? <a href="/register"> Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default  LoginPage;