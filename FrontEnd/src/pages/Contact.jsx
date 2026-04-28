const Contact = () => {
  return (
    <div className="min-h-screen w-[min(1280px,94%)] mx-auto rounded-lg py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left – Contact form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-emerald-400 mb-3">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                <input
                  type="text"
                  className="block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none transition p-3 text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  className="block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none transition p-3 text-sm"
                  placeholder="Inquiry Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                <textarea
                  rows="5"
                  className="block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none transition p-3 text-sm resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-linear-to-r from-cyan-600 to-cyan-500 shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Right – Direct links */}
          <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 text-white">Reach Out Directly</h3>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                Prefer to bypass the form? Reach out via email or connect on LinkedIn. I'm always open to new opportunities.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto: mohamedferoz2023@gmail.com"
                  className="group flex flex-col items-center justify-center w-full px-6 py-6 border border-white/10 rounded-xl bg-white/5 transition hover:bg-white/10 hover:-translate-y-1"
                >
                  <div className="bg-red-500/20 p-4 rounded-full mb-3 group-hover:bg-red-500/30 transition-colors">
                    <i className="fa-solid fa-envelope text-red-400 text-3xl"></i>
                  </div>
                  <span className="text-base font-medium text-white group-hover:text-red-300 transition-colors">Write an Email</span>
                </a>

                <a
                  href="https://linkedin.com/in/mohdferoz8624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center w-full px-6 py-6 border border-white/10 rounded-xl bg-white/5 transition hover:bg-white/10 hover:-translate-y-1"
                >
                  <div className="bg-[#0a66c2]/20 p-4 rounded-full mb-3 group-hover:bg-[#0a66c2]/30 transition-colors">
                    <i className="fa-brands fa-linkedin-in text-[#0a66c2] text-3xl"></i>
                  </div>
                  <span className="text-base font-medium text-white group-hover:text-[#0a66c2] transition-colors">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
