import {SET_PROFILE, SET_FOLLOWERS, SET_FOLLOWINGS} from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.profile
      case SET_FOLLOWERS:
        return {...state, followersList: action.followers}
      case SET_FOLLOWINGS:
        return {...state, followingList: action.followings}
    default:
      return state
  }
}
