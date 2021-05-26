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
    const [ weather, setWeather ] = useState({
        main: "",
        description: "",
        temp:""
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(response=> setUser(response.data.results))
            .catch(err => console.log(err))
    },[])
    useEffect(()=>{
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f3a0744fafc427dc1a65f89621a787ee`)
            .then(response=> {
                let tempInFahrenheit = (response.data.main.temp - 273.15) * 9/5 + 32
                let flooredTemp = Math.floor(tempInFahrenheit)
                console.log(flooredTemp)
                // setWeather(response.data.weather[0])
                setWeather({...weather, temp: flooredTemp, main: response.data.weather[0].main, description: response.data.weather[0].description})
                console.log(response.data.weather[0].main)
                console.log(weather)
                // console.log(weather)
        })
            .catch(err => console.log(err))
    },[])



    return (
        <>
            <div>
                <h2>Welcome {user.firstName}!</h2>
            </div>
            <div>
                <p>{weather.main}</p>
                <p>{weather.temp}</p>
                <p>{weather.description}</p>
            </div>
        </>
    )
}

export default Dashboard
