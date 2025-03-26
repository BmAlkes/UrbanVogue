import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./Pages/Home"


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      {/* User Layout */}
      <Route path="/" element={<Home/>}/>
      </Route>
     
      {/* Admin Layout */}
    </Routes>
    </BrowserRouter>
  )
}

export default App