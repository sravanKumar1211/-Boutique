import React from 'react'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </Router>
  )
}

export default App
