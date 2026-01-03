import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { register, removeErrors, removeSuccess } from '../features/user/userSlice'
import Navbar from '../components/Navbar'

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = user
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('./image')
  const { success, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }


const registerSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    toast.error('Please fill in name, email, and password');
    return;
  }

  const myData = {
    name,
    email,
    password,
    // If avatar is the default preview string, send an empty string instead
    avatar: (avatar && avatar.startsWith("data:image")) ? avatar : ""
  };

  dispatch(register(myData));
};

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 5000 })
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  useEffect(() => {
    if (success) {
      toast.success("Registration successful", { position: 'top-center', autoClose: 5000 })
      dispatch(removeSuccess())
      navigate('/login')
    }
  }, [dispatch, success])

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full border border-[#76153C]/30 rounded-md p-6">

          {/* Header */}
          <h2 className="text-xl font-semibold text-black mb-1">
            Create account
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            New to our store? Create your account
          </p>

          <form
            className="space-y-4"
            onSubmit={registerSubmit}
            encType="multipart/form-data"
          >

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={registerDataChange}
                required
                placeholder="First and last name"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                           focus:border-[#67B2D8]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={registerDataChange}
                required
                placeholder="Email address"
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
                name="password"
                value={password}
                onChange={registerDataChange}
                required
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                           focus:border-[#67B2D8]"
              />
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#76153C]/30">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                className="text-xs text-gray-600
                           file:mr-4 file:py-1.5 file:px-3
                           file:rounded file:border-0
                           file:text-xs file:font-semibold
                           file:bg-[#67B2D8] file:text-black
                           hover:file:bg-[#BF124D] hover:file:text-white
                           cursor-pointer transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-[#67B2D8] text-black text-sm font-semibold rounded
                         hover:bg-[#BF124D] hover:text-white transition"
            >
              {loading ? 'Creating account…' : 'Create your account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-[#76153C]/20"></div>

          {/* Login */}
          <p className="text-xs text-center text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#67B2D8] hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
