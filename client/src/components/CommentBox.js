import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function CommentBox(props) {
  const { comment, auhtor, handleEditComment, handleDeleteComment } = props
  const localUser = useSelector(state => state.singlePost.localUser)
  const { commentedBy, content, createdAt, _id } = comment

  const isEditable = localUser.username === commentedBy.username
  const isDeletable = isEditable || localUser.isAuthor

  const [showEditBar, setShowEditBar] = useState(false)
  const [commentText, setCommentText] = useState(content)

  const btnStyle = {
    border: "1px solid lightgray",
    fontSize: "12px",
    color: "gray",
    marginRight: "20px"
  }

  const EditButton = () => {
    return (
      <>
        {!showEditBar ?
          <button className="btn-flat" style={btnStyle}
            onClick={() => {
              setShowEditBar(!showEditBar);
              setCommentText(content);
            }} >
            <i className="material-icons">edit</i>
          </button>
          :
          <div>
            <button className="btn-flat" style={btnStyle}
              onClick={() => setShowEditBar(!showEditBar)}>
              <i className="material-icons">close</i>
            </button>

            {/* Done button triggers edit req */}
            <button className="btn-flat" style={btnStyle}
              onClick={() => {
                if(commentText !== content){
                  handleEditComment(_id, commentText)
                }
                setShowEditBar(false)
              }}>
              <i className="material-icons">done</i>
            </button>
          </div>
        }
      </>
    )
  }

  // delete button triggers server req
  const DeleteButton = () => {
    return (
      <button className="btn-flat" style={btnStyle}
        onClick={() => handleDeleteComment(_id)}>
        <i className="material-icons">delete</i>
      </button>
    )
  }

  return (
    <>
      <p style={{ marginBottom: "0" }}>
        <strong>{commentedBy.username}</strong>
      </p>
      {
        showEditBar ?
          <form>
            <textarea
              className="materialize-textarea"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)} />
          </form> :
          <p style={{ marginTop: "0" }}>
            {content}
          </p>
      }
      <div>
        {isEditable ? <EditButton /> : null}
        {isDeletable && !showEditBar ? <DeleteButton /> : null}
      </div>
      <hr />
    </>
  )
}
