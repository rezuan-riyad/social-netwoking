import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import CreatePostForm from '../components/CreatePostForm'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../actions/postsAction'
import loadingGif from '../assets/loading-buffering.gif'

export default function Home() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.posts)
  const isLoading = useSelector(state => state.posts.isLoading)
  console.log(posts)
  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  const renderPosts = posts.map(post => {
    return <PostCard post={post} key={post._id} />
  })

  const imageDiv = {
    width: "50px", height: "50px", margin: "0 auto"
  }
  const img = {
    width: "100%", height: "100%"
  }
  return (
    <Layout>
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <CreatePostForm />
          {
            isLoading ?
              <div style={imageDiv}>
                <img src={loadingGif} style={img} />
              </div> : null
          }
          {
            renderPosts.length === 0 && !isLoading ?
              <h6>
                Oops! Seems like no one posted yet. Write something, be first one.
              </h6> : renderPosts
          }
        </div>
      </div>
    </Layout>
  )
}