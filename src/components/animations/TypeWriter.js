import React, { useEffect, useState, useRef } from "react"
import imageEAT from "../../images/waitingImage.png"
function TypeWriter({ theText }) {
  console.log(theText)
  const [text, setText] = useState("")
  const index = useRef(0)
  useEffect(() => {
    setTimeout(() => {
      setText(value => value + theText.charAt(index.current))
      index.current += 1
    }, 500)
  }, [text, theText])
  useEffect(() => {
    index.current = 0
    setText("")
  }, [theText])
  return (
    <div className="bg-orange-500  absolute bottom-0 top-20 left-20 right-20 flex justify-center flex-col space-y-10 items-center rounded-lg">
      <div>
        <h1 className="text-3xl text-white font-extrabold">{text}</h1>
      </div>
      <img className="w-40 h-40 rounded" alt="" src={imageEAT} />
    </div>
  )
}

export default TypeWriter
