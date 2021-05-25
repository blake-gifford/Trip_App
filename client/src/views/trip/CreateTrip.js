import React, { useState } from 'react'
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

const CreateTrip = () => {

    const [ trip, setTrip] = useState(initialTrip)
    const [ errors, setErrors] = useState(initialErrors)

    const changeHandler = e => {
        const { name, value } = e.target;
        setTrip({...trip, [name]:value})
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/newtrip`, trip)
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
            <TripForm trip={trip} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Create Trip!"/>
        </div>
    )
}

export default CreateTrip
