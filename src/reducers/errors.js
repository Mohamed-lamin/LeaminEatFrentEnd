// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { message: null }, action) => {
  switch (action.type) {
    case "ERROR":
      return action?.data

    default:
      return state
  }
}
