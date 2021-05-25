import React, { useState, useEffect } from 'react'
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

const EditUser = props => {

    const { id } = props;
    const [ user, setUser ] = useState(initialUser);
    const [ errors, setErrors ] = useState(initialErrors);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(response => setUser(response.data.results))
            .catch(err => console.log(err))
    },[id])

    const changeHandler = e => {
        const { name, value } = e.target;
        setUser({...user, [name]:value})
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/user/update/${id}`, user)
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
            <UserForm user={user} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Edit User!"/>
        </div>
    )
}

export default EditUser
