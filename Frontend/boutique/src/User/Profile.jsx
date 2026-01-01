import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar';
import Loader from '../components/Loader'
function Profile() {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const navigate=useNavigate()
    console.log(user)
    useEffect(()=>{
        if(isAuthenticated==false)
            navigate('/login')
    },[isAuthenticated])
    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-10 md:gap-20">
            {/* Left Section - Avatar and Edit */}
            <PageTitle title={`${user?.name} Profile`}></PageTitle>
            <div className="flex flex-col items-center space-y-6">
                <h1 className="text-[#D4AF37] text-3xl font-bold tracking-[0.3em] uppercase md:hidden">My Profile</h1>
                
                <div className="w-64 h-64 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <img 
                        src={user?.avatar?.url} 
                        alt="User Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <Link 
                    to='/profile/update' 
                    className="bg-[#6D1A36] text-white px-10 py-3 rounded-md font-semibold tracking-widest hover:bg-[#8b2245] transition-all duration-300 uppercase text-sm"
                >
                    Edit Profile
                </Link>
            </div>

            {/* Right Section - User Details */}
            <div className="flex flex-col space-y-10 w-full max-w-md">
                <h1 className="hidden md:block text-[#D4AF37] text-4xl font-bold tracking-[0.3em] uppercase border-b border-[#6D1A36] pb-4">
                    My Profile
                </h1>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-[#D4AF37] text-xs uppercase tracking-widest opacity-60 mb-1">Full Name</h2>
                        <p className="text-xl font-medium tracking-wide">{user?.name}</p>
                    </div>

                    <div>
                        <h2 className="text-[#D4AF37] text-xs uppercase tracking-widest opacity-60 mb-1">Email Address</h2>
                        <p className="text-xl font-medium tracking-wide">{user?.email}</p>
                    </div>

                    <div>
                        <h2 className="text-[#D4AF37] text-xs uppercase tracking-widest opacity-60 mb-1">Joined On</h2>
                        <p className="text-xl font-medium tracking-wide">
                            {String(user?.createdAt).substring(0, 10)}
                        </p>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="flex flex-col gap-4 pt-6">
                    <Link 
                        to='/orders/user' 
                        className="bg-[#111] border border-[#D4AF37] text-[#D4AF37] py-3 text-center rounded-md font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase text-xs"
                    >
                        My Orders
                    </Link>
                    <Link 
                        to='/password/update' 
                        className="bg-[#111] border border-gray-700 text-gray-400 py-3 text-center rounded-md font-bold tracking-widest hover:border-[#D4AF37] hover:text-white transition-all duration-300 uppercase text-xs"
                    >
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile


