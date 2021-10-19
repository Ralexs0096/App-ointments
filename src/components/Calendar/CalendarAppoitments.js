import React from 'react'

const CalendarAppoitments = ({event}) => {

    const {title, user} = event
    return (
        <div>
            <span>{title} </span>
            <strong>- {user.name}</strong>
        </div>
    )
}

export default CalendarAppoitments
