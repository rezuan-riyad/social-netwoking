import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from "./Login";
// import Button from "./Login/Button"
import axios from 'axios'

// initial state declared
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  isCreated: false,
  error: "",
  message: ""
}

// reducer function defined
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATE/CHANGE':
      return {
        ...state,
        message: "",
        [action.fieldName]: action.payload
      }
    case 'SIGNUP/REQ':
      return {
        ...state,
        error: "",
        isLoading: true
      }
    case 'REQ/SUCCESS':
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        isCreated: true,
        error: "",
        message: action.payload
      }
    case 'REQ/FAILED':
      return {
        ...state,
        isLoading: false,
        message: "",
        error: action.payload
      }
    case 'SET/ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState)


  // handleing input value change
  const handleInputChange = (e) => {
    dispatch({
      type: "STATE/CHANGE",
      fieldName: [e.target.id],
      payload: e.target.value
    })
  }

  // handling form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log(state)

    if (!state.username || !state.password) {
      return dispatch({
        type: "SET/ERROR",
        payload: "All fields are required."
      })
    }

    dispatch({ type: 'SIGNUP/REQ' })

    const data = {
      username: state.username,
      password: state.password
    }
    try {
      const res = await axios.post(
        `localhost:5000/api/user/create`,
        data, { "Content-type": "application/json" }
      )
      if (res.status === 201 && res.statusText === 'Created') {
        dispatch({ type: 'REQ/SUCCESS' })
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        dispatch({
          type: 'REQ/FAILED',
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: 'REQ/FAILED',
          payload: 'Something went wrong.'
        })
      }
    }
  }
  if (state.isCreated) {
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="container form-container" style={{ marginTop: "2rem" }}>
            <h5 className="center" style={{ marginBottom: "1.5rem" }}>
              Social Networking | Sign Up
            </h5>
            <p className="center">Account created successfully.
              <Link to="/login"> Login</Link> now.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col s12 m6 offset-m3">
          <form className="form-container" onSubmit={handleFormSubmit} style={{ maxWidth: "350px", margin: "0 auto" }}>
            <h2 className="center" style={{ marginBottom: "1.5rem" }}>
              Sign Up
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* setting username */}
              <label htmlFor="username">Set Username</label>
              <Input id="username" type="text"
                value={state.username} onChange={handleInputChange} />

              {/* setting password */}
              <label htmlFor="password">Set Password</label>
              <Input id="password" type="password"
                value={state.password} onChange={handleInputChange} />

              {/* button */}
              <Button
                type="submit"
                style={{ width: "100%" }}>
                confirm
              </Button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link> now.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}