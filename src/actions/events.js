import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareAppoitments } from "../helpers/prepareAppoitments";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {

    try {

      const {uid, name} = getState().auth;

      const resp = await fetchWithToken('appoitment', event, 'POST')
      const body = await resp.json()

      if(body.ok) {
        event.id = body.appoitmentCreated.id
        event.user = {
          _id: uid,
          name: name
        }
        dispatch(eventAddNew(event))
      }
    } catch (error) {
      console.log(error);
    }

  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearEventActive = () => ({
  type: types.eventClearEventActive,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      
      const resp = await fetchWithToken(`appoitment/${event.id}`, event, 'PUT')
      const body = await resp.json()
      
      if(body.ok) {
        dispatch(eventUpdated(event))
      }else {
         Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
        })
      }

    } catch (error) {
      console.log(error);
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = (event) => ({
  type: types.eventDeleted,
});


export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('appoitment')
      const body = await resp.json()

      const appoitments = prepareAppoitments(body.appoitmens)
      dispatch(eventLoaded(appoitments))

    } catch (error) {
      console.log(error);
    }
  }
}

const eventLoaded = (event) => ({
  type: types.eventLoaded,
  payload: event
})

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {

      const {id} = getState().calendar.activeEvent

      const resp = await fetchWithToken(`appoitment/${id}`, {}, 'DELETE')
      const body = await resp.json()
      
      if(body.ok) {
        dispatch(eventDeleted())
      }else {
         Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
        })
      }

    } catch (error) {
      console.log(error);
    }
  }
}