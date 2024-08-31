
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import About from './pages/About'
import Profile from './pages/Profile'
import Navbar from './commonComponents/Navbar'
import PrivateRoute from './components/PrivateRoute'
import CreateListings from './pages/CreateListings'

const App = () => {
  return (

    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signout />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListings />} />

        </Route>
      </Routes>
    </>

  )
}

export default App