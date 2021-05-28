import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../components/Context';

const initialTrip = {
    name:'',
    location:'',
    startDate:'',
    endDate:'',
}

const DisplayOneTrip = props => {

    const context = useContext(Context);
    const { trip_id } = props;
    const { _id } = context.loggedInUser
    const [ trip, setTrip ] = useState(initialTrip)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response => {
                setTrip(response.data.results.trips.filter(t=>trip_id===t._id)[0])
                console.log(response.data.results.trips.filter(t=>trip_id===t._id)[0])
                console.log(response)
            })

            .catch(err => console.log(err))
    },[_id, trip_id])
    
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

