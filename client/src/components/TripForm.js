import React,{ useState, useEffect } from 'react'

const TripForm = props => {

    const { submitHandler, changeHandler, errors, user, trip, action, location, name} = props;

    // Trying to prepopulate date
    // const [startDate, setStartDate] = useState()

    // useEffect(()=>{
    //     console.log(trip.startDate)
    //     let temp = trip.startDate.toString()
    //     console.log(temp)
    //     temp.slice(0,9)
    //     console.log(temp)
    //     // setStartDate(temp.toLocaleDateString("en-US"))

    // },[])

    return (
        <div>
            
            <form onSubmit= { submitHandler }>
                <p>
                    {errors.name ?
                    <span>{errors.name}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="" onChange={changeHandler} value={trip.name} />
                </p>
                <p>
                    {errors.location ?
                    <span>{errors.location}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" id="" onChange={changeHandler} value={trip.location}/>

                </p>
                <p>
                    {errors.startDate ?
                    <span>{errors.startDate}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="startDate">Start Date: </label>
                    <input type="date" name="startDate" id="" onChange={changeHandler} />
                </p>
                <p>
                    {errors.endDate ?
                    <span>{errors.endDate}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="endDate">End Date: </label>
                    <input type="date" name="endDate" id="" onChange={changeHandler}  />
                </p>
                <input type="submit" value={ action } />
            </form>
        </div>
    )
}

export default TripForm
