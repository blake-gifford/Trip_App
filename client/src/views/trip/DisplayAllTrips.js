import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { navigate, Link } from '@reach/router'
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

const DisplayAllTrips = () => {

    const context = useContext(Context);
    const { _id } = context.loggedInUser
    const [ user, setUser ] = useState(initialUser)
    

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response=> setUser(response.data.results))
            .catch(err => console.log(err))
        
    },[])

    return (
        <div className="App">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        {/* <th>Trip ID</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    user.trips.map((trip, i)=>
                    <tr className="App" key={i}>
                        <td>{trip.name}</td>
                        <td>{trip.location}</td>
                        <td>{trip.startDate}</td>
                        <td>{trip.endDate}</td>
                        {/* <td>{trip._id}</td> */}
                        <td>
                            <button className="roundButton" onClick = { ()=>navigate(`/trip/display/${trip._id}`)}>Details</button>
                            <button className="roundButton" onClick = { ()=>navigate(`/trip/display/${trip._id}/edit`)}>Edit</button>
                        </td>
                    </tr>
                    )
                }
                </tbody>
            </table>
            
        </div>
    )
}

export default DisplayAllTrips
