import React from 'react'
import Sining from './components/Sining'
import Signup from './components/Signup'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Sining" element={<Sining/>} />
</Routes>
    </>
  )
}

export default App
