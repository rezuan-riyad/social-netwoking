import React from 'react'
import Layout from './Layout'

export default function Fallback() {
  const navStyle = {
    width: "100%",
    height: "10vh",
    backgroundColor: "lightgray"
  }
  const logoSection = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
  const logo = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "lightgray",
    marginRight: "20px"
  }

  const nameStyle = {
    width: "100px",
    height: "30px",
    backgroundColor: "lightgray",
  }
  const postDiv = {
    width: "100%",
    height: "200px",
    backgroundColor: "lightgray",
    marginTop: "20px"
  }

  const commentDiv = {
    width: "100%",
    height: "50px",
    backgroundColor: "lightgray",
    marginTop: "10px"
  }

  return (
    <Layout>
      <div className="row">
        <div className="col s12 l8 offset-l2">
          <div className="container">
            {/* Logo Section */}
            <div style={logoSection}>
              <div style={logo}></div>
              <div style={nameStyle}></div>
            </div>
            {/* Post Section */}
            <div style={postDiv}></div>

            {/* Comment Section */}
            <div style={{ marginTop: "20px" }}>
              <div style={nameStyle}></div>
              <div style={commentDiv}></div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div style={nameStyle}></div>
              <div style={commentDiv}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}