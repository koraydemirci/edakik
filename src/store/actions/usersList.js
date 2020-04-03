import axios from 'axios'
import _ from 'lodash'
import {SET_USERS, RESET_USERS} from './actionTypes'

export const fetchGithubUsers = searchText => {
  return async (dispatch, getState) => {
    try {
      const searchUrl = `https://api.github.com/search/users?q=${searchText}`
      const response = await axios.get(searchUrl)
      if (response.status !== 200) {
        throw new Error("Can't get users from server!")
      }

      const users = _.get(response, 'data.items')

      if (!users) {
        throw new Error('No users!')
      }
      dispatch({type: SET_USERS, users})
    } catch (err) {
      throw err
    }
  }
}

export const resetGithubUsers = () => ({
  type: RESET_USERS,
})
