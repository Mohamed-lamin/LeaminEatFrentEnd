import "./App.css"
import Navbar from "./components/Nabar/Navbar"
import Plats from "./components/Plats/Plats"
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom"
import Auth from "./components/Auth/Auth"
import Restaurantinfo from "./components/restaurantinfo/Restaurantinfo"
import { useEffect, useState } from "react"
import Commands from "./components/Plats/Commands"
function App() {
  const history = useHistory()
  const [login, setLogin] = useState(localStorage.getItem("profile"))
  return (
    <BrowserRouter>
      <div className="container mx-auto flex min-h-screen justify-center  bg-black">
        <div className="container mx-10">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/plats" exact component={Plats} />
            <Route path="/restaurantinfo" exact component={Restaurantinfo} />
            <Route path="/commandes" exact component={Commands} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
