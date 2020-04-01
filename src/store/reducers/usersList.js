// import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
// import Order from "../../models/order";

const initialState = {
  githubUsers: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.users
    case 'RESET_USERS':
    default:
      return initialState
  }
}
