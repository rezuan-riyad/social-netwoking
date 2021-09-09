import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import postsReducer from './reducers/postsReducer'
import singlePostReducer from './reducers/singlePostReducer'
import authorsReducer from './reducers/authorsReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const MODE = 'production'

// combine all reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  authors: authorsReducer,
  singlePost: singlePostReducer
})

const composeEnhancers = composeWithDevTools({})
let store

// create store 
if (MODE === 'development') {
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}
export default store