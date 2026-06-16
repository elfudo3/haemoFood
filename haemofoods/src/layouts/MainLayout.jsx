//main layout wrapper with navbar and footer shared across all pages
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ChatWidget from '../components/ui/ChatWidget'

export default function MainLayout() {
  //get the current URL path so we can highlight the active nav link
  const location = useLocation()
  //boolean to track whether mobile hamburger menu is open or closed 
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  //auto close mobile menu whenever the user navigates to a new page
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname]) //dependency array - runs every time the URL path changes


  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      <nav className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">

          {/* left — logo */}
          <img
            src="/images/logos/HaemoFood_logo.png"
            alt="HaemoFood"
            className="h-8 w-auto translate-x-[-10px] translate-y-[-6px]" //h-8 = 32px tall, w-auto keeps aspect ratio
          />

          {/* centre — nav links */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`font-logo px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`font-logo px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/search'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Search
            </Link>
            <Link
              to="/learn"
              className={`font-logo px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/learn'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Learn
            </Link>
            <Link
              to="/diet-plan"
              className={`font-logo px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/diet-plan'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Diet Plan
            </Link>
            <Link
              to="/about"
              className={`font-logo px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/about'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              About
            </Link>
          </div>

          {/* hamburger button — visible on mobile only, hidden on md screens and up */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} //toggle open/closed
            className="md:hidden text-2xl text-stone-600 hover:text-red-700 transition-colors"
          >
            {isMenuOpen ? '✕' : '☰'} {/* show X when open, hamburger when closed */}
          </button>

          {/* right — GitHub link */}
          <a
            href="https://github.com/elfudo3/haemoFood"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <img
              src="/images/logos/github.png"
              alt="GitHub"
              className="w-4 h-4 invert"
            />
            GitHub
          </a>

        </div>

        {/* mobile dropdown menu — only renders when hamburger is tapped */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col border-t border-stone-100 px-4 py-2">
            <Link
              to="/"
              className={`py-3 border-b border-stone-100 text-sm font-medium transition-colors
        ${location.pathname === '/'
                  ? 'text-red-700'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`py-3 border-b border-stone-100 text-sm font-medium transition-colors
        ${location.pathname === '/search'
                  ? 'text-red-700'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Search
            </Link>
            <Link
              to="/learn"
              className={`py-3 border-b border-stone-100 text-sm font-medium transition-colors
        ${location.pathname === '/learn'
                  ? 'text-red-700'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Learn
            </Link>
            <Link
              to="/diet-plan"
              className={`py-3 border-b border-stone-100 text-sm font-medium transition-colors
        ${location.pathname === '/diet-plan'
                  ? 'text-red-700'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Diet Plan
            </Link>
            <Link
              to="/about"
              className={`py-3 border-b border-stone-100 text-sm font-medium transition-colors
        ${location.pathname === '/about'
                  ? 'text-red-700'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              About
            </Link>
            {/* github link at the bottom of mobile menu */}
            <a
              href="https://github.com/elfudo3/haemoFood"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors py-3"
            >
              <img
                src="/images/logos/github.png"
                alt="GitHub"
                className="w-4 h-4" //no invert here — dark icon on light background
              />
              GitHub
            </a>
          </div>
        )
        }



      </nav >

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8">
        {/* outlet renders whichever page matches the current route */}
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 px-6 py-4 text-center text-xs text-stone-400">
        HaemoFood — a dietary guide, not medical advice
      </footer>

      <ChatWidget />
    </div >
  )
}