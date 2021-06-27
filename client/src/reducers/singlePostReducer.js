import * as C from '../constants/constants'

const postState = {
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
  commentAdding: false,
  notFound: false,
  isLiked: null,
  post: {
    author: { username: "", id: "" },
    title: "",
    content: "",
    likers: [],
    comments: [],
    createdAt: "",
    totalLikes: 0,
    _id: ""
  },
  localUser: {
    username: "",
    isAuthor: null
  }
}
export default function singlePostReducer(state = postState, action) {
  switch (action.type) {

    case C.GET_SINGLE_POST:
      return {
        ...state,
        isLoading: true,
        localUser: {
          ...state.localUser,
          username: action.payload
        }
      }

    case C.GET_SINGLE_POST_SUCCESS:
      const { author, title, content, likers,
        comments, createdAt, _id, totalLikes } = { ...action.payload }
      const post = {
        ...state.post,
        author, title, content, createdAt, likers, comments, _id, totalLikes
      }
      return {
        ...state,
        isLoading: false,
        notFound: false,
        post: post,
        isLiked: post.likers.includes(state.localUser.username),
        localUser: {
          ...state.localUser,
          isAuthor: state.localUser.username === author.username
        }
      }
    case C.GET_SINGLE_POST_FAILED:
      return {
        ...state,
        notFound: true
      }
    case C.POST_INITIAL_STATE:
      return postState

    case C.ADD_COMMENT_REQ:
      return {
        ...state,
        commentAdding: true
      }
    case C.ADD_COMMENT_SUCCESS:
      const newPost = {
        ...state.post,
        comments: action.payload
      }
      return {
        ...state,
        commentAdding: false,
        post: newPost
      }

    case C.ADD_COMMENT_FAILED:
      return {
        ...state,
        commentAdding: false,
      }

    case C.SINGLE_POST_LIKE_HANDLE:
      return {
        ...state,
        post: {
          ...state.post,
          likers: action.payload.data.likers,
          totalLikes: action.payload.data.totalLikes
        },
        isLiked: action.payload.data.likers.includes(state.localUser.username)
      }
    
    case C.SINGLE_POST_UPDATE:
      return {
        ...state,
        isUpdating: true
      }
    case C.SINGLE_POST_UPDATE_SUCCESS:
      return{
        ...state,
        isUpdating: false,
        post: {
          ...state.post,
          title: action.payload.title,
          content: action.payload.content
        }
      }
    case C.SINGLE_POST_UPDATE_FAILED:
      return {
        ...state,
        isUpdating: false
      }
    case C.SINGLE_POST_DELETE:
      return {
        ...state,
        isDeleting: true
      }
    case C.SINGLE_POST_DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        notFound: true
      }
    case C.SINGLE_POST_DELETE_FAILED:
      return {
        ...state,
        isDeleting: false
      }
    default:
      return state
  }
}