import {
  GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED,
  ADD_OR_REMOVE_LIKE, GET_ALL_AUTHORS, GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILED
} from '../constants/constants'

const userState = {
  posts: [],
  user: {
    username: "",
    date: ""
  },
  isLoading: false,
  authors: []
}

export default function userReducer(state = userState, action) {
  switch (action.type) {
    /** ******************** */
    case GET_USER_DATA:
      return {
        ...state,
        isLoading: true
      }
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.posts,
        user: action.payload.user
      }
    /** ******************** */
    case ADD_OR_REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload._id) {
            post.likers = action.payload.data.likers
            post.totalLikes = action.payload.data.totalLikes
          }
          return post
        })
      }
    /** ******************* */
    case GET_ALL_AUTHORS:
      return {
        ...state,
        isLoading: true
      }
    case GET_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authors: action.payload
      }
    case GET_ALL_AUTHORS_FAILED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}