import React, { useState } from "react";

import axios from "axios";
import { navigate } from "@reach/router";

const initialLogin = {
    email:'',
    password: '',
}

const initialErrors = {
    email:'',
    password:'',
}
const SignIn = () => {

    const [login, setLogin] = useState(initialLogin)
    const [ isAuthenticated, setIsAuthenticated]= useState(false)
    const [ errors, setErrors ] = useState(initialErrors);

    const loginChangeHandler =e => {
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }

    const loginSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', login,  { withCredentials: true })    
        .then(response => {
            const { message, results } = response.data
            if( message === "success"){
                setIsAuthenticated(true)
                setLogin(response.data.results)
                navigate(`/${response.data.results._id}`)
            }else{
                alert("Invalid Login Attempt")
                const newErrors = {...initialErrors};
                console.log(response)
                if(results.message){
                    newErrors[message] = results[message];
                }
                for ( const key in results.errors){
                    newErrors[key] = results.errors[key].message;
                }
                setErrors(newErrors);
            }
            
        })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={loginSubmitHandler}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="" onChange={loginChangeHandler} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="text" name="password" id="" onChange={loginChangeHandler} />
                </div>
                <input type="submit" value="Login" />
                
            </form>
        </>
    );
    };

export default SignIn;