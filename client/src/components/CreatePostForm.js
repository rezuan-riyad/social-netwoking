import React, { useEffect, useState } from 'react'
import { Modal } from 'materialize-css'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../actions/postAction'

export default function CreatePostForm() {
  const dispatch = useDispatch()
  const isSubmitting = useSelector(state => state.postReducer.isSubmitting)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    var elem = document.querySelector('.modal')
    var options = {
      dismissible: false,
      inDuration: 300
    } 
    var instance = Modal.init(elem, options)
    return () => {
      instance.destroy()
    }
  }, [])

  const modalClose = (e) => {
    e.preventDefault()
    var elem = document.querySelector('.modal')
    var instance = Modal.getInstance(elem)
    instance.close()
  }

  const handleSubmission = (event) => {
    event.preventDefault()
    dispatch(createPost({ title, content }))
    setTitle("")
    setContent("")
    modalClose(event)
  }

  return (
    <React.Fragment>
      <div className="container" style={{ width: "100%" }}>

        <form id="createPostForm">
          <input className="modal-trigger" href="#modal1" placeholder="Create Post" />

          {/* Modal for creating post */}
          <div id="modal1" className="modal">
            <div className="modal-content">
              <h6>Social Networking | Create Content</h6>

              {/* title and content input */}
              <input 
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
              <textarea
                className="materialize-textarea"
                placeholder="Write Content"
                value={content}
                onChange={(e) => setContent(e.target.value)} />

              {/* Confirm and Cancel Button */}
              <button className="waves-effect btn-flat" onClick={modalClose}>
                Cancel
              </button>
              <button className="btn" disabled={isSubmitting}
                onClick={handleSubmission}>
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}