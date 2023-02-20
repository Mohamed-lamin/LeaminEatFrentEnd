import * as api from "../api/index"

export const signin = (form, history, setShowWaiting) => async dispatch => {
  try {
    setShowWaiting(true)
    const { data } = await api.signIn(form)
    dispatch({ type: "AUTH", data })
    history.push("/plats")
    // setShowWaiting(false)
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
