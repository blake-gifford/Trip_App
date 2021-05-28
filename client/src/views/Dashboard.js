import '../App.css';
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { navigate, Link } from '@reach/router'
import Context from '../components/Context'

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
    const context = useContext(Context)
    const { _id } = context.loggedInUser;
    const [ user, setUser ] = useState(initialUser)
    const [ weather, setWeather ] = useState({
        main: "",
        description: "",
        temp:""
    })

    console.log(context.loggedInUser.userName)
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${_id}`)
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
        <div className="container">
            <div className="center">
                <h2>Welcome {user.userName}!</h2>
            </div>
            <div className="dash_flex">
                <div className="dash_weather">
                    <h3>Current Temperature outside: {weather.temp}°F</h3>
                    <h3>{weather.main}</h3>
                    <h3>{weather.description}</h3>
                </div>
                <div className="dash_weather">
                    <h2>This is filler text until we decide what to put here!</h2>
                    <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, deserunt velit voluptas voluptatibus nostrum amet, ipsum, reprehenderit officia repudiandae architecto fugit. Consectetur, dolores qui molestias eos iure quia suscipit inventore.</h4>
                    <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, deserunt velit voluptas voluptatibus nostrum amet, ipsum, reprehenderit officia repudiandae architecto fugit. Consectetur, dolores qui molestias eos iure quia suscipit inventore.</h4>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
