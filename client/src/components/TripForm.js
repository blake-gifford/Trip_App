import React,{ useState, useEffect } from 'react'

const TripForm = props => {

    const { submitHandler, changeHandler, errors, user, trip, action, location, name} = props;

    return (
        <div>
            <form onSubmit={submitHandler}>
                <p>
                    {errors.name ?
                    <span>{errors.name}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={changeHandler} value={trip.name} />
                </p>
                <p>
                    {errors.location ?
                    <span>{errors.location}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" onChange={changeHandler} value={trip.location}/>
                </p>
                <p>
                    {errors.startDate ?
                    <span>{errors.startDate}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="startDate">Start Date: </label>
                    <input type="date" name="startDate" onChange={changeHandler} />
                </p>
                <p>
                    {errors.endDate ?
                    <span>{errors.endDate}<br></br></span>
                    :
                    ""
                    }
                    <label htmlFor="endDate">End Date: </label>
                    <input type="date" name="endDate" onChange={changeHandler}  />
                </p>
                <input type="submit" value={ action } />
            </form>
        </div>
    )
}

export default TripForm;
