import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events'


const FABDROP = () => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(eventStartDelete())
    }

    return (
        <button 
            className="btn btn-danger fab-drop"
            onClick={handleDelete}
        >
            <span>Borrar </span>
            <i className="fas fa-trash"></i>
        </button>
    )
}

export default FABDROP
