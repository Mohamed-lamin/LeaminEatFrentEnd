import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FileBase from "react-file-base64"
import { createRestaurant } from "../../actions/Restaurant"
import { useHistory } from "react-router-dom"
import { getCategories } from "../../actions/PostsResaurantPlats"

function Restaurantinfo() {
  const categories = useSelector(state => state.categories)
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
  }
  const dispatch = useDispatch()
  const history = useHistory()
  const [restaurant, setRestaurant] = useState(initial)
  const [id, setId] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"))
    setId(user.result?._id)
    // if (user.result.restaurantUser) {
    //   setRestaurant({
    //     restaurant_name: user.result.restaurantUser.restaurant_name,
    //     description: user.result.restaurantUser.description,
    //     image: user.result.restaurantUser.image,
    //     numero: user.result.restaurantUser.numero,
    //     ville: user.result.restaurantUser.ville,
    //     codepostal: user.result.restaurantUser.codepostal,
    //     category_name: user.result.restaurantUser.category,
    //   })
    // }
  }, [])
  const handleSumbit = e => {
    e.preventDefault()
    dispatch(createRestaurant(restaurant, id, history))
  }
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="container mx-auto flex justify-center items-start ">
      <form className="flex w-1/2 flex-col h-1/2 items-center justify-around mt-2 bg-white rounded border-2  border-white">
        <h2 className="text-xl mt-5 font-bold">
          Entrer les informations de votre restaurant
        </h2>
        <div className="flex flex-col w-96 mt-5">
          <label>Nom du restaurant</label>
          <input
            className="bg-gray-300 my-1 md:mb-3 w-60 md:w-full rounded py-2 px-2"
            placeholder="Nom du restaurant"
            name="restaurant_name"
            value={restaurant.restaurant_name}
            onChange={e =>
              setRestaurant({ ...restaurant, restaurant_name: e.target.value })
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
            name="image"
            onDone={({ base64 }) =>
              setRestaurant({ ...restaurant, image: base64 })
            }
          />
        </div>
        <button
          className=" mt-3 py-1 border-solid border-2 bg-black w-1/5  text-white font-bold rounded-md "
          type="submit"
          onClick={handleSumbit}
        >
          Enregistrer
        </button>
        <button
          className="my-2 md:my-2 py-1 border-solid border-2 bg-black w-1/5  text-white font-bold rounded-md "
          type="submit"
          onClick={() => history.goBack()}
        >
          Annuler
        </button>
      </form>
    </div>
  )
}

export default Restaurantinfo
