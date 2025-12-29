import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
  return (
   <>
        <div>
            <div>
                <form>
                    <div>
                        <input type="email" placeholder='Enter email' />
                    </div>
                    <div>
                        <input type="password" placeholder='Enter password' />
                    </div>
                    <button>SignIn</button>
                    <p>Forgot your password? <Link to='/password/forgot'>Reset Here</Link></p>
                    <p>Dont have an account? <Link to='/register'>Signup Here</Link></p>
                </form>
            </div>
        </div>
   </>
  )
}

export default Login
