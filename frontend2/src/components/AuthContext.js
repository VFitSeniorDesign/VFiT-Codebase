import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    let loginUser =  async (e ) => {
        e.preventDefault()
        console.log('Form submitted')
        let response = await fetch('/api/token/', {
            method: 'POST',
           headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json();
        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }
        else{
            alert("Wrong username or password")
        }


        console.log('data: ', data);
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    }

    let updateToken = async () => {
        console.log('update_token called!')
        let response = await fetch('/api/token/refresh/', {
            method: 'POST',
           headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh': authTokens.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        }
        else{
            logoutUser();
        }
    }

    let contextData = { 
        user: user,
        authTokens: authTokens,
        loginUser : loginUser,
        logoutUser: logoutUser,

    }

    useEffect(()=> {
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, 1000 * 60 * 4 ) //4 min
        return () => clearInterval(interval)

    }, [authTokens, loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}