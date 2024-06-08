import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Navbar } from './components/Navbar'
import Login from './pages/Login'
import Singup from './pages/Signup'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Navbar />

      <Container className='mb-4'>
        <Routes>
          <Route path='/signup' element={<Singup />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
