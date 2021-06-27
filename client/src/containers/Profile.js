import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthorData } from '../actions/userAction'
import { Redirect, useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'

export default function Profile() {
  const dispatch = useDispatch()
  const { username } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))

  const state = useSelector(state => state.userReducer)

  useEffect(() => {
    dispatch(getAuthorData(username))
  }, [username])

  // if (user !== username) {
  //   return <Redirect to="/authors" />
  // }
  return (
    <>
      <Layout>
        <div className="row">
          <div className="col s12 m8 l6 offset-m2 offset-l3">
            <h3>{username + "'s Profile"}</h3>
            <hr />
            {
              state.posts.length !== 0 ?
                state.posts.map(post => {
                  return <PostCard key={post._id} post={post} />
                }) : null
            }
          </div>
        </div>
      </Layout>
    </>
  )
}