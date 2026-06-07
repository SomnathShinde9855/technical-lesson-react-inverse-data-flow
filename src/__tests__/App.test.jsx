import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the header and default employee list', () => {
    render(<App />)

    expect(screen.getByText('Hog Barn')).toBeInTheDocument()
    // one of the sample hogs should be visible
    expect(screen.getByText('Porky')).toBeInTheDocument()
  })
})
