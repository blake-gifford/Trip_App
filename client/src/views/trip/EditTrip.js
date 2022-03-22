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


const EditTrip = props => {
    const { trip_id }= props;
    const context = useContext(Context);
    const { _id } = context.loggedInUser;
    const [ trip, setTrip] = useState(initialTrip)
    const [ errors, setErrors] = useState(initialErrors)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${_id}`)
            .then(response => {
                setTrip(response.data.results.trips.filter(t=>trip_id===t._id)[0])
                console.log(response.data.results.trips.filter(t=>trip_id===t._id)[0])
                console.log(response)
            })

            .catch(err => console.log(err))
    },[_id, trip_id])

    const changeHandler = e => {
        const { name, value } = e.target;
        setTrip({...trip, [name]:value})
    }

    console.log(trip)

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
        <div>
            <h2 className="App">Edit: { trip.name }</h2>
            <TripForm  trip={trip} changeHandler = {changeHandler} submitHandler = {submitHandler} errors={errors} action="Edit Trip!"/>
            <button className="roundButton" onClick={()=> navigate(`/trip/display/all`)}>Back</button>
        </div>
    )
}

export default EditTrip
