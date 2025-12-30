import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Shipping() {
  return (
    <>
    <PageTitle title='Shipping'></PageTitle>
    <Navbar></Navbar>
        <div>
            <h1>Shipping Details</h1>
            <form >
                <div>
                    <div>
                        <div>
                            <label >Adress</label>
                            <input type="text" id='address' name='address'
                            placeholder='Enter Your adress' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label >Pincode</label>
                            <input type="Number" id='Pincode' name='Pincode'
                            placeholder='Enter Your Pincode' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label >PhoneNumber</label>
                            <input type="Number" id='PhoneNumber' name='PhoneNumber'
                            placeholder='Enter Your PhoneNumber' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Country</label>
                            <input type="string" id='Country' name='Country'
                            placeholder='Enter Your Country' />
                        </div>
                    </div>
                </div>
                <button>Continue</button>
            </form>
        </div>

    <Footer></Footer>
    </>
  )
}

export default Shipping
