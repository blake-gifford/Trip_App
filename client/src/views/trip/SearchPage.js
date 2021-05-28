import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate, Link } from '@reach/router';
import CreateTrip from './CreateTrip';

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips:[],
}

const initialTrip = {
    name:'',
    location:'',
    startDate:'',
    endDate:'',
}

const SearchPage = props => {

    const { id, trip_id } = props;
    const [ trip, setTrip ] = useState(initialTrip);
    const [ weather, setWeather ] = useState({
        main: "",
        description: "",
        temp:""
    });
    const [ location, setLocation ] = useState("");

    // submit handler


    // change handler for form

    //API call
    // useEffect(()=>{
    //     // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location},uk&APPID=f3a0744fafc427dc1a65f89621a787ee`)
    //     //     .then(response=> {
                
    //     //         let tempInFahrenheit = (response.data.main.temp - 273.15) * 9/5 + 32
    //     //         let flooredTemp = Math.floor(tempInFahrenheit)
    //     //         console.log(flooredTemp)
    //     //         // setWeather(response.data.weather[0])
    //     //         setWeather({...weather, temp: flooredTemp, main: response.data.weather[0].main, description: response.data.weather[0].description})
    //     //         console.log(response.data.weather[0].main)
    //     //         console.log(weather)
    //     //         // console.log(weather)
    //     //         console.log(location)

    //     // })
    //         .catch(err => console.log(err))
    // },[location])

    const changeHandler = e => {
        const { name, value}  = e.target;
            setLocation({...location,
            [name]: value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location.location},usa&APPID=f3a0744fafc427dc1a65f89621a787ee`)
            .then(response=> {
                let tempInFahrenheit = (response.data.main.temp - 273.15) * 9/5 + 32
                let flooredTemp = Math.floor(tempInFahrenheit)
                console.log(flooredTemp)
                // setWeather(response.data.weather[0])
                setWeather({...weather, temp: flooredTemp, main: response.data.weather[0].main, description: response.data.weather[0].description})
                console.log(response.data.weather[0].main)
                // console.log(location.location)
                // console.log(weather)
                // console.log(location)
                navigate(`/trip/create/${location.location}`)
        })
    }

    // const clickHandler = e => {
    //     navigate(`/trip/create/${location.location}`)
    // }

    return (
        <>
            <div className="App, center" >
                <form onSubmit={submitHandler}>
                    <label htmlFor="location"><h3>Search for Trip location: </h3></label>
                    <input type="text" name="location" onChange={changeHandler}/>
                    <button >Submit</button>
                </form>
            </div>
        </>
    )
}

export default SearchPage

// in return run submit handler in form with on change handler and the same state as dash
// axios the submit handler... should be in interp string wit variable being city name... state variable for that
// city, setCity
// weather, setWeather
// change handler in form same as before with spread op with set city ...setCity name: value