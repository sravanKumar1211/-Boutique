import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { register, removeErrors, removeSuccess } from '../features/user/userSlice'
import Navbar from '../components/Navbar'

function Register() {
  const [user,setUser]=useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=user;
  const [avatar,setAvatar]=useState('')
  const [avatarPreview,setAvatarPreview]=useState('./image')
  const {success,loading,error} = useSelector(state => state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const registerDataChange=(e)=>{
    if(e.target.name=='avatar'){
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }else{
        setUser({...user,[e.target.name]:e.target.value})
    }
  }

  const registerSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !password){
        toast.error('Please fill the form')
        return
    }
    const myForm=new FormData();
    myForm.set('name',name)
    myForm.set('email',email)
    myForm.set('password',password)
    myForm.set('avatar',avatar)
    console.log(myForm.entries());
    for(let pair of myForm.entries()){
        console.log(pair)
    }
    dispatch(register(myForm))
  }

   useEffect(() => {
      if(error){
        toast.error(error,{position:'top-center',autoClose:5000});
        dispatch(removeErrors())
      }
    }, [dispatch,error])

     useEffect(() => {
      if(success){
        toast.success("Registration successfull",{position:'top-center',autoClose:5000});
        dispatch(removeSuccess())
        navigate('/login')
      }
    }, [dispatch,success])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <Navbar></Navbar>
      <div className="max-w-md w-full space-y-8 bg-[#111] p-8 rounded-lg border border-[#6D1A36] shadow-2xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#D4AF37] tracking-widest uppercase">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Join our exclusive collection
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={registerSubmit} encType='multipart/form-data'>
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={registerDataChange}
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-black text-white rounded-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] placeholder-gray-500 transition duration-200"
                placeholder="Full Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={registerDataChange}
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-black text-white rounded-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] placeholder-gray-500 transition duration-200"
                placeholder="Email Address"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={registerDataChange}
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-black text-white rounded-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] placeholder-gray-500 transition duration-200"
                placeholder="Password"
              />
            </div>

            {/* Avatar Selection */}
            <div className="flex items-center space-x-4 py-2">
              <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden border border-[#D4AF37]">
                <img 
                  src={avatarPreview}
                  alt="Avatar Preview" 
                  className="h-full w-full object-cover"
                />
              </div>
              <label className="flex-grow">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#6D1A36] file:text-white
                    hover:file:bg-[#D4AF37] hover:file:text-black
                    transition-all cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-[#D4AF37] hover:bg-[#b8962d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition duration-300 uppercase tracking-widest"
            >
             {loading?'SigningUp...!':' Sign Up'}
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#D4AF37] hover:text-white transition duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register