import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { signin, signup } from "../../actions/auth"
import jwt_decode from "jwt-decode"

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
}

function Auth() {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  // const switchSignIn = e => {
  //   e.preventDefault()
  //   setIsSignup(!isSignup)
  // }
  const error = useSelector(state => state.auth)
  console.log(error)
  // handle Change in the form
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })
  // handleSubmit Form
  const handleSubmitSignIn = e => {
    e.preventDefault()

    dispatch(signin(form, history))
  }
  const handleSubmitSignUp = e => {
    e.preventDefault()

    dispatch(signup(form, history))
  }
  // handle google responses
  const googleSuccess = async res => {
    console.log(res)
  }
  const googleFailure = error => {
    console.log(error)
  }
  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("profile"))
    console.log(isAuth)
    if (isAuth && !isAuth?.result?.restaurantUser) {
      history.push("/restaurantinfo")
    } else if (isAuth && isAuth?.result?.restaurantUser) {
      history.push("/plats")
    } else {
      history.push("/")
    }
  }, [])
  function handleCallbackResponse(res) {
    const token = res.credential
    const result = jwt_decode(res.credential)
    try {
      dispatch({ type: "AUTH", data: { result, token } })

      history.push("/plats")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id:
        "458146796540-v47o5hhr2n9o5h1nu254r5t3or8kd70j.apps.googleusercontent.com",
      // eslint-disable-next-line no-undef
      callback: handleCallbackResponse,
    })
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    })
  })
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
      <div className="mx-10  md:w-1/2">
        <form
          className="flex flex-col h-96 bg-white  w-full items-center  mt-20 rounded"
          onSubmit={handleSubmitSignUp}
        >
          <h1 className="font-bold mt-5">Inscription</h1>
          <div className="flex w-60 md:w-80 justify-center mt-5 mb-2 space-x-3">
            <input
              className="bg-gray-300 py-2 px-2 w-1/2 rounded "
              placeholder="Votre Nom"
              name="firstname"
              onChange={handleChange}
            />
            <input
              className="bg-gray-300 py-2 px-2 w-1/2 rounded "
              placeholder="Votre Prénom"
              name="lastname"
              onChange={handleChange}
            />
          </div>

          <input
            className="bg-gray-300 mb-2  rounded py-2 px-2 w-60 md:w-80 "
            placeholder="Votre adresse email"
            name="email"
            type="email"
            onChange={handleChange}
          />

          <input
            className="bg-gray-300 mb-2  rounded py-2 px-2 w-60 md:w-80"
            placeholder="Mot de passe"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <input
            className="bg-gray-300   rounded py-2 px-2 w-60 md:w-80"
            placeholder="Confirmer mot de passe"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />

          <button
            className=" mt-5 w-60 md:w-80 py-0.5 border-solid border-2 bg-black   text-white font-bold rounded-md "
            type="submit"
          >
            S'inscrire
          </button>
        </form>
      </div>
      <div className="mx-10 md:w-1/2 flex items-center">
        <form
          className="flex flex-col bg-white h-96  w-full items-center justify-center  mt-5 md:mt-20 rounded"
          onSubmit={handleSubmitSignIn}
        >
          <h1 className="font-bold mt-5">Authentification</h1>
          <div className="flex flex-col mt-5 ">
            <input
              className="bg-gray-300 mb-2  rounded py-2 px-2 w-60 md:w-80 "
              placeholder="Votre adresse email"
              name="email"
              type="email"
              onChange={handleChange}
            />

            <input
              className="bg-gray-300 mb-2  rounded py-2 px-2 w-60 md:w-80"
              placeholder="Mot de passe"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>

          <button
            className=" mt-5  w-60 md:w-80 py-0.5 border-solid border-2 bg-black   text-white font-bold rounded-md "
            type="submit"
          >
            Enregistrer
          </button>
          <div id="signInDiv"></div>
        </form>
      </div>
    </div>
  )
}

export default Auth
