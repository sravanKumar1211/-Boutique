import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState('')
  const {error,loading,success,isAuthenticated} = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const loginSubmit = (e) => {
    e.preventDefault()
    console.log("Login Attempt:", { loginEmail, loginPassword })
    dispatch(login({email:loginEmail,password:loginPassword}))
  }

    useEffect(() => {
        if(error){
          toast.error(error,{position:'top-center',autoClose:5000});
          dispatch(removeErrors())
        }
      }, [dispatch,error])

      useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
      },[isAuthenticated])
  
       useEffect(() => {
        if(success){
          toast.success("Login successfull",{position:'top-center',autoClose:5000});
          dispatch(removeSuccess())
        }
      }, [dispatch,success])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      {/* Login Card Container */}
      <div className="max-w-md w-full space-y-8 bg-[#111] p-10 rounded-xl border border-[#6D1A36] shadow-[0_0_20px_rgba(109,26,54,0.3)]">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
            Sign In
          </h2>
          <p className="mt-4 text-sm text-gray-500 tracking-wide">
            Welcome back to our premium collection
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={loginSubmit}>
          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="block w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] placeholder-gray-600 transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="block w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] placeholder-gray-600 transition-all duration-300"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link 
              to='/password/forgot' 
              className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors duration-200"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-[#D4AF37] hover:bg-[#b8962d] active:scale-[0.98] transition-all duration-200 uppercase tracking-widest"
            >
              Sign In
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link 
                to='/register' 
                className="font-semibold text-[#D4AF37] hover:text-white transition-colors duration-200"
              >
                Signup Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login