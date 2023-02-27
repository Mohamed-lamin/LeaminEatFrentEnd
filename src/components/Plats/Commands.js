import { ChevronDownIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { commands } from "../../actions/commands"
import { getTheRestaurant } from "../../actions/Restaurant"

function Commands() {
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const restaurantIDForCommand = useSelector(state => state.restaurant)
  const allCommands = useSelector(state => state.commands)
  console.log(allCommands)
  useEffect(() => {
    dispatch(getTheRestaurant(user.result.restaurantId))
  }, [])
  const [showOneCommand, setShowOneCommand] = useState("")
  useEffect(() => {
    // const interval = setInterval(
    dispatch(commands(restaurantIDForCommand?._id))
    //   5000
    // )
    // return () => clearInterval(interval)
  }, [])
  return (
    <div className="bg-black">
      <div className="flex justify-center bg-gray-300 rounded ml-6 absolute w-11/12 h-5/6 ">
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
                <div className="text-center ">
                  <img className="w-20 h-20" src={item.clientImage} alt="al" />
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
    </div>
  )
}

export default Commands
