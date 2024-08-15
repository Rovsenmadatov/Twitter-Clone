import React from 'react'
import Feed from  "./pages/Feed"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Protected from './pages/Protected'

const App = () => {
  return (
  
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login/>}/>

        <Route element={<Protected/>}>
         <Route path="/home"  element={<Feed/>}/>
         <Route path="/ayar"  element={<h1>ayar</h1> }/>
         <Route path="/mesaj"  element={<h1>mesaj</h1> }/>
         <Route path="/profil"  element={<h1>Profil</h1>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
