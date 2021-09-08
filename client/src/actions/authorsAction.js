import { GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
GET_ALL_AUTHORS, GET_ALL_AUTHORS_FAILED, GET_ALL_AUTHORS_SUCCESS } from '../constants/constants'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getAllAuthors() {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_AUTHORS })
    let token = JSON.parse(localStorage.getItem('token'))
    axiosInstance.get('/users', {
      headers: { 'authorization': `Bearer ${token}` }
    })
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

    let token = JSON.parse(localStorage.getItem('token'))
    axiosInstance.get(`/user/${username}`, {
      headers: { 'authorization': `Bearer ${token}` }
    })
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function logout(){
  return async(dispatch) => {
    // revoke web token
  }
}