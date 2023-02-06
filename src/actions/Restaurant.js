import * as api from "../api"
export const createRestaurant = (restaurant, id, history) => async dispatch => {
  try {
    const { data } = await api.createRestaurant(restaurant, id)
    console.log(data)
    dispatch({ type: "AUTH", data })
    history.push("/plats")
  } catch (error) {
    console.log(error)
  }
}
export const UpdateCatList = (restaurantId, cat) => async dispatch => {
  try {
    const { data } = await api.UpdateCatList(restaurantId, cat)
    console.log(data)
    dispatch({ type: "FETCHALLABOUTRESTAURANT", payload: data })
  } catch (error) {
    console.log(error)
  }
}
