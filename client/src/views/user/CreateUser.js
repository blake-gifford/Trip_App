import React, { useState, useContext } from 'react'
import UserForm from "../../components/UserForm"
import axios from 'axios'
import { navigate } from '@reach/router'
import Context from '../../components/Context';

const initialErrors = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const initialRegister = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips: [],
}

const initialUser = {
    _id: "",
    firstName: "",
    lastName:"",
    userName:"",
    email:"",
}

const CreateUser = () => {
    const context = useContext(Context);
    const [ register, setRegister ] = useState(initialRegister);
    const [ isAuthenticated, setIsAuthenticated]= useState(false)
    const [ errors, setErrors ] = useState(initialErrors);


    const registerChangeHandler = e => {
        setRegister({
            ...register,
            [e.target.name]:e.target.value
        })
    }


    const registerSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', register, { withCredentials: true })
        .then(response => {
            const { message, results } = response.data
            if( message === "success"){
                setIsAuthenticated(true)
                console.log(response.data.results)
                context.setLoggedInUser(response.data.results)
                navigate(`/`)
            } else {
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
    }

    return (
        <div>
            <form onSubmit={registerSubmitHandler} >
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" id="" onChange={registerChangeHandler} value={register.firstName}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" id="" onChange={registerChangeHandler} value={register.lastName}/>
                </div>
                <div>
                    <label htmlFor="userName">Username:</label>
                    <input type="text" name="userName" id="" onChange={registerChangeHandler} value={register.userName}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="" onChange={registerChangeHandler} value={register.email}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="" onChange={registerChangeHandler} value={register.password}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="text" name="confirmPassword" id="" onChange={registerChangeHandler} value={register.confirmPassword}/>
                </div>
                <input type="submit" value="Register" />
                
            </form>
        </div>
    )
}

export default CreateUser
