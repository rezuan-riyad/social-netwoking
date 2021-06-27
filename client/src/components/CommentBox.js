import React from 'react'
import { useSelector } from 'react-redux'

export default function CommentBox({ comment, author }) {

  const localUser = useSelector(state => state.singlePostReducer.localUser)
  const { commentedBy, content, createdAt, _id } = comment
  
  const isEditable = localUser.username === commentedBy.username  
  const isDeletable = isEditable || localUser.isAuthor

  const btnStyle = {
    border: "1px solid lightgray",
    fontSize: "12px",
    color: "gray",
    marginRight: "20px"
  }
  
  const EditButton = () => {
    return(
      <button className="btn-flat" style={btnStyle}>
        Edit
      </button>
    )
  }

  const DeleteButton = () => {
    return (
      <button className="btn-flat" style={btnStyle}>
        Delete
      </button>
    )
  }

  return (
    <>
      <p style={{ marginBottom: "0"}}>
        <strong>{commentedBy.username}</strong>
      </p>
      <p style={{ marginTop: "0" }}>
        {content}
      </p>
      <div>
        { isEditable ? <EditButton /> : null }
        { isDeletable ? <DeleteButton /> : null }
      </div>
      <hr />
    </>
  )
}
