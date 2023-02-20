import React, { useEffect, useState, useRef } from "react"

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
    <div className="bg-orange-500  absolute bottom-0 top-20 left-20 right-20 flex justify-center items-center">
      <div>
        <h1 className="text-3xl text-white font-extrabold">{text}</h1>
        <img
          className="w-20 h-20"
          alt=""
          src={"../../images/waitingImage.png"}
        />
      </div>
    </div>
  )
}

export default TypeWriter
