import * as C from '../constants/constants'

const postState = {
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
  commentAdding: false,
  commentUpdating: false,
  commentDeleting: false,
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

    // 1. State update by GETTING POST
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
    
    // 2. State update by ADDING COMMENT
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
    
    // 3. State update for adding or removing like actions
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
    
    // 4. state update for Post Edit actions
    case C.SINGLE_POST_UPDATE:
      return {
        ...state,
        isUpdating: true
      }
    case C.SINGLE_POST_UPDATE_SUCCESS:
      return {
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
    
    // 5. state update for post delete actions
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
    
    // 6. State update for editing comment of a particular post
    case C.UPDATE_COMMENT:
      return {
        ...state,
        commentUpdating: true
      }
    case C.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        commentUpdating: false,
        post: {
          ...state.post,
          comments: state.post.comments.map( comment => {
            if(comment._id === action.payload.commentId){
              comment.content = action.payload.content
            }
            return comment
          })
        }
      }
    case C.UPDATE_COMMENT_FAILED:
      return {
        ...state,
        commentUpdating: true
      }
    
    // 7. State update for deleting a comment
    case C.DELETE_COMMENT:
      return {
        ...state,
        commentDeleting: true
      }
    case C.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        commentDeleting: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter( comment => {
            return comment._id !== action.payload
          })
        }
      }
    case C.DELETE_COMMENT_FAILED:
      return {
        ...state,
        commentDeleting: false
      }
    default:
      return state
  }
}