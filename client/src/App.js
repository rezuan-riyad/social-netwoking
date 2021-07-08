import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/app.css'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Authors from './containers/Authors'
import Login from './containers/Login'
import Signup from './containers/Signup'
import SinglePostPage from './containers/SinglePostPage'
import AuthorDetail from './containers/AuthorDetail'
import PrivateRoute from './components/PrivateRoute'

import { LOGIN_REQ_SUCCESS, LOGIN_REQ_FAILED } from './constants/constants'

import { useDispatch } from 'react-redux'
import axiosInstance from './utils/axios'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // token verification
    axiosInstance.post('/auth/token/verification')
      .then(res => {
        if(res.status === 200){
          dispatch({ type: LOGIN_REQ_SUCCESS })
        }
      })
      .catch(error => {
        dispatch({ type: LOGIN_REQ_FAILED })
      })
  }, [])
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/authors" component={Authors} />
        <PrivateRoute exact path="/authors/:username" component={Profile} />
        <PrivateRoute exact path="/post/:id" component={SinglePostPage} />
        {/* <PrivateRoute exact path="/authors/:username" component={AuthorDetail}/> */}
      </Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Router>
  )
}

export default App