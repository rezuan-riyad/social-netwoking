import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrRemoveLike } from '../actions/postAction'

/**
 * Handle Add Like to Content, Edit and Delete Content
 * Edit and Delete are only allowed for author
 */
export default function SinglePostButtons(props) {
  const { showEditBar, setShowEditBar, post, isLiked, handlePostDelete } = props
  const { comments, likers, totalLikes, author } = post
  const isAuthor = useSelector(state => state.singlePostReducer.localUser.isAuthor)
  console.log(isAuthor)
  const dispatch = useDispatch()

  const handleLike = () => {
    if (isLiked) {
      dispatch(addOrRemoveLike(post._id, 'removeLike'))
    } else {
      dispatch(addOrRemoveLike(post._id, 'addLike'))
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div>
        {/* Favorite Button */}
        <button
          className="btn-flat shadow"
          title="Favorite"
          onClick={handleLike}>
          {totalLikes}
          <i className="material-icons left">
            {isLiked ? "favorite" : "favorite_border"}
          </i>
        </button>

        {/* Comment Icon */}
        <button className="btn-flat" title="Add Comment"
          style={{ marginLeft: "10px" }} >
          {comments.length}
          <i className="material-icons left">comment</i>
        </button>
      </div>
      <div>
        {
          isAuthor ? (
            <>
              {/* Edit Button */}
              <button className="btn-flat" title="Edit"
                onClick={() => setShowEditBar(!showEditBar)}>
                <i className="material-icons">edit</i>
              </button>

              {/* Delete Button */}
              <button className="btn-flat" title="Delete"
                onClick={handlePostDelete}
                style={{ marginLeft: "20px" }} >
                <i className="material-icons">delete</i>
              </button>
            </>
          ) : null
        }
      </div>
    </div>
  )
}