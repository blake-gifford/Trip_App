import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate, Link } from '@reach/router'

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips:[],
}

const Dashboard = props => {
    const { id } = props;
    const [ user, setUser ] = useState(initialUser)

    // useEffect(()=>{
    //     axios.get("weather api")
    //         .then(response=> setUser(response.data.results))
    //         .catch(err => console.log(err))
    //     axios.get("camping api")
    //         .then(response=> setUser(response.data.results))
    //         .catch(err => console.log(err))
    // },[])

    return (
        <>
            <div>
                <h2>Welcome {user.firstName}!</h2>
            </div>
            <div>
                {/* code for the google weather api calls */}
            </div>
            <div>
                {/* code for the camping api calls */}
            </div>
        </>
    )
}

export default Dashboard
