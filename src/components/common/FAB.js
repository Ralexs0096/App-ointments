import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

const FAB = () => {

    const dispatch = useDispatch()

    const handleButtonOpen = () => {
        dispatch(uiOpenModal())
    }

    return (
        <button
            className="btn btn-success fab"
            onClick={handleButtonOpen}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}

export default FAB
