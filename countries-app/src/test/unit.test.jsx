import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Signup from '../components/Signup.jsx'
import axios from 'axios'

// ✅ Mock useNavigate
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

// ✅ Mock axios
vi.mock('axios')

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Signup Component - Unit Tests', () => {
  beforeEach(() => {
    axios.post.mockReset()
    mockedNavigate.mockReset()
  })

  it('renders inputs and button', () => {
    renderWithRouter(<Signup />)

    // 🧪 Check form structure
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('updates form state on input change', () => {
    renderWithRouter(<Signup />)

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)

    // 🧪 Simulate typing
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'secret' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('secret')
  })

  it('calls axios.post and navigates on successful submit', async () => {
    axios.post.mockResolvedValueOnce({ data: {} })

    renderWithRouter(<Signup />)

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com', name: 'email' },
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123', name: 'password' },
    })

    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/signup',
        { email: 'test@example.com', password: 'password123' },
        { withCredentials: true }
      )
      expect(mockedNavigate).toHaveBeenCalledWith('/login')
    })
  })

  it('sets error message on API failure', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: { error: 'Email already exists' },
      },
    })

    renderWithRouter(<Signup />)

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com', name: 'email' },
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123', name: 'password' },
    })

    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    })
  })
})
