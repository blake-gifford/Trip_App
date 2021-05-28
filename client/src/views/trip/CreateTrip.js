import React, { useState, useEffect, useContext } from 'react'
import TripForm from "../../components/TripForm"
import axios from 'axios'
import { navigate } from '@reach/router'
import Context from '../../components/Context';

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
    
    const context = useContext(Context);
    const { _id } = context.loggedInUser;
    const { location2 } = props;
    const [ user, setUser ]=useState(initialUser)
    const [ trip, setTrip] = useState(initialTrip)
    const [ errors, setErrors] = useState(initialErrors)
    const [ weather, setWeather ] = useState({
        main: "",
        description: "",
        temp:""
    })
    console.log(context.loggedInUser)

    useEffect(()=>{
        
        setTrip({
            ...trip, location:location2
        })

        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response => setUser(response.data.results))
            .catch(err => console.log(err))
        
        
        
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

    console.log(user)
    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/trip/update/${_id}`, trip)
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
        <div className="App, center">
            <h2>Set Location to {location2}</h2>
            <hr/>
            <TripForm trip = {trip} location={location2} user={user} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Create Trip!"/>
        </div>
    )
}

export default CreateTrip
