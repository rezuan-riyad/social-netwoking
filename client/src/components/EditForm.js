import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function EditForm({ showEditBar, setShowEditBar, handlePostEdit }) {
  const post = useSelector(state => state.singlePost.post)
  const [localState, setLocalState] = useState({ title: post.title, content: post.content })

  const handleChange = (e) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value
    })
  }

  const handelEdit = () => {
    console.log('Edition')
  }

  const backdropStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,.7)",
    zIndex: "10"
  }
  const formStyle = {
    minWidth: "300px",
    maxWidth: "700px",
    heifht: "auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    margin: "auto",
    marginTop: "50px",
    zIndex: "100000"
  }
  const btnStyle = { border: "1px solid lightgray", marginLeft: "20px" }
  return (
    <div style={backdropStyle}>

      <form id="editForm" style={formStyle} className="z-depth-1">
        <h5 className="center">Edit Content</h5>
        {/* Edit Title Textarea*/}
        <span>Title:</span>
        <textarea className="materialize-textarea"
          value={localState.title} name="title" onChange={handleChange} />
        
        {/* Edit Content Textarea */}
        <span>Content:</span>
        <textarea className="materialize-textarea"
          value={localState.content} name="content" onChange={handleChange} />
        
        {/* Button Group */}
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
          <button className="btn-flat" style={btnStyle}
            onClick={(e) => {
              e.preventDefault()
              handlePostEdit(localState.title, localState.content)
              } }>
            Confirm</button>
          <button
            className="btn-flat" style={btnStyle}
            onClick={() => setShowEditBar(!showEditBar)}>Cancel</button>
        </div>
      </form>
    </div>

  )
}