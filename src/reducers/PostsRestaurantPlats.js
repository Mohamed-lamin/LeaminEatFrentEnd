// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case "FETCHALL":
      return action.payload
    case "FETCHCOMMAND":
      return action.payload

    case "CREATE":
      return [...state, action.payload]
    case "UPDATE":
      console.log(state)
      return state.map(plat =>
        plat._id === action.payload._id ? action.payload : plat
      )
    case "DELETE":
      return state.filter(plat => plat._id !== action.payload._id)

    default:
      return state
  }
}
