
import React, { useState, useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice'

function ForgotPassword() {
    const { error, message } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")

    const ForgotPasswordEmail = (e) => {
        e.preventDefault()
        
        const myForm = new FormData()
        myForm.set('email', email)
        
        dispatch(forgotPassword(myForm))
        setEmail('')
    }

    useEffect(() => {
        if (error) {
            toast.error(error.message || error)
            dispatch(removeErrors())
        }
        if (message) {
            toast.success(message)
            dispatch(removeSuccess())
        }
    }, [dispatch, error, message])

    return (
        <>
            <PageTitle title='Forgot Password' />
            <Navbar />

            <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-[#111] p-8 rounded-lg border border-[#6D1A36] shadow-2xl">
                    
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#D4AF37] tracking-widest uppercase">
                            Recover Password
                        </h2>
                        <div className="h-1 w-20 bg-[#6D1A36] mx-auto mt-2"></div>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-6">
                            Enter your registered email below
                        </p>
                    </div>

                    <form onSubmit={ForgotPasswordEmail} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">
                                Registered Email
                            </label>
                            <input 
                                type="email" 
                                placeholder='Enter your Registered Email' 
                                required
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300 placeholder:text-gray-700"
                            />
                        </div>

                        {/* Submit Button - Loading checks removed */}
                        <button 
                            type="submit"
                            className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded hover:bg-[#b8962d] transition duration-300 shadow-lg shadow-[#D4AF37]/10 active:scale-95"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="/login" className="text-gray-400 hover:text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] transition duration-300">
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ForgotPassword
