import {
  GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
  GET_ALL_AUTHORS, GET_ALL_AUTHORS_FAILED, GET_ALL_AUTHORS_SUCCESS
} from '../constants/constants'
import axiosInstance from '../utils/axios'

export function getAllAuthors() {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_AUTHORS })

    axiosInstance.get('/users')
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: GET_ALL_AUTHORS_SUCCESS,
          payload: data.users
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ALL_AUTHORS_FAILED
        })
      })
  }
}

export function getAuthorData(username) {
  return async (dispatch) => {
    dispatch({ type: GET_USER_DATA })

    axiosInstance.get(`/user/${username}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_USER_DATA_FAILED
        })
      })
  }
}