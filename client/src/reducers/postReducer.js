import {
  GET_ALL_POSTS, GET_ALL_POSTS_SUCCESS, GET_ALL_POSTS_FAILED,
  SAVE_NEW_POST, SAVE_NEW_POST_SUCCESS, SAVE_NEW_POST_FAILED, ADD_OR_REMOVE_LIKE,
  AFTER_SAVING_POST
} from '../constants/constants'

const initialState = {
  posts: [],
  isLoading: false,
  isSubmitting: false,
  isSubmitted: false
}
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        isLoading: true
      }
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload
      }
    case GET_ALL_POSTS_FAILED:
      return {
        ...state,
        isLoading: false
      }

    case SAVE_NEW_POST:
      return {
        ...state,
        isSubmitting: true
      }

    case SAVE_NEW_POST_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        posts: [action.payload, ...state.posts]
      }

    case SAVE_NEW_POST_FAILED:
      return {
        ...state,
        isSubmitting: false
      }
    case AFTER_SAVING_POST:
      return {
        ...state,
        isSubmitted: false
      }

    case ADD_OR_REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map( post => {
          if(post._id === action.payload._id){
            post.likers = action.payload.data.likers
            post.totalLikes = action.payload.data.totalLikes
          }
          return post
        })
      }

    default:
      return state
  }
}