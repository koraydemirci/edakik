import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import usersListReducer from './reducers/usersList'
import userProfileReducer from './reducers/userProfile'
import logger from 'redux-logger'

const middlewares = [ReduxThunk]
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger)
}

const rootReducer = combineReducers({
  usersList: usersListReducer,
  userProfile: userProfileReducer
})

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
