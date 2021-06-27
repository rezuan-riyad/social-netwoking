import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthorCard({ author }) {

  return (
    <div className="author-card">
      <div className="card-panel" >
        <h5>{author.username}</h5>
        <p>I am a smart guy. I love to talk too much....</p>
        <p>34 followers | 3 contents</p>
        <div className="author-card-btns">
          <button
            className="btn-flat"
            style={{ border: "1px solid lightgray", width: "40%" }}>
            Follow
          </button>
          <Link to={`/authors/${author.username}`} style={{ width: "40%" }}>
            <button
              className="btn-flat"
              style={{ border: "1px solid lightgray", width: "100%" }}>
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
