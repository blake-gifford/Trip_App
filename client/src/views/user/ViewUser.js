import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from '@reach/router'
import Context from '../../components/Context';

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips:[],
}

const ViewUser = () => {

    const context = useContext(Context);
    const { _id } = context.loggedInUser;
    const [ user, setUser ] = useState(initialUser)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response => setUser(response.data.results))
            .catch(err => console.log(err))
    },[_id])

    return (
        <div className="App">
            <h2>User Name:{user.userName}</h2>
            <h2>first name: {user.firstName}</h2>
            <h2>last name: {user.lastName}</h2>
            <h2>email: {user.email}</h2>
            <p>change pw <Link></Link></p>
        </div>
    )
}

export default ViewUser
