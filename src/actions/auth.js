import Swal from "sweetalert2"
import { fetchLessToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchLessToken('auth', {email, password}, 'POST')
        const body = await resp.json()

        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire({
                icon: "error",
                title: "Fallo de Autenticación",
                text: body.msg,
              });
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchLessToken('auth/new', {email, password, name}, 'POST')
        const body = await resp.json()

        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: body.msg,
              });
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(eventLogout())
        dispatch(logout())
    }
}

const logout = () => ({type: types.authLogout})

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchWithToken('auth/renew')
        const body = await resp.json()

        if(body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
              dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({type: types.auhtCheckingFinish})

export const eventLogout = () => ({ type: types.eventLogout})