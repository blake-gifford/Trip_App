import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    confirmPassword:''
};

const initialLogin = {
    email:'',
    password: '',
}

const Example = () => {

    const [register, setRegister] = useState(initialRegister)
    const [login, setLogin] = useState(initialLogin)
    const [ isAuthenticated, setIsAuthenticated]= useState(false)
    const [user, setUser]=useState({})

    // useEffect(()=>{
    //     axios.get("http://localhost:8000/users/all", { withCredentials: true })
    //         .then(res => setUsers(response.data.results))
    //         .catch(err => console.log(err))
    // },[isAuthenticated])

    // const getUsers =() =>{
    //     axios.get("http://localhost:8000/users/all", { withCredentials: true })
    //         .then(res => setUsers(response.data.results))
    //         .catch(err => console.log(err))
    // }

    const registerChangeHandler = e => {
        setRegister({
            ...register,
            [e.target.name]:e.target.value
        })
    }

    const loginChangeHandler =e => {
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }
    const registerSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', register, { withCredentials: true })
            .then(response => setIsAuthenticated(true))
            .catch(err => console.log(err))
    }

    const loginSubmitHandler =e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', login,  { withCredentials: true })
            .then(response => {
                if( message === " success"){
                    setIsAuthenticated(true)
                }else{
                    alert("Invalid Login Attempt")
                }
                
        })
            .catch(err => console.log(err))
    }

    const logoutHandler = () => {
        axios.get('http://localhost:8000/api/users/logout',  { withCredentials: true })
            .then(response => setIsAuthenticated(false))
            .catch(err => console.log(err))
    }
    return (

        <div>
            <button onClick = {logoutHandler}>Logout</button>
            <form onSubmit={registerSubmitHandler}>
                <div>
                    <label htmlFor="firstName">firstName</label>
                    <input type="text" name="firstName" id="" onchange={registerChangeHandler} value={register.firstName}/>
                </div>
                <div>
                    <label htmlFor="lastName">lastName</label>
                    <input type="text" name="lastName" id="" onchange={registerChangeHandler} value={register.lastName}/>
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="" onchange={registerChangeHandler} value={register.email}/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="text" name="password" id="" onchange={registerChangeHandler} value={register.password}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input type="text" name="confirmPassword" id="" onchange={registerChangeHandler} value={register.confirmPassword}/>
                </div>
                <input type="submit" value="Register" />
                
            </form>
            {
                users.map((user,i)=>
                    <p key={i}> {user.firstName}</p>
                )
            }
            <h2>Login</h2>
            <form onSubmit={loginSubmitHandler}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="" onchange={loginChangeHandler} value={login.email}/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="text" name="password" id="" onchange={loginChangeHandler} value={login.password}/>
                </div>
                <input type="submit" value="Login" />
                
            </form>
        </div>
    )
}

export default Example
