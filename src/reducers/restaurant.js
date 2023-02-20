// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case "AUTHRESTAURANT":
      console.log(action.data)
      return action.data

    case "LEAVE":
      return null
    default:
      return state
  }
}
