import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import CreatePostForm from '../components/CreatePostForm'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../actions/postAction'

export default function Home() {
  const dispatch = useDispatch()
  const posts = useSelector( state => state.postReducer.posts )
  
  useEffect(() => {
    dispatch(getAllPosts())
  },[])
  
  const renderPosts = posts.map( post => {
    return <PostCard post={post} key={post._id}/>
  })
  return (
    <Layout>
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <CreatePostForm />
          { renderPosts }
        </div>
      </div>
    </Layout>
  )
}