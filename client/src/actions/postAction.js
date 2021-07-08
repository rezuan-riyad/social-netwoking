import * as C from '../constants/constants'
import axiosInstance from '../utils/axios'

export function createPost(post) {
  return async (dispatch) => {
    dispatch({ type: C.SAVE_NEW_POST })

    // url, data, headers
    axiosInstance.post('/post/create', { ...post })
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.SAVE_NEW_POST_SUCCESS,
          payload: data.post
        })
      })
      .catch(error => {
        //handle error
        dispatch({
          type: C.SAVE_NEW_POST_FAILED
        })
      })

    dispatch({ type: C.AFTER_SAVING_POST })
  }
}

export function getAllPosts() {
  return async (dispatch) => {
    dispatch({ type: C.GET_ALL_POSTS })

    axiosInstance.get('/post')
      .then(res => {
        dispatch({
          type: C.GET_ALL_POSTS_SUCCESS,
          payload: res.data.posts
        })
      })
      .catch(error => {
        // handle get all posts error
      })
  }
}


export function getSinglePostById(postId) {
  return async (dispatch) => {

    let localUser = JSON.parse(localStorage.getItem('user'))
    dispatch({
      type: C.GET_SINGLE_POST,
      payload: localUser
    })

    axiosInstance.get(`/post/${postId}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.GET_SINGLE_POST_SUCCESS,
          payload: data.post
        })
      })
      .catch(error => {
        dispatch({
          type: C.GET_SINGLE_POST_FAILED
        })
      })
  }
}

export function addOrRemoveLike(postId, action) {
  return async (dispatch) => {

    axiosInstance.patch(`/post/${postId}`, { action })
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.ADD_OR_REMOVE_LIKE,
          payload: {
            _id: postId,
            data: data
          }
        })
        dispatch({
          type: C.SINGLE_POST_LIKE_HANDLE,
          payload: {
            data: data
          }
        })
      })
      .catch(err => {
        // handle error
        console.log(err)
      })
  }
}


export function updatePost(postId, title, content) {
  return async (dispatch) => {
    dispatch({
      type: C.SINGLE_POST_UPDATE
    })

    axiosInstance.put(`/post/${postId}`, { title, content })
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.SINGLE_POST_UPDATE_SUCCESS,
          payload: data.post
        })
      })
      .catch(error => {
        dispatch({
          type: C.SINGLE_POST_UPDATE_FAILED
        })
      })
  }
}

export function deletePost(postId) {
  return async (dispatch) => {
    dispatch({ type: C.SINGLE_POST_DELETE })

    axiosInstance.delete(`/post/${postId}`)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        dispatch({
          type: C.SINGLE_POST_DELETE_SUCCESS
        })
      })
      .catch(error => {
        dispatch({
          type: C.SINGLE_POST_DELETE_FAILED
        })
      })
  }
}


export function addComment(postId, comment) {
  return async (dispatch) => {
    dispatch({ type: C.ADD_COMMENT_REQ })

    axiosInstance.put(`/post/${postId}/comment`, { content: comment })
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.ADD_COMMENT_SUCCESS,
          payload: data.comments
        })
      })
      .catch(err => {
        // handle error
        console.log(err)
        dispatch({
          type: C.ADD_COMMENT_FAILED
        })
      })
  }
}

export function updateComment(postId, commentId, content) {
  return async (dispatch) => {
    dispatch({ type: C.UPDATE_COMMENT })

    axiosInstance.put(`/post/${postId}/comment/${commentId}`,
      { content: content }
    )
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.UPDATE_COMMENT_SUCCESS,
          payload: {
            commentId, content
          }
        })
      })
      .catch(error => {
        dispatch({
          type: C.UPDATE_COMMENT_FAILED
        })
      })
  }
}

export function deleteComment(postId, commentId) {
  return (dispatch) => {
    dispatch({ type: C.DELETE_COMMENT })

    axiosInstance.delete(`/post/${postId}/comment/${commentId}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: C.DELETE_COMMENT_SUCCESS,
          payload: commentId
        })
      })
      .catch(error => {
        dispatch({
          type: C.DELETE_COMMENT_FAILED
        })
      })
  }
}