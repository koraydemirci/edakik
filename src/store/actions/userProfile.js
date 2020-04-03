import axios from 'axios'
import _ from 'lodash'
import {SET_PROFILE, SET_FOLLOWERS, SET_FOLLOWINGS} from './actionTypes'

export const fetchUserProfile = userName => {
  return async (dispatch, getState) => {
    try {
      const userProfileUrl = `https://api.github.com/users/${userName}`
      const profileResponse = await axios.get(userProfileUrl)
      if (profileResponse.status !== 200) {
        throw new Error("Can't get user profile from server!")
      }

      const profile = _.get(profileResponse, 'data')

      if (!profile) {
        throw new Error('No profile!')
      }

      const userReposUrl = `https://api.github.com/users/${userName}/repos`
      const repoResponse = await axios.get(userReposUrl)

      if (repoResponse.status !== 200) {
        throw new Error("Can't get user's repos from server!")
      }

      const repos = _.get(repoResponse, 'data')

      if (!repos) {
        throw new Error('No repo!')
      }

      dispatch({type: SET_PROFILE, profile: {...profile, repos}})
    } catch (err) {
      throw err
    }
  }
}

export const fetchUserFollowers = userName => {
  return async (dispatch, getState) => {
    try {
      const userFollowersUrl = `https://api.github.com/users/${userName}/followers`
      const userFollowersResponse = await axios.get(userFollowersUrl)
      if (userFollowersResponse.status !== 200) {
        throw new Error("Can't get user followers from server!")
      }

      const followers = _.get(userFollowersResponse, 'data')

      if (!followers) {
        throw new Error('No profile!')
      }

      dispatch({type: SET_FOLLOWERS, followers})
    } catch (err) {
      throw err
    }
  }
}

export const fetchUserFollowings = userName => {
  return async (dispatch, getState) => {
    try {
      const userFollowingsUrl = `https://api.github.com/users/${userName}/following`
      const userFollowingsResponse = await axios.get(userFollowingsUrl)
      if (userFollowingsResponse.status !== 200) {
        throw new Error("Can't get user followings from server!")
      }

      const followings = _.get(userFollowingsResponse, 'data')

      if (!followings) {
        throw new Error('No followings!')
      }

      dispatch({type: SET_FOLLOWINGS, followings})
    } catch (err) {
      throw err
    }
  }
}
