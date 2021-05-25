import React from 'react'

const TripForm = props => {

    const { submitHandler, changeHandler, errors, trip, action} = props;


    return (
        <div>
            <form onSubmit= { submitHandler }>
                <p>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="" />
                </p>
                <p>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="" />
                </p>
                <p>
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" name="startDate" id="" />
                </p>
                <p>
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" name="endDate" id="" />
                </p>
                <input type="submit" value={ action } />
            </form>
        </div>
    )
}

export default TripForm
