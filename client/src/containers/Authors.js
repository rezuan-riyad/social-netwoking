import axios from 'axios'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { getAllAuthors } from '../actions/userAction' 
import { useDispatch, useSelector } from 'react-redux'
import AuthorCard from '../components/AuthorCard'

export default function Authors(){
  const dispatch = useDispatch()
  const authors = useSelector( state => state.userReducer.authors )
  const currentUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(getAllAuthors())
  }, [])
  
  return (
    <>
      <Layout>
        <div className="container center">
          {
            authors ?
            authors.map( author => {
              if(author.username !== currentUser ){
                return <AuthorCard key={author._id} author={author}/>
              }
            }) : null
          }
        </div>
      </Layout>
    </>
  )
}