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


const EditTrip = props => {

    const { id } = props;
    const [ trip, setTrip] = useState(initialTrip)
    const [ errors, setErrors] = useState(initialErrors)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/trips/${id}`)
            .then(response => setTrip(response.data.results))
            .catch(err => console.log(err))
    },[id])

    const changeHandler = e => {
        const { name, value } = e.target;
        setTrip({...trip, [name]:value})
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/trip/update/${id}`, trip)
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
            <h2 className="App">Edit: { trip.name }</h2>
            <TripForm trip={trip} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Edit Trip!"/>
        </div>
    )
}

export default EditTrip
