import { useState, useEffect } from 'react'
import './App.css'
import Home from './layouts/Home'
import About from './components/About'
import Contact from './components/Contact'
import Admin from './components/Admin'
import Login from './components/Login'

import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'

import Cart from './components/Cart'
import ProductContainer from './components/ProductContainer';
import ProductDetail from './components/ProductDetail';
import FormularioEdicion from './components/FormularioEdicion';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormularioProducto from './components/FormularioProductos'
import { useAuthContext } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])

  return (
    <Router>
        <Header/>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path="/productos" element={<ProductContainer />} />
          <Route path="/carrito" element={<Cart /> }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path='/admin' element= {<Admin />} />
          <Route path='/admin/AgregarProducto' element ={<FormularioProducto/>}/>
          <Route path="/admin/editarProducto/:id" element={<FormularioEdicion/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App
