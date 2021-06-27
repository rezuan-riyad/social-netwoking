import React, { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/img.jpg'
import { timeFormatter } from '../utils/timeFormatter'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addOrRemoveLike } from '../actions/postAction'

export default function PostCard({ post }) {
  const dispatch = useDispatch()
  const { createdAt, totalLikes, comments, author, title, content } = post

  const [state, setState] = useState({
    time: "",
    totalLikes: 0,
    totalComments: 0,
    author: "",
    title: "",
    content: "",
    posturl: "",
    authorurl: "",
    logo: ""
  })

  const currentUser = JSON.parse(localStorage.getItem('user'))
  const alreadyLiked = post.likers.includes(currentUser)
  const [isLiked, setIsliked] = useState(alreadyLiked)
  
  useEffect(() => {
    setState({
      ...state,
      time: timeFormatter(createdAt),
      totalLikes: totalLikes,
      totalComments: comments.length,
      author: author.username,
      title: title,
      content: content.substring(0, 400),
      posturl: `/post/${post._id}`,
      authorurl: `/authors/${post.author.username}`,
      logo: author.username.substring(0, 1).toUpperCase()
    })
  }, [totalLikes, comments])

  const initialRender = useRef(true)
  useEffect(() => {
    if (!initialRender.current) {
      if (!isLiked) {
        dispatch(addOrRemoveLike(post._id, 'removeLike'))
      } else {
        dispatch(addOrRemoveLike(post._id, 'addLike'))
      }
    }
    initialRender.current = false
  }, [isLiked])

  return (
    <>
      <div className="card-panel">

        {/* Logo Section */}
        <div className="container" className="logo-section">
          <div className="logo">
            <div>
              <span>
                {state.logo}
              </span>
            </div>
            {/*<img src={profileImg} alt=""/> */}
          </div>
          <div className="user">
            <span className="black-text">
              <Link to={state.authorurl}>
                <strong>
                  {state.author}
                </strong>
              </Link>
            </span>
            <p className="grey-text time">{state.time}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="card-content">
          <h5>{state.title}</h5>
          <p>
            {state.content.length < 400 ? state.content : state.content + "..."}
            <Link to={state.posturl}> See Details</Link>
          </p>
        </div>
        <hr />

        {/* Button group */}
        <div className="card-action">
          <button className="btn-flat shadow"
            onClick={() => setIsliked(!isLiked)}>
            {state.totalLikes}
            <i className={`material-icons left ${isLiked ? "red-text" : ""}`} >
              {isLiked ? "favorite" : "favorite_border"}
            </i>
          </button>
          <Link to={state.posturl}>
            <button className="btn-flat" style={{ marginLeft: "20px" }} >
              {state.totalComments}
              <i className="material-icons left">comment</i>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
