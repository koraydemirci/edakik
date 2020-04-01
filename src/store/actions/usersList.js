export const fetchGithubUsers = searchText => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchText}`,
      )
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }

      const resData = await response.json()
      const users = resData.items

      // const loadedOrders = [];

      // for (const key in resData) {
      //   loadedOrders.push(
      //     new Order(
      //       key,
      //       resData[key].cartItems,
      //       resData[key].totalAmount,
      //       new Date(resData[key].date)
      //     )
      //   );
      // }
      dispatch({type: 'FETCH_USERS', users})
    } catch (err) {
      throw err
    }
  }
}

export const resetGithubUsers = () => ({
  type: 'RESET_USERS',
})
