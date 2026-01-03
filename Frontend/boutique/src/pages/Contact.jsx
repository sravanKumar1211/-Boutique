import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Phone, 
  Mail, 
  LocationOn, 
  GitHub, 
  LinkedIn, 
  Code,
  AutoAwesome
} from '@mui/icons-material'

function Contact() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen font-sans flex flex-col">
      <PageTitle title="Contact Us | Exclusive Collection" />
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-4xl w-full">
          
          {/* Main Info Card */}
          <div className="bg-white border border-gray-200 shadow-xl rounded-sm overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Side: Branding/Intro */}
            <div className="bg-[#5A0E24] text-white p-8 md:p-12 md:w-2/5 flex flex-col justify-center">
              <div className="mb-6 text-[#67B2D8]">
                <AutoAwesome fontSize="large" />
              </div>
              <h1 className="text-3xl font-bold leading-tight mb-4">
                Let's Build Your <br />
                <span className="text-[#BF124D]">Dream Look</span>
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                Specializing in customized Indian wear, from intricate embroidery to modern boutique silhouettes. Reach out for collaborations or custom orders.
              </p>
            </div>

            {/* Right Side: Details */}
            <div className="p-8 md:p-12 md:w-3/5 space-y-10">
              
              {/* Contact Details */}
              <div className="space-y-6">
                <h2 className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.3em] mb-4">
                  Communication
                </h2>
                
                <div className="flex items-center gap-5 group">
                  <div className="w-11 h-11 rounded-full bg-[#f3f3f3] text-[#5A0E24] flex items-center justify-center group-hover:bg-[#67B2D8] group-hover:text-white transition-all">
                    <Phone fontSize="small" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Call Directly</p>
                    <p className="text-base font-semibold text-[#111]">+91 7032376748</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-11 h-11 rounded-full bg-[#f3f3f3] text-[#5A0E24] flex items-center justify-center group-hover:bg-[#67B2D8] group-hover:text-white transition-all">
                    <Mail fontSize="small" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Email Inquiry</p>
                    <p className="text-base font-semibold text-[#111] break-words">sravankumargaddamedhi@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-11 h-11 rounded-full bg-[#f3f3f3] text-[#5A0E24] flex items-center justify-center group-hover:bg-[#67B2D8] group-hover:text-white transition-all">
                    <LocationOn fontSize="small" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Location</p>
                    <p className="text-base font-semibold text-[#111]">Hyderabad, Telangana, India</p>
                  </div>
                </div>
              </div>

              {/* Digital Presence */}
              <div className="pt-8 border-t border-gray-100">
                <h2 className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.3em] mb-6">
                  Professional Profiles
                </h2>
                <div className="flex gap-4">
                  <a href="https://github.com/sravanKumar1211" target="_blank" rel="noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-sm text-gray-600 hover:border-[#67B2D8] hover:text-[#67B2D8] transition-all">
                    <GitHub fontSize="small" />
                    <span className="text-[10px] font-bold uppercase">GitHub</span>
                  </a>
                  <a href="https://leetcode.com/u/sravan12111999/" target="_blank" rel="noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-sm text-gray-600 hover:border-[#BF124D] hover:text-[#BF124D] transition-all">
                    <Code fontSize="small" />
                    <span className="text-[10px] font-bold uppercase">LeetCode</span>
                  </a>
                  <a href="https://linkedin.com/in/sravan-kumar-gaddamedhi-89976019a" target="_blank" rel="noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-sm text-gray-600 hover:border-[#0077b5] hover:text-[#0077b5] transition-all">
                    <LinkedIn fontSize="small" />
                    <span className="text-[10px] font-bold uppercase">LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Contact
