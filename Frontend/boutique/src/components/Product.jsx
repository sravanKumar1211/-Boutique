import React from 'react'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
   <>
   <Link to={product._id}>
   <div className='flex gap-2' >
        <img src={product.image[0].url} alt={product.name} />
        <div>
            <h3>{product.name}</h3>
            <p>Price <strong>{product.price}/-</strong> </p>
            <button>Add To Cart</button>
        </div>
   </div>
   </Link>
   </>
  )
}

export default Product
