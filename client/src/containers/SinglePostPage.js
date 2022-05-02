import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CommentBox from '../components/CommentBox'
import SinglePostButtons from '../components/SinglePostButtons'
import EditForm from '../components/EditForm'
import NotFound from '../components/NotFound'
import Fallback from '../components/Fallback'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { timeFormatter } from '../utils/timeFormatter'
import { POST_INITIAL_STATE } from '../constants/constants'
import { getSinglePostById, addComment, updatePost, 
  deletePost, updateComment, deleteComment } from '../actions/postsAction'


export default function SinglePostPage() {
  const dispatch = useDispatch()
  const post = useSelector(state => state.singlePost.post)
  const commentAdding = useSelector(state => state.singlePost.commentAdding)
  const isLiked = useSelector(state => state.singlePost.isLiked)
  const notFound = useSelector(state => state.singlePost.notFound)

  const { id } = useParams()
  const history = useHistory()
  const [comment, setComment] = useState("")
  const [showEditBar, setShowEditBar] = useState(false)

  useEffect(() => {
    //(component did mount)
    dispatch(getSinglePostById(id))
    //clean up (component will unmount)
    return () => {
      dispatch({ type: POST_INITIAL_STATE })
    }
  }, [])

  const goBack = () => {
    history.goBack()
  }

  const handlePostDelete = () => {
    let confirmed = confirm('Are you sure, you want to delete?')
    if (confirmed) {
      dispatch(deletePost(id))
    }
  }

  const handlePostEdit = (title, content) => {
    dispatch(updatePost(id, title, content))
    setShowEditBar(false)
  }

  const submitComment = () => {
    if (comment) {
      dispatch(addComment(id, comment))
      setComment("")
    }
  }

  const handleEditComment = (commentId, content) => {
    dispatch(updateComment(id, commentId, content))
  }

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(id, commentId))
  }

  let renderComments
  if (post.comments.length !== 0) {
    renderComments = post.comments.map(comment => {
      return <CommentBox
        key={comment._id}
        comment={comment}
        author={post.author.username}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment} />
    })
  }

  if (notFound) {
    return <NotFound />
  }

  if(!post.author.username){
    return <Fallback />
  }
  return (
    <>
      <Layout>
        <div className="row">
          <div className="col s12 l8 offset-l2">
            <div className="container">
              <button className="btn-flat right" onClick={goBack}>
                Go Back
              </button>

              {/* Logo Section */}
              <div className="container logo-section">
                <div className="logo">
                  <div><span>{post.author.username.substring(0, 1).toUpperCase()}</span></div>
                  {/*<img src={profileImg} alt=""/> */}
                </div>
                <div className="user">
                  <span className="black-text">
                    <strong>{post.author.username}</strong>
                  </span>
                  <p className="grey-text time">
                    {timeFormatter(post.createdAt)}
                  </p>
                </div>
              </div>

              {/* Post Section */}
              <div>
                {
                  showEditBar ?
                    <EditForm
                      showEditBar={showEditBar}
                      setShowEditBar={setShowEditBar}
                      handlePostEdit={handlePostEdit} /> :
                    <>
                      <h5>{post.title}</h5>
                      <p className="grey-text" style={{ margin: 0 }}>
                        Content ID: {id}
                      </p>
                      <p>{post.content}</p>
                    </>
                }
              </div>
              <hr />

              {/* Button Section */}

              <SinglePostButtons
                post={post}
                isLiked={isLiked}
                showEditBar={showEditBar}
                setShowEditBar={setShowEditBar}
                handlePostDelete={handlePostDelete} />
              <hr />

              {/* Comment Section */}
              <div id="postComment">
                <textarea
                  className="materialize-textarea"
                  placeholder="Write your comment here."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)} />
                <button
                  className="btn waves right"
                  onClick={submitComment}
                  disabled={commentAdding}>
                  Confirm
                </button>
                <div style={{ marginTop: "2rem" }}>
                  <h5><strong>Comments</strong></h5>
                  {renderComments ? renderComments : <p>No comments yet</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
