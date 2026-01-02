import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState('')
  const {error,loading,success,isAuthenticated} = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const location=useLocation()

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login({email:loginEmail,password:loginPassword}))
  }

  const redirect=new URLSearchParams(location.search).get('redirect') ||'/'

  useEffect(() => {
    if(error){
      toast.error(error,{position:'top-center',autoClose:5000});
      dispatch(removeErrors())
    }
  }, [dispatch,error])

  useEffect(()=>{
    if(isAuthenticated){
        navigate(redirect)
    }
  },[isAuthenticated])

  useEffect(() => {
    if(success){
      toast.success("Login successfull",{position:'top-center',autoClose:5000});
      dispatch(removeSuccess())
    }
  }, [dispatch,success])

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        
        {/* Card */}
        <div className="max-w-sm w-full border border-[#76153C]/30 rounded-md p-6">

          {/* Header */}
          <h2 className="text-xl font-semibold text-black mb-4">
            Sign in
          </h2>

          <form className="space-y-4" onSubmit={loginSubmit}>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded 
                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8] 
                           focus:border-[#67B2D8]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded 
                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8] 
                           focus:border-[#67B2D8]"
              />
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link
                to='/password/forgot'
                className="text-xs text-[#67B2D8] hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#67B2D8] text-black text-sm font-semibold rounded
                         hover:bg-[#BF124D] hover:text-white transition"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-[#76153C]/20"></div>

          {/* Signup */}
          <p className="text-xs text-center text-gray-600">
            New to our store?{' '}
            <Link
              to='/register'
              className="text-[#67B2D8] hover:underline font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
