import axios from "axios"

// const url = "https://lamineatbackend-lamineat.onrender.com"
const url = "http://localhost:5000"
const API = axios.create({
  baseURL: url,
})

API.interceptors.request.use(req => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }
  return req
})
// Plats
export const fetchPlats = restaurantId =>
  API.get(`/restaurant/plats/${restaurantId}`)
export const createPlat = (newPlatPost, restaurantId) =>
  API.post(`/restaurant/plats/${restaurantId}`, newPlatPost)
export const deletePlat = (restaurantId, currentId) =>
  API.post(`/restaurant/deleteplat/${restaurantId}`, currentId)
export const updatePlat = (restaurantId, form) =>
  API.patch(`/restaurant/updateplat/${restaurantId}`, form)

//CreateRestaurant
export const createRestaurant = (restaurant, userId) =>
  API.post(`/restaurant/${userId}`, restaurant)

export const AllAboutRestaurant = () => API.get(`plats/restaurants`)

// Auth

export const signIn = form => API.post(`/signin`, form)
export const signUn = form => API.post(`/signup`, form)

// Update CatList

export const UpdateCatList = (restaurantId, cat) =>
  API.post(`/type/${restaurantId}`, cat)
