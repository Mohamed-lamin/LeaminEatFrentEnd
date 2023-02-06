import React, { useState } from "react"
import { useEffect } from "react"
import imageEAT from "../../images/icon.png"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, Link } from "react-router-dom"
import decode from "jwt-decode"
import Avatar from "react-avatar"
import { UpdateCatList } from "../../actions/Restaurant"
import restaurant from "../../reducers/restaurant"

function Navbar() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [settings, setSettings] = useState(false)
  const [partenaire, setPartenaire] = useState(false)
  const [reduction, setReduction] = useState(false)
  const [offre, setOffre] = useState(false)
  const restaurantinfo = useSelector(state => state.restaurant)
  console.log(restaurantinfo)
  const restaurantId = user?.restaurantUser?._id
  const [restaurantBar, setRestaurantBar] = useState(
    JSON.parse(localStorage.getItem("profile"))?.restaurantUser
  )

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    dispatch({ type: "LEAVE" })
    history.push("/")
    setUser(null)
    setSettings(false)
  }
  console.log(location)
  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodeToken = decode(token)
      if (decodeToken.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
    console.log(user)
    // setRestaurantBar(
    //   JSON.parse(localStorage.getItem("profile"))?.result?.restaurantUser
    // )
  }, [location])
  const addToPartenaire = () => {
    dispatch(UpdateCatList(restaurantId, { listName: "Séléction" }))
    setPartenaire(false)
  }
  const addToReduction = () => {
    dispatch(UpdateCatList(restaurantId, { listName: "Réduction" }))
    setReduction(false)
  }
  const addToOffre = () => {
    dispatch(UpdateCatList(restaurantId, { listName: "Offres à coté" }))
    setOffre(false)
  }
  return (
    <>
      <div
        className={`bg-white mx-3 md:mx-30 rounded flex flex-row justify-around md:justify-between items-center mt-5 ${
          settings ? "mb-0" : "mb-5"
        } px-5 space-x-2 relative`}
      >
        <div className="flex flex-row-reverse items-center justify-center space-x-1">
          <h2 className="text-lg font-bold ml-1 invisible md:visible">
            <Link to="/">LaminEAT</Link>
          </h2>
          <img
            alt="LaminEAT"
            className=" h-8 md:h-10 rounded-full my-1 ml-3 md:ml-0"
            src={imageEAT}
          />
        </div>

        <div>
          {user && (
            <div className="font-bold flex items-center space-x-2 ">
              <Avatar
                round={true}
                size="35"
                className=" "
                name={
                  location.pathname === "/restaurantinfo"
                    ? user.result.name
                    : user.result.restaurantUser?.restaurant_name
                }
                src={
                  location.pathname === "/restaurantinfo"
                    ? ""
                    : user.result.restaurantUser?.image
                }
              />
              <h1>
                {location.pathname === "/restaurantinfo"
                  ? user.result.name
                  : user.result.restaurantUser?.restaurant_name}
              </h1>

              <button
                className={`bg-black text-sm p-0.5
     
     
  text-white font-semibold shadow rounded w-18 text-center`}
                onClick={() => setSettings(!settings)}
              >
                paramétres
              </button>
            </div>
          )}
        </div>
      </div>
      {settings && (
        <div className="flex justify-end ">
          <div className="bg-white w-1/6 flex flex-col items-end mb-4 mr-2 pr-1">
            <button
              onClick={() => setPartenaire(!partenaire)}
              className="font-bold hover:text-orange-500 hover:underline"
            >
              Devenir partenaire
            </button>
            <button
              onClick={() => setReduction(!reduction)}
              className="font-bold  hover:text-orange-500 hover:underline"
            >
              Réductions
            </button>
            <button
              onClick={() => setOffre(!offre)}
              className=" font-bold hover:text-orange-500 hover:underline"
            >
              Offres à faire
            </button>
            <button className="font-bold hover:text-orange-500 hover:underline">
              Modifier votre profile
            </button>
            {/* <button
              className="font-bold hover:text-orange-500 hover:underline"
              onClick={modifierRestaurant}
            >
              Modifier votre profile
            </button> */}
            <button
              className="font-bold hover:text-orange-500 hover:underline"
              onClick={logout}
            >
              Deconnecter
            </button>
          </div>
        </div>
      )}
      {partenaire && (
        <div className="absolute w-full left-0 top-0 bottom-0 bg-black flex flex-col z-50">
          <div className="flex justify-end">
            {" "}
            <span
              onClick={() => setPartenaire(false)}
              className="text-white cursor-pointer"
            >
              X
            </span>
          </div>
          <div className="flex-1 text-center flex items-center justify-center flex-col">
            <h1 className="text-white my-4">
              Merci d'avoir choisi d'etre partenaire
            </h1>
            <button className="bg-white my-4 rounded" onClick={addToPartenaire}>
              Enregister
            </button>
          </div>
        </div>
      )}
      {reduction && (
        <div className="absolute w-full left-0 top-0 bottom-0 bg-black flex flex-col z-50">
          <div className="flex justify-end">
            {" "}
            <span
              onClick={() => setReduction(false)}
              className="text-white cursor-pointer"
            >
              X
            </span>
          </div>
          <div className="flex-1 text-center flex items-center justify-center flex-col">
            <h1 className="text-white my-4">
              Merci d'avoir choisi d'etre partenaire
            </h1>
            <button className="bg-white my-4 rounded" onClick={addToReduction}>
              Enregister
            </button>
          </div>
        </div>
      )}
      {offre && (
        <div className="absolute w-full left-0 top-0 bottom-0 bg-black flex flex-col z-50">
          <div className="flex justify-end">
            {" "}
            <span
              onClick={() => setOffre(false)}
              className="text-white cursor-pointer"
            >
              X
            </span>
          </div>
          <div className="flex-1 text-center flex items-center justify-center flex-col">
            <h1 className="text-white my-4">
              Merci d'avoir choisi d'etre partenaire
            </h1>
            <button className="bg-white my-4 rounded" onClick={addToOffre}>
              Enregister
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
