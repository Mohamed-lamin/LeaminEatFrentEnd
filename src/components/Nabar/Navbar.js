import React, { useState } from "react"
import { useEffect } from "react"
import imageEAT from "../../images/icon.png"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, Link } from "react-router-dom"
import decode from "jwt-decode"
import Avatar from "react-avatar"
import FileBase from "react-file-base64"
import { UpdateCatList, updateRestaurant } from "../../actions/Restaurant"
import restaurant from "../../reducers/restaurant"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import commands from "../../reducers/commands"
import { getCategories } from "../../actions/PostsResaurantPlats"

function Navbar() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [showCommands, setShowCommands] = useState(false)
  const [showOneCommand, setShowOneCommand] = useState("")
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const allCommands = useSelector(state => state.commands)
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
  // udating Restaurant
  const categories = useSelector(state => state.categories)
  console.log(categories)
  const initial = {
    restaurant_name: "",
    description: "",
    image: "",
    lat: "52",
    long: "52",
    numero: "",
    rue: "",
    ville: "",
    codepostal: "",
    rating: "5",
    category_name: "",
    id: "",
  }

  const [restaurant, setRestaurant] = useState(initial)
  const [updateRetaurant, setUpdateRestaurant] = useState(false)
  const restaurantInfo = useSelector(state => state.auth)

  const handleSumbit = e => {
    e.preventDefault()
    dispatch(updateRestaurant({ ...restaurant, id: user.result._id }, history))
    setRestaurant(initial)
    setUpdateRestaurant(false)
  }
  const modifierRestaurant = () => {
    setRestaurant(user.result.restaurantUser)
    setUpdateRestaurant(true)
    setSettings(false)
    dispatch(getCategories())
  }
  console.log(restaurant)
  //
  console.log(user)
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

  console.log(allCommands)
  return (
    <>
      <div
        className={`bg-white rounded flex flex-row justify-around md:justify-between items-center my-5 
          
         px-5 space-x-2 relative`}
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
        {user?.result.restaurantUser && (
          <div>
            <ChevronDownIcon
              onClick={() => setShowCommands(!showCommands)}
              className="h-12 w-12 text-orange-500 cursor-pointer"
            />
          </div>
        )}

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
              {user?.result.restaurantUser && (
                <button
                  className={`bg-black text-sm p-0.5
       
       
    text-white font-semibold shadow rounded w-18 text-center`}
                  onClick={() => setSettings(!settings)}
                >
                  paramétres
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {settings && (
        <div className="flex justify-end mx-30 absolute z-50 w-4/5 ml-20">
          <div className="bg-black rounded-b text-white w-1/6 flex flex-col items-center mb-4  ">
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
            <button
              onClick={modifierRestaurant}
              className="font-bold hover:text-orange-500 hover:underline"
            >
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
      {showCommands && (
        <div className="flex justify-center bg-gray-300 rounded ml-6 absolute w-11/12 h-5/6 z-50">
          <div className=" mt-10 w-4/5 h-16 ">
            {allCommands.map((item, id) => (
              <>
                <div
                  key={item._id}
                  className={`bg-black ${
                    showOneCommand ? "mb-0" : "mb-2"
                  } h-full flex flex-row-reverse justify-around items-center rounded`}
                >
                  <div className="space-x-2  flex justify-end">
                    <button className="font-bold text-sm p-2  bg-gray-300 rounded">
                      Accepter
                    </button>
                    <button className="text-white font-bold text-sm p-2 bg-orange-500 rounded">
                      Refuser
                    </button>
                  </div>
                  <div className="mt-2 ">
                    <h1 className="text-white mt-2">Details</h1>
                    <ChevronDownIcon
                      onClick={
                        !showOneCommand
                          ? () => setShowOneCommand(item._id)
                          : () => setShowOneCommand()
                      }
                      className="h-8 w-12 text-orange-500 cursor-pointer"
                    />
                  </div>
                  <div className="text-center w-1/6">
                    <h1 className="text-white">{item.clientName}</h1>
                  </div>
                </div>
                {showOneCommand === item._id && (
                  <div className="flex justify-center z-50 ">
                    {item.commandes.map(subItem => (
                      <div className="bg-orange-500  mb-2 rounded-b text-center w-1/2">
                        <div className="flex mt-2 flex-row-reverse items-center justify-center mr-10">
                          <h1 className="text-lg font-semibold">
                            Nom du plat : {subItem.platName}
                          </h1>
                          <img
                            className=" rounded-full h-16 w-16 p-2 "
                            src={subItem.PlatImage}
                            alt=""
                          />
                        </div>

                        <h1>Nombre de plats : {subItem.number}</h1>
                        <h1 className="font-extrabold">
                          {" "}
                          Prix total : {subItem.total} Euro
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      )}
      {updateRetaurant && (
        <div className="container rounded bg-transparent  ml-5 z-50 w-11/12 mx-auto flex justify-center items-start absolute ">
          <form className="flex w-1/2 flex-col h-1/2 items-center justify-around mt-2 bg-orange-500 rounded border-2  border-white">
            <h2 className="text-xl mt-5 font-bold">
              Modifier les informations de votre restaurant
            </h2>
            <div className="flex flex-col w-96 mt-5">
              <label>Nom du restaurant</label>
              <input
                className="bg-gray-300 my-1 md:mb-3 w-60 md:w-full rounded py-2 px-2"
                placeholder="Nom du restaurant"
                name="restaurant_name"
                value={restaurant.restaurant_name}
                onChange={e =>
                  setRestaurant({
                    ...restaurant,
                    restaurant_name: e.target.value,
                  })
                }
              />
            </div>

            {/* <textarea
          className="bg-gray-300 mb-5 md:mb-10 w-60 rounded py-2 px-2"
          name="address"
          rows={3}
          placeholder="Adresse du restaurant"
          value={restaurant.address}
          onChange={e =>
            setRestaurant({ ...restaurant, address: e.target.value })
          }
        /> */}
            <div className="flex flex-col w-96">
              <div className="w-full flex space-x-1">
                <div className="flex w-20 flex-col ">
                  <label>N°</label>
                  <input
                    className="bg-gray-300 my-1 md:mb-3 w-full rounded py-2 px-2"
                    name="numero"
                    placeholder="N°"
                    type="number"
                    onChange={e =>
                      setRestaurant({
                        ...restaurant,
                        numero: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col w-80">
                  <label>Rue</label>
                  <input
                    className="bg-gray-300 my-1 md:mb-3  w-full  rounded py-2 px-2"
                    name="rue"
                    placeholder="Rue"
                    onChange={e =>
                      setRestaurant({
                        ...restaurant,
                        rue: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="w-96 flex space-x-1">
                <div className="flex flex-col w-25 ">
                  <label>Code Postal</label>
                  <input
                    className="bg-gray-300 my-1 md:mb-3 w-full rounded py-2 px-2"
                    name="codepostal"
                    Placeholder="Code Postal"
                    onChange={e =>
                      setRestaurant({
                        ...restaurant,
                        codepostal: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col w-80">
                  <label>Ville</label>
                  <input
                    className="bg-gray-300 my-1 md:mb-3 w-full rounded py-2 px-2"
                    name="ville"
                    placeholder="Ville"
                    onChange={e =>
                      setRestaurant({
                        ...restaurant,
                        ville: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-96">
              <label>Description</label>
              <textarea
                className="bg-gray-300 mb-5 md:mb-3 mt-2 w-full rounded py-2 px-2"
                name="description"
                rows={3}
                placeholder="Description"
                value={restaurant.description}
                onChange={e =>
                  setRestaurant({ ...restaurant, description: e.target.value })
                }
              />
            </div>

            <label for="categorie" className="font-bold text-sm text-black">
              Selectionnez une categorie
            </label>
            <select
              className="mb-5 w-1/5 rounded bg-gray-200"
              name="category_name"
              id="categorie"
              onChange={e =>
                setRestaurant({ ...restaurant, category_name: e.target.value })
              }
            >
              {categories.map(category => (
                <option value={category._id}>{category.category_name}</option>
              ))}

              {/* <option value="local">Local</option>
              <option value="americain">Americain</option>
              <option value="italien">Italien</option>
              <option value="japanais">Japanais</option>
              <option value="lebanaise">Lebanaise</option>
              <option value="chinois">Chinois</option> */}
            </select>

            <div className="text-black">
              <FileBase
                type="file"
                multiple={false}
                value={restaurant.image}
                name="image"
                onDone={({ base64 }) =>
                  setRestaurant({ ...restaurant, image: base64 })
                }
              />
            </div>
            <button
              className="my-2 md:my-1 py-1 border-solid border-2 bg-black w-1/5  text-white font-bold rounded-md "
              type="submit"
              onClick={handleSumbit}
            >
              Mettre à jour
            </button>
            <button
              className="my-2 md:my-1 py-1 border-solid border-2 bg-black w-1/5  text-white font-bold rounded-md "
              type="submit"
              onClick={() => setUpdateRestaurant(false)}
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Navbar
