import React, { useState } from 'react'
import UserForm from "../../components/UserForm"
import axios from 'axios'
import { navigate } from '@reach/router'

const initialErrors = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const CreateUser = () => {
    const [ user, setUser ] = useState(initialUser);
    const [ errors, setErrors ] = useState(initialErrors);

    const changeHandler = e => {
        const { name, value } = e.target;
        setUser({...user, [name]:value})
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user)
        .then(response => {
            const { message, results } = response.data
            if( message === "success"){
                navigate('/')
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
            <UserForm user={user} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Create User!"/>
        </div>
    )
}

export default CreateUser
