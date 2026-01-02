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

            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full border border-[#76153C]/30 rounded-md p-8">
                    
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-black">
                            Password assistance
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Enter the email address associated with your account.
                        </p>
                    </div>

                    <form onSubmit={ForgotPasswordEmail} className="space-y-5">
                        
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded 
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8] 
                                           focus:border-[#67B2D8] text-sm"
                            />
                        </div>

                        {/* Submit */}
                        <button 
                            type="submit"
                            className="w-full py-2.5 bg-[#67B2D8] text-black text-sm font-semibold rounded
                                       hover:bg-[#BF124D] hover:text-white transition"
                        >
                            Continue
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 border-t border-[#76153C]/20"></div>

                    {/* Back */}
                    <div className="text-center">
                        <a
                            href="/login"
                            className="text-xs text-[#67B2D8] hover:underline"
                        >
                            Back to sign in
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ForgotPassword
