import * as api from "../api/index"
import { getTheRestaurant } from "./Restaurant"
export const signin = (form, history, setShowWaiting) => async dispatch => {
  try {
    setShowWaiting(true)
    const { data } = await api.signIn(form)
    const restaurantId = data.result.restaurantId
    dispatch(getTheRestaurant(restaurantId))
    dispatch({ type: "AUTH", data })
    const Role = data.result.role
    Role === "Manager" ? history.push("/plats") : history.push("/commandes")
    setShowWaiting(false)
  } catch (error) {
    const data = error.response.data
    dispatch({ type: "ERROR", data })
    console.log(error.response.data)
    setShowWaiting(false)
  }
}
export const signup = (form, history) => async dispatch => {
  try {
    const { data } = await api.signUn(form)
    dispatch({ type: "AUTH", data })
    history.push("/restaurantinfo")
  } catch (error) {
    const data = error.response.data
    dispatch({ type: "ERROR", data })
    console.log(error.response.data)
  }
}
export const ajouterServeur =
  (serverForm, setServeur, setServeurAdded) => async dispatch => {
    console.log(serverForm)
    try {
      const { data } = await api.ajouterServeur(serverForm)
      setServeurAdded(data)
      setServeur(false)

      console.log(data)
      // dispatch({ type: "AUTH", data })
    } catch (error) {
      console.log(error)
    }
  }
