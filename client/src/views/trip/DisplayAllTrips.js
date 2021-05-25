import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate, Link } from '@reach/router'

const DisplayAllTrips = () => {

    const [ trips, setTrips ] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/trips/`)
            .then(response=> setTrips(response.data.results))
            .catch(err => console.log(err))
    },[])

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    trips.map((trip,i)=>
                    <tr className="App" key={i}>
                        <td>{trip.name}</td>
                        <td>{trip.location}</td>
                        <td>{trip.startDate}</td>
                        <td>{trip.endDate}</td>
                        <td>
                            <button onClick = { ()=>navigate(`/trip/${trip._id}`)}>Details</button>
                            <button onClick = { ()=>navigate(`/trip/${trip._id}/edit`)}>Edit</button>
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
