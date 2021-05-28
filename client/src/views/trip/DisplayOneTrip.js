import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../components/Context';
import {navigate} from '@reach/router'

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
    const [ weather, setWeather ] = useState({
        main: "",
        description: "",
        temp:""
    });

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response => {
                setTrip(response.data.results.trips.filter(t=>trip_id===t._id)[0])
                console.log(response.data.results.trips.filter(t=>trip_id===t._id)[0])
                console.log(response)
            })
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${trip.location},usa&APPID=f3a0744fafc427dc1a65f89621a787ee`)
        .then(response=> {
            let tempInFahrenheit = (response.data.main.temp - 273.15) * 9/5 + 32
            let flooredTemp = Math.floor(tempInFahrenheit)
            setWeather({...weather, temp: flooredTemp, main: response.data.weather[0].main, description: response.data.weather[0].description})
        })

            .catch(err => console.log(err))
    },[_id, trip_id])
    
    return (

        <div className="App">
            <h2>Trip Name: {trip.name}</h2>
            <p>Location: {trip.location}</p>
            <p>Start Date: {trip.startDate}</p>
            <p>End Date: {trip.endDate}</p>
            <p>Today looks: {weather.main}, and it'll be a bit {weather.description}</p>
            <p>The temperature will be: {weather.temp} F</p>
            <button onClick={()=> navigate(`/trip/display/all`)}>Back</button>
        </div>
    )
}

export default DisplayOneTrip

