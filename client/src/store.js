import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import postReducer from './reducers/postReducer'
import singlePostReducer from './reducers/singlePostReducer'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const MODE = 'development'

// combine all reducers
const rootReducer = combineReducers({
  postReducer: postReducer,
  userReducer: userReducer,
  singlePostReducer: singlePostReducer,
  authReducer: authReducer
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