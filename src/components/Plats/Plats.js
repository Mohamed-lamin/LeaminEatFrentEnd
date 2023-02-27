import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTheRestaurant } from "../../actions/Restaurant"
import {
  commands,
  deletePlat,
  getRestaurantPlats,
} from "../../actions/PostsResaurantPlats"
import RestaurantForm from "../RestaurantForm/RestaurantForm"
import RestaurantPlats from "../RestaurantPlats/RestaurantPlats"
import { useHistory, useLocation } from "react-router-dom"

function Plats() {
  const restaurantID = useSelector(state => state.restaurant)
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [restaurantId, setResaurantId] = useState()
  const [currentId, setCurrentId] = useState({ PlatId: "" })
  const [platCurrentId, setPlatCurrentId] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log(user)
    dispatch(getTheRestaurant(user?.result.restaurantId))
  }, [dispatch])
  useEffect(() => {
    dispatch(getRestaurantPlats(restaurantID?._id))
  }, [dispatch, restaurantID])

  // useEffect(() => {

  // }, [])
  // setTimeout(() => dispatch(commands(restaurantID._id)), 5000)
  // useEffect(() => {
  //   dispatch(deletePlat(restaurantId, currentId))
  //   console.log(currentId)
  // }, [currentId, dispatch, restaurantId])
  useEffect(() => {
    // restaurantID
    // ?
    setResaurantId(restaurantID?._id)
    // : setResaurantId(user?.result?.restaurantUser?._id)
  }, [restaurantId, user])

  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("profile"))
    if (!isAuth) {
      history.push("/")
    } else if (isAuth.result.role === "Serveur") {
      history.push("/commandes")
    }
  }, [location])

  return (
    <div className="container mx-auto  ">
      <div className="container  flex flex-col-reverse md:flex-row md:justify-between items-center md:items-stretch space-x-5 ">
        <div className="flex md:flex-1  ">
          <div className="">
            <RestaurantPlats
              setCurrentId={setCurrentId}
              setPlatCurrentId={setPlatCurrentId}
              restaurantId={restaurantId}
              platCurrentId={platCurrentId}
            />
          </div>
        </div>
        <div
          className={`bg-white rounded ${
            platCurrentId
              ? "border-spacing-2 border-orange-600 bg-orange-500"
              : ""
          }`}
          style={{ margin: 0 }}
        >
          <RestaurantForm
            restaurantId={restaurantId}
            setPlatCurrentId={setPlatCurrentId}
            platCurrentId={platCurrentId}
          />
        </div>
      </div>
    </div>
  )
}

export default Plats
