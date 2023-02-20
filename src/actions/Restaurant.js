import * as api from "../api"
export const createRestaurant = (restaurant, id, history) => async dispatch => {
  try {
    const { data } = await api.createRestaurant(restaurant, id)
    console.log(data)
    dispatch({ type: "AUTHRESTAURANT", data })
    history.push("/plats")
  } catch (error) {
    console.log(error)
  }
}
export const getTheRestaurant = restaurantId => async dispatch => {
  try {
    const { data } = await api.getTheRestaurant(restaurantId)
    console.log(data)
    dispatch({ type: "AUTHRESTAURANT", data })
  } catch (error) {
    console.log(error)
  }
}
export const updateRestaurant = (restaurant, history) => async dispatch => {
  console.log(restaurant)
  try {
    const { data } = await api.updateRestaurant(restaurant)
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
