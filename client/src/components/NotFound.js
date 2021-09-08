import React from 'react'
import { useHistory } from "react-router-dom"
import Layout from "./Layout"

export default function NotFound(){
    const history = useHistory()
    const goBack = () => {
      history.goBack()
    }
    return (
      <Layout>
        <div className="container center">
          <button className="btn-flat right" onClick={goBack}>
            Go Back
          </button>
          <h4>This page doesn't exist...</h4>
        </div>
      </Layout>
    )
  }