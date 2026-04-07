import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen w-[min(1280px,94%)] mx-auto  bg-gradient-to-br from-gray-900 rounded-lg via-gray-800 to-black text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Contact Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-8">
              Fill out the form below to send me a message and I'll get back to you as soon as possible.
            </p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-2 block w-full rounded-lg bg-gray-900/50 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all p-3"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="mt-2 block w-full rounded-lg bg-gray-900/50 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all p-3"
                  placeholder="Inquiry Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="mt-2 block w-full rounded-lg bg-gray-900/50 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all p-3 resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 rounded-lg text-sm font-semibold text-white  bg-blue-500 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side: Direct Links */}
          <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-white">Reach Out Directly</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Prefer to bypass the form? Reach out directly via email or connect with me on LinkedIn. I'm always open to discussing new opportunities.
              </p>
              
              <div className="space-y-5">
                <a
                  href="mailto:mohamedferoz2023@example.com"
                  className="group flex flex-col items-center justify-center w-full px-6 py-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300  hover:-translate-y-1"
                >
                  <div className="bg-red-500/20 p-4 rounded-full mb-3 group-hover:bg-red-500/30 transition-colors">
                    <i className="fa-solid fa-envelope text-red-400 text-3xl"></i>
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-red-300 transition-colors">Write an Email</span>
                </a>
                
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center w-full px-6 py-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300  hover:-translate-y-1"
                >
                  <div className="bg-[#0a66c2]/20 p-4 rounded-full mb-3 group-hover:bg-[#0a66c2]/30 transition-colors">
                    <i className="fa-brands fa-linkedin-in text-[#0a66c2] text-3xl"></i>
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-[#0a66c2] transition-colors">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Contact
