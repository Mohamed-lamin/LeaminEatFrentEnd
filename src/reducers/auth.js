// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      console.log(action.data)
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...state.authData, ...action?.data })
      )
      return { ...state, authData: action?.payload }
    case "LOGOUT":
      localStorage.clear()
      return { ...state, authData: null }

    default:
      return state
  }
}
