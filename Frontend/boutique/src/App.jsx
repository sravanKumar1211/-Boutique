import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products.jsx'
import Register from './User/Register.jsx'
import Login from './User/Login.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/product/:id' element={<ProductDetails></ProductDetails>}></Route>
        <Route path='/products' element={<Products></Products>}></Route>
        <Route path='/products/:keyword' element={<Products></Products>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </Router>
  )
}

export default App
