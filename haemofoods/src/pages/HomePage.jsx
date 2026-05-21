// landing page with app description and call to action
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center pt-16 pb-12">
      <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">
        Know your iron.
      </h1>
      <p className="text-lg text-stone-500 max-w-md mb-8">
        Check any food for iron content and get a clear safety rating 
        — built for haemochromatosis patients and caregivers.
      </p>
      <Link
        to="/search"
        className="bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
      >
        Search a food
      </Link>
    </div>
  )
}