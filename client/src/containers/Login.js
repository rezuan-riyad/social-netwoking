import React, { useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

/**
 * If token in localStorage exists, redirect to home directory
 * if not, get token from server and save it to localStorage
 */

// initial state declared
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedin: false,
  stateChanging: false,
}

// reducer function defined
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATE/CHANGE':
      return {
        ...state,
        message: "",
        isLoggedin: false,
        stateChanging: true,
        [action.fieldName]: action.payload
      }
    case 'LOGIN/REQ':
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
        isLoggedin: true,
        error: ""
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

// Default export Login component
export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      dispatch({ type: 'REQ/SUCCESS' })
    }
  }, [])

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

    navigate("/")

    if (!state.username || !state.password) {
      return dispatch({
        type: "SET/ERROR",
        payload: "Username and Password must be filled"
      })
    }

    dispatch({ type: 'LOGIN/REQ' })

    const data = {
      username: state.username,
      password: state.password
    }
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/user/login`,
        data, { "Content-type": "application/json" }
      )
      const resData = await res.data
      console.log(resData)

      if (resData && res.status === 200) {
        localStorage.setItem('token', JSON.stringify(resData.token))
        localStorage.setItem('user', JSON.stringify(resData.username))

        const date = new Date().getDate()
        localStorage.setItem('date', JSON.stringify(date))
        dispatch({ type: 'REQ/SUCCESS' })
      }
    } catch (error) {
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
  if (state.isLoggedin) {
    // return <Redirect to="/" />
    console.log("Authenticated..........")
  }

  return (
    <>
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col s12 m6 offset-m3">
          <form className="form-container" style={{ maxWidth: "350px", margin: "0 auto" }}>

            {/* Form heading */}
            <h2 className="center" style={{ marginBottom: "1.5rem" }}>
              Log In
            </h2>

            {
              /* Error Display */
              state.error ?
                <p className="center red white-text"
                  style={{ padding: ".25rem" }}>
                  {state.error}
                </p> : null
            }
            {/* Username input */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="username">Username</label>
              <Input id="username" type="text" placeholder='username'
                value={state.username} onChange={handleInputChange} />
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" placeholder='password'
                value={state.password} onChange={handleInputChange} />
              {/* Submit button */}
              <Button
                type="submit" disabled={state.isLoading} onClick={handleFormSubmit}>
                {state.isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>

            <p>
              Don't have any account? <Link to="/signup">Register</Link> now.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

const inputStyle = {
  padding: "4px 8px",
  margin: "4px 0 8px 0",
  outline: "none",
  border: "1px solid lightgray",
  borderRadius: "4px"
}
export const Input = (props) => {
  return (
    <input {...props}
      style={inputStyle} />
  )
}
export const Button = (props) => {
  return (
    <button {...props} style={{...inputStyle, cursor: "pointer" }} />
  )
}