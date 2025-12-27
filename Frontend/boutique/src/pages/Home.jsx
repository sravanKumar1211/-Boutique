import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'


const products= [
    {
      "_id": "694632fbe19402a939812a6c",
      "name": "saree",
      "description": "Pure silk saree",
      "price": 5000,
      "ratings": 0,
      "image": [
        {
          "public_id": "test id",
          "url": "abcd",
          "_id": "6946336cc1b610b0180a2f4c"
        }
      ],
      "category": "saree",
      "stock": 4,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-20T05:24:11.859Z",
      "__v": 3
    },
    {
      "_id": "69463bd87214887600f1caac",
      "name": "new saree",
      "description": "Pure silk saree",
      "price": 8000,
      "ratings": 4,
      "image": [
        {
          "public_id": "test id",
          "url": "abcd",
          "_id": "69463bd87214887600f1caad"
        }
      ],
      "category": "saree",
      "stock": 5,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-20T06:02:00.260Z",
      "__v": 0
    },
    {
      "_id": "694649f6504768a5ce57d9aa",
      "name": "t-shirt",
      "description": "cotton",
      "price": 1500,
      "ratings": 5,
      "image": [
        {
          "public_id": "test id",
          "url": "abcd",
          "_id": "694649f6504768a5ce57d9ab"
        }
      ],
      "category": "shirts",
      "stock": 7,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-20T07:02:14.701Z",
      "__v": 0
    }
  ]

function Home() {
  return (
    <div>
      <PageTitle title="Home"></PageTitle>
      <Navbar></Navbar>
      <ImageSlider></ImageSlider>
      <h1>Home</h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>

      <Footer></Footer>
    </div>
  )
}

export default Home
