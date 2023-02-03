import React, { useEffect, useState } from "react"
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import {
  createResaurantPlats,
  getRestaurantPlats,
  updatePlat,
} from "../../actions/PostsResaurantPlats"

function RestaurantForm({ restaurantId, setPlatCurrentId, platCurrentId }) {
  console.log(platCurrentId)
  const plat = useSelector(state =>
    platCurrentId ? state.plats?.find(plat => plat._id === platCurrentId) : null
  )
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    dishname: "",
    price: "",
    description: "",
    image: "",
  })
  const resetUpdate = () => {
    setPlatCurrentId("")
    setPostData({
      dishname: "",
      price: "",
      description: "",
      image: "",
    })
  }

  const user = JSON.parse(localStorage.getItem("profile"))
  const clear = () => {
    setPlatCurrentId(0)
    setPostData({
      dishname: "",
      price: "",
      description: "",
      image: "",
    })
  }
  console.log(postData)
  useEffect(() => {
    if (plat) {
      setPostData(plat)
    }
  }, [plat])
  const handleSumbit = e => {
    e.preventDefault()
    if (platCurrentId === "") {
      dispatch(createResaurantPlats(postData, restaurantId))
      clear()
    } else {
      dispatch(updatePlat(restaurantId, postData))
      clear()
    }
  }
  useEffect(() => {
    dispatch(getRestaurantPlats(restaurantId))
  }, [dispatch])
  return (
    <div className="container mx-auto ">
      <form className="flex flex-col h-1/2 items-center  mt-2 md:mt-10">
        <h2 className="text-xl font-bold">{`${
          platCurrentId ? "Mettre à jour" : "Ajouter un plat"
        }`}</h2>
        <div className="flex flex-col mt-10">
          <label>Nom du plat</label>
          <input
            className="bg-gray-300 my-2 md: w-60 rounded py-2 px-2"
            placeholder="Nom du plat"
            name="dishname"
            value={postData.dishname}
            onChange={e =>
              setPostData({ ...postData, dishname: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label>Prix</label>
          <input
            className="bg-gray-300 my-2 md:mb-2 w-60 rounded py-2 px-2"
            placeholder="Le prix"
            name="price"
            type="number"
            value={postData.price}
            onChange={e => setPostData({ ...postData, price: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            className="bg-gray-300 mb-5 md:mb-3 w-60 rounded py-2 px-2"
            name="description"
            rows={5}
            placeholder="Description du plat"
            value={postData.description}
            onChange={e =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </div>

        <div className="">
          <FileBase
            type="file"
            multiple={false}
            name="image"
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </div>
        <button
          className="mt-5 mb-2 md:mt-10 py-1 border-solid border-2 bg-black w-5/12  text-white font-bold rounded-md "
          type="submit"
          onClick={handleSumbit}
        >
          {`${platCurrentId ? "Mettre à jour" : "Enregistrer"}`}
        </button>
        {platCurrentId && (
          <button
            className=" my-1 py-1 border-solid border-2 bg-black w-5/12  text-white font-bold rounded-md "
            onClick={resetUpdate}
          >
            Annuler
          </button>
        )}
      </form>
    </div>
  )
}

export default RestaurantForm
