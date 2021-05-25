import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips:[],
}

const ViewUser = props => {

    const { id } = props;
    const [ user, setUser ] = useState(initialUser)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(response => setUser(response.data.results))
            .catch(err => console.log(err))
    },[id])

    return (
        <div className="App">
            <h2>first name: {user.firstName}</h2>
            <h2>last name: {user.lastName}</h2>
            <h2>email: {user.email}</h2>
            <p>change pw <Link></Link></p>
        </div>
    )
}

export default ViewUser
