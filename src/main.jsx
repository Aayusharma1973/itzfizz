import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HeroSection from './HeroSection'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroSection />
  </StrictMode>
)