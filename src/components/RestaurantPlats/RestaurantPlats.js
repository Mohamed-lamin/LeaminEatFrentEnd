import React from "react"
import RestaurantPlat from "./RestaurantPlat"
import { useSelector } from "react-redux"

function RestaurantPlats({
  setCurrentId,
  platCurrentId,
  setPlatCurrentId,
  restaurantId,
}) {
  const Plats = useSelector(state => state.plats)
  console.log(Plats)

  const user = JSON.parse(localStorage.getItem("profile"))

  return !Plats ? (
    <h1 className="text-white">Téléchargement...</h1>
  ) : (
    <div className="flex flex-wrap justify-start space-x-2">
      {Plats?.map((plat, index) => (
        <div
          key={plat._id}
          className={`w-50 md:w-60 rounded ${
            platCurrentId === plat._id
              ? " border-orange-400 border-solid border-4 "
              : " border-transparent"
          }`}
        >
          <RestaurantPlat
            plat={plat}
            setCurrentId={setCurrentId}
            setPlatCurrentId={setPlatCurrentId}
            platCurrentId={platCurrentId}
            restaurantId={restaurantId}
          />
        </div>
      ))}
    </div>
  )
}

export default RestaurantPlats
