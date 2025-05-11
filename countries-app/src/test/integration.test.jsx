import { render, screen, waitFor } from '@testing-library/react'
import Favorites from '../components/Favorites.jsx'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Mock axios
vi.mock('axios')

// Helper to wrap in router
function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Favorites Component - Integration Test', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('shows loading and then renders favorite countries', async () => {
    // First call: /api/getFav
    axios.get.mockResolvedValueOnce({
      data: { favourites: ['US', 'DE'] }
    })

    // Second call: restcountries.com
    axios.get.mockResolvedValueOnce({
      data: [
        {
          cca3: 'US',
          name: { common: 'United States' },
          flags: { svg: 'https://example.com/us.svg' },
          capital: ['Washington D.C.'],
          region: 'Americas',
          population: 331000000
        },
        {
          cca3: 'DE',
          name: { common: 'Germany' },
          flags: { svg: 'https://example.com/de.svg' },
          capital: ['Berlin'],
          region: 'Europe',
          population: 83000000
        }
      ]
    })

    renderWithRouter(<Favorites />)

    // ✅ Loading indicator appears first
    expect(screen.getByText(/loading favorites/i)).toBeInTheDocument()

    // ✅ Wait for both axios calls and content to appear
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument()
      expect(screen.getByText('Germany')).toBeInTheDocument()
    })

    // ✅ Check flag images
    expect(screen.getByAltText('United States')).toHaveAttribute('src', 'https://example.com/us.svg')
    expect(screen.getByAltText('Germany')).toHaveAttribute('src', 'https://example.com/de.svg')
  })

  it('renders fallback when no favorites are saved', async () => {
    // Simulate empty favorite list
    axios.get.mockResolvedValueOnce({ data: { favourites: [] } })

    renderWithRouter(<Favorites />)

    // ✅ Loading shows
    expect(screen.getByText(/loading favorites/i)).toBeInTheDocument()

    // ✅ Wait for fallback message
    await waitFor(() => {
      expect(screen.getByText(/no favorite countries saved/i)).toBeInTheDocument()
    })
  })

  it('handles fetch error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'))

    renderWithRouter(<Favorites />)

    // ✅ Still shows loading first
    expect(screen.getByText(/loading favorites/i)).toBeInTheDocument()

    // ✅ Eventually shows fallback
    await waitFor(() => {
      expect(screen.getByText(/no favorite countries saved/i)).toBeInTheDocument()
    })
  })
})
