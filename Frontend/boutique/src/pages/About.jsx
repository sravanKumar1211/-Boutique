import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DesignServices, AutoAwesome, Checkroom, MilitaryTech } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen font-sans">
      <PageTitle title="About Us | Exclusive Collection" />
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#5A0E24] py-16 sm:py-24 px-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          Crafting <span className="text-[#67B2D8]">Elegance</span>, Defining Style
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          At Exclusive Collection, we don't just sell clothes; we weave stories of heritage 
          and modern sophistication into every stitch.
        </p>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24 space-y-24">
        
        {/* Section 1: Best Designer */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 text-[#BF124D]">
              <MilitaryTech />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">The Gold Standard</span>
            </div>
            <h2 className="text-3xl font-bold text-[#5A0E24]">India's Best Designer <br/> <span className="text-[#BF124D]">Couture</span></h2>
            <p className="text-gray-600 leading-relaxed">
              Recognized for our visionary approach to fashion, our design house led by award-winning artisans 
              brings a unique blend of contemporary silhouettes and traditional roots. Every piece is a 
              masterpiece, curated to make you stand out in any crowd.
            </p>
          </div>
          <div className="flex-1 w-full h-80 bg-gray-200 rounded-sm overflow-hidden shadow-xl border-b-4 border-[#67B2D8]">
             <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" alt="Designer at work" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Section 2: Embroidery (Reversed for Desktop) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 text-[#BF124D]">
              <AutoAwesome />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Artisan Craft</span>
            </div>
            <h2 className="text-3xl font-bold text-[#5A0E24]">Exquisite <span className="text-[#BF124D]">Embroidery</span></h2>
            <p className="text-gray-600 leading-relaxed">
              Our signature embroidery is where magic happens. From intricate Zardosi to delicate 
              threadwork, our craftsmen spend hundreds of hours perfecting the details that define 
              the luxury of Indian ethnic wear.
            </p>
          </div>
          <div className="flex-1 w-full h-80 bg-gray-200 rounded-sm overflow-hidden shadow-xl border-b-4 border-[#BF124D]">
             <img src="https://images.unsplash.com/photo-1712255830188-9c4e38b2600d?q=80&w=1163&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Embroidery detail" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Section 3: Customised Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
          <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm hover:border-[#67B2D8] transition-colors group text-center">
             <div className="w-12 h-12 bg-[#5A0E24] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#67B2D8]">
                <DesignServices fontSize="small" />
             </div>
             <h3 className="font-bold text-[#5A0E24] mb-3">Customised Tailoring</h3>
             <p className="text-sm text-gray-500">Made-to-measure services to ensure the perfect fit for your unique body type.</p>
          </div>

          <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm hover:border-[#67B2D8] transition-colors group text-center">
             <div className="w-12 h-12 bg-[#5A0E24] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#67B2D8]">
                <Checkroom fontSize="small" />
             </div>
             <h3 className="font-bold text-[#5A0E24] mb-3">Indian Style Icon</h3>
             <p className="text-sm text-gray-500">Traditional Indian costumes reimagined for the modern, global woman.</p>
          </div>

          <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm hover:border-[#67B2D8] transition-colors group text-center">
             <div className="w-12 h-12 bg-[#5A0E24] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#67B2D8]">
                <AutoAwesome fontSize="small" />
             </div>
             <h3 className="font-bold text-[#5A0E24] mb-3">Trusted Sellers</h3>
             <p className="text-sm text-gray-500">Direct from our boutique to your doorstep with guaranteed authenticity.</p>
          </div>
        </div>

      </main>

      {/* Call to Action */}
      <section className="bg-white py-20 px-6 text-center border-t border-gray-100">
        <h2 className="text-2xl font-bold text-[#5A0E24] mb-6">Ready to wear your dream outfit?</h2>
        <Link to='/products'>
        <button className="bg-[#BF124D] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#5A0E24] transition-all shadow-lg">
          Explore Collection
        </button>
        </Link>
      </section>

      <Footer />
    </div>
  )
}

export default About
