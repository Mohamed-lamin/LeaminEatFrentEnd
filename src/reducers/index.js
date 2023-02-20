import { combineReducers } from "redux"

import plats from "./PostsRestaurantPlats"
import auth from "./auth"
import restaurant from "./restaurant"
import error from "./errors"
import commands from "./commands"
import categories from "./categories"

export default combineReducers({
  plats,
  auth,
  restaurant,
  error,
  commands,
  categories,
})
