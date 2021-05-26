import React, { useState, useEffect } from 'react'
import axios from 'axios'


const initialTrip = {
    name:'',
    location:'',
    startDate:'',
    endDate:'',
}

const DisplayOneTrip = props => {

    const { id, trip_id } = props;
    const [ trip, setTrip ] = useState(initialTrip)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(response => setTrip(response.data.results.trips.filter(t=>trip_id===id)[0]))
            .catch(err => console.log(err))
    },[id])

    
    return (
        <div className="App">
            <h2>Trip Name: {trip.name}</h2>
            <p>Location: {trip.location}</p>
            <p>Start Date: {trip.startDate}</p>
            <p>End Date: {trip.endDate}</p>
        </div>
    )
}

export default DisplayOneTrip

