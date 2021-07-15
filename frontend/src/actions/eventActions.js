import axios from 'axios'
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
} from '../constants/eventConstants'

export const listEvents = () => async dispatch => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST })

    const { data } = await axios.get('/api/events')

    dispatch({ type: EVENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listEventDetails = id => async dispatch => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/events/${id}`)

    dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteEvent = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/events/${id}`, config)

    dispatch({ type: EVENT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
