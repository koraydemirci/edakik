import {SET_USERS, RESET_USERS} from '../actions/actionTypes'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case RESET_USERS:
      return initialState
    default:
      return state
  }
}
