import * as api from "../api"

export const commands = restaurantId => async dispatch => {
  try {
    const { data } = await api.fetchCommands(restaurantId)
    console.log(data)
    dispatch({ type: "FETCHCOMMAND", payload: data })
  } catch (error) {
    console.log(error)
  }
}
