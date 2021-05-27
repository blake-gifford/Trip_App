import React, { useState, useEffect } from 'react'
import TripForm from "../../components/TripForm"
import axios from 'axios'
import { navigate } from '@reach/router'

const initialErrors = {
    name:'',
    location:'',
    startDate:'',
    endDate:'',
}

const initialTrip = {
    name:'',
    location:'',
    startDate:'',
    endDate:'',
}

const initialUser = {
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    trips: [],
}

const CreateTrip = props => {

    const { id, location2 } = props;
    const [ user, setUser ]=useState(initialUser)
    const [ trip, setTrip] = useState(initialTrip)
    const [ errors, setErrors] = useState(initialErrors)
    const [ weather, setWeather ] = useState({
        main: "",
        description: "",
        temp:""
    })


    useEffect(()=>{
        // axios.get(`http://localhost:8000/api/user/${id}`)
        //     .then(response => setUser(response.data.results))
        //     .catch(err => console.log(err))
        
        console.log(location2)

        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location2},usa&APPID=f3a0744fafc427dc1a65f89621a787ee`)
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
    },[])

    const changeHandler = e => {
        const { name, value } = e.target;
        setTrip({...trip, [name]:value})
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/trip/update/${id}`, user)
        .then(response => {
            const { message, results } = response.data
            if( message === "success"){
                navigate('/')
            } else {
                const newErrors = {...initialErrors};
                console.log(response)
                if(results.message){
                    newErrors[message] = results[message];
                }
                for ( const key in results.errors){
                    newErrors[key] = results.errors[key].message;
                }
                setErrors(newErrors);
            }
        })
    }

    return (
        <div>
            <h2>Set Location to {location2}</h2>
            <TripForm location={location2} user={user} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Create Trip!"/>
        </div>
    )
}

export default CreateTrip
