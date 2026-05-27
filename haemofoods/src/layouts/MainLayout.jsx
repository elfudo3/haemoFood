// main layout wrapper with navbar and footer shared across all pages
import { Link, Outlet, useLocation } from 'react-router-dom'
import ChatWidget from '../components/ui/ChatWidget'

export default function MainLayout() {

  //get the current URL path so we can highlight the active nav link
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      <nav className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-red-700">
            Haemo<span className="text-stone-800">Food</span>
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/search'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              Search
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md transition-colors
                ${location.pathname === '/about'
                  ? 'bg-red-100 text-stone-600'
                  : 'text-stone-600 hover:text-red-700'
                }`}
            >
              About
            </Link>
            
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8">
        {/* outlet renders whichever page matches the current route */}
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 px-6 py-4 text-center text-xs text-stone-400">
        HaemoFood — a dietary guide, not medical advice
      </footer>
      <ChatWidget />
    </div>
  )
}