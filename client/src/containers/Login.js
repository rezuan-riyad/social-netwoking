import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../utils/axios'
import { Link, Redirect } from 'react-router-dom'
import { SET_ERROR } from '../constants/constants'
import { login } from '../actions/authActions'

/**
 * If token in localStorage exists, redirect to home directory
 * if not, get token from server and save it to localStorage
 */


// Default export Login component
export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const state = useSelector( state => state.authReducer )

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  if(state.isAuthenticated){
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col s12 m6 offset-m3">
          <form className="form-container">

            {/* Form heading */}
            <h5 className="center" style={{ marginBottom: "1.5rem" }}>
              Social Networking | Log In
            </h5>

            {
              /* Error Display */
              state.error ?
                <p className="center red white-text"
                  style={{ padding: ".25rem" }}>
                  {state.error}
                </p> : null
            }

            {/* Username input */}
            <div className="input-field">
              <input 
                id="username" 
                type="text" 
                className="validate"
                value={username} 
                onChange={ (e) => setUsername(e.target.value) } />
              <label htmlFor="username">Username</label>
            </div>

            {/* Password input */}
            <div className="input-field">
              <input 
                id="password" 
                type="password" 
                className="validate"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>

            {/* Submit button */}
            <button className="btn waves-effect waves-light"
              type="submit" disabled={state.isLoading} onClick={handleFormSubmit}>
              {state.isLoading ? "Submitting..." : "Submit"}
            </button>
            <p>
              Don't have any account? <Link to="/signup">Register</Link> now.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}