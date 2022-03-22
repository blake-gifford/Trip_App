import React, { useState, useContext } from "react";

import axios from "axios";
import { navigate } from "@reach/router";
import Context from '../../components/Context';

const initialLogin = {
    email:'',
    password: '',
}

const initialErrors = {
    email:'',
    password:'',
}
const SignIn = () => {
    // const context = useContext(Context);
    const {loggedInUser, setLoggedInUser}= useContext(Context);
    const [ login, setLogin ]=useState(initialLogin);
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
                setLoggedInUser(response.data.results)
                console.log(response.data)
                navigate(`/`)
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
        <div className="center">
            <h2>Login</h2>
            <hr></hr>
            <form onSubmit={loginSubmitHandler}>
                <div className="pad">
                    <label htmlFor="email">Email:  </label>
                    <input type="text" name="email" id="" onChange={loginChangeHandler} />
                </div>
                <div className="pad">
                    <label htmlFor="password">Password:  </label>
                    <input type="password" name="password" id="" onChange={loginChangeHandler} />
                </div>
                <input type="submit" value="Login" />
                
            </form>
        </div>
    );
    };

export default SignIn;