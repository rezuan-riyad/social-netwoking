import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { Redirect, useParams } from 'react-router-dom'
import { getAuthorData } from '../actions/authorsAction'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../components/PostCard'

export default function AuthorDetail() {
  const { username } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  const state = useSelector(state => state.users)

  useEffect(() => {
    username !== user ?
      dispatch(getAuthorData(username)) : null
  }, [])

  if (username === user) {
    return <Redirect to={`/${username}`} />
  }

  return (
    <Layout>
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <h3>{state.user.username + "'s Profile"}</h3>
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
  )
}
