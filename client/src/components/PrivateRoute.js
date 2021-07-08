import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector( state => state.authReducer )
  const token = localStorage.getItem('accessToken')

  return <Route {...rest} component={(props) => {
    if(token && auth.isAuthenticated){
      return <Component {...props}/>
    }else {
      return <Redirect to="/login"/>
    }
  }} />
}
export default PrivateRoute