import React from 'react'
import RouterApp from './router/Router'
import {Provider} from 'react-redux'
import { store } from './store/store'

const App = () => {
    return (
        <Provider store={store}>
            <RouterApp />
        </Provider>
    )
}

export default App
