import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthorData } from '../actions/userAction'
import { logout } from '../actions/authActions'
import { Redirect, useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import NotFound from '../components/NotFound'

export default function Profile() {
  const dispatch = useDispatch()
  const { username } = useParams()

  const state = useSelector(state => state.userReducer)
  const localUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(getAuthorData(username))
  }, [username])
  
  const handleLogout = () => {
    dispatch(logout())
  }

  if(state.notFound){
    return <NotFound />
  }

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col s12 m8 l6 offset-m2 offset-l3">
            <h3>{username + "'s Profile"}</h3>
            {
              state.user.username === localUser ?
              <button className="btn btn-wave" onClick={handleLogout}>
                Log Out
              </button> : null
            }
            <hr />
            {
              state.posts.length !== 0 ?
                state.posts.map(post => {
                  return <PostCard key={post._id} post={post} />
                }) : <h6>Nothing to show.</h6>
            }
          </div>
        </div>
      </Layout>
    </>
  )
}