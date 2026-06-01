// root component — sets up routing for all pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import FoodDetailPage from './pages/FoodDetailPage'
import LearnPage from './pages/LearnPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/food/:code" element={<FoodDetailPage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}