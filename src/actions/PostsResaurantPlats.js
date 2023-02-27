import * as api from "../api"

export const getRestaurantPlats = restaurantId => async dispatch => {
  console.log(restaurantId)
  try {
    const { data } = await api.fetchPlats(restaurantId)
    console.log(data)
    dispatch({ type: "FETCHALL", payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createResaurantPlats =
  (newPlat, restaurantId) => async dispatch => {
    try {
      const { data } = await api.createPlat(newPlat, restaurantId)
      dispatch({ type: "CREATE", payload: data })
    } catch (error) {
      console.log(error)
    }
  }
export const deletePlat = platId => async dispatch => {
  try {
    const { data } = await api.deletePlat(platId)
    console.log(data)
    dispatch({ type: "DELETE", payload: data.id })
  } catch (error) {
    console.log(error)
  }
}
export const updatePlat = (restaurantId, form) => async dispatch => {
  try {
    const { data } = await api.updatePlat(restaurantId, form)
    console.log(data)
    dispatch({ type: "UPDATE", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

// get the restaurant's commands

// export const category = Post => async dispatch => {
//   try {
//     const { data } = await api.createCatego(Post)
//     console.log(data)
//     // dispatch({ type: "FETCHCOMMAND", payload: data })
//   } catch (error) {
//     console.log(error)
//   }
// }
export const getCategories = () => async dispatch => {
  try {
    const { data } = await api.getCategory()
    console.log(data)
    dispatch({ type: "FETCHCATEGORIES", payload: data })
  } catch (error) {
    console.log(error)
  }
}
