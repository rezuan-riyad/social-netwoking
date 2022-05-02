import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/app.css'
// import Home from './containers/Home'
// import Profile from './containers/Profile'
// import Authors from './containers/Authors'
import Login from './containers/Login'
import Signup from './containers/Signup'
// import SinglePostPage from './containers/SinglePostPage'
// import AuthorDetail from './containers/AuthorDetail'
// import PrivateRoute from './components/PrivateRoute'

import store from './store'
import { Provider } from 'react-redux'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )

  // return (
  //   <Router>
  //     <Switch>
  //       <Provider store={store}>
  //         <PrivateRoute exact path="/" component={Home} />
  //         <PrivateRoute exact path="/authors" component={Authors} />
  //         <PrivateRoute exact path="/authors/:username" component={Profile} />
  //         <PrivateRoute exact path="/post/:id" component={SinglePostPage} />
  //         {/* <PrivateRoute exact path="/authors/:username" component={AuthorDetail}/> */}
  //       </Provider>
  //     </Switch>
  //     <Route exact path="/login">
  //       <Login />
  //     </Route>
  //     <Route exact path="/signup">
  //       <Signup />
  //     </Route>
  //   </Router>
  // )
}

export default App