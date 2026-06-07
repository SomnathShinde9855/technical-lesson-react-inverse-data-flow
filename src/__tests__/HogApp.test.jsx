import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../components/App'
import hogs from '../porkers_data'

describe('Hog App full features', () => {
  it('renders a tile for each hog on load', () => {
    render(<App />)
    const cards = screen.getAllByLabelText('hog card')
    expect(cards.length).toBe(hogs.length)
  })

  it('displays additional hog details when a tile is clicked', () => {
    render(<App />)
    const firstCard = screen.getAllByLabelText('hog card')[0]
    const name = within(firstCard).getByRole('heading', { level: 3 }).textContent
    const hog = hogs.find(h => h.name === name)
    fireEvent.click(firstCard)
    expect(screen.getByText(new RegExp(hog.specialty, 'i'))).toBeInTheDocument()
  })

  it('filters hogs by greased status', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText(/Greased only/i))
    const greased = hogs.filter(h => h.greased)
    const cards = screen.getAllByLabelText('hog card')
    expect(cards.length).toBe(greased.length)
  })

  it('sorts hogs by name or weight', () => {
    render(<App />)
    // sort by name
    fireEvent.change(screen.getByLabelText(/Sort by/i), { target: { value: 'name' } })
    const namesByName = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent)
    const expectedByName = [...hogs].sort((a, b) => a.name.localeCompare(b.name)).map(h => h.name)
    expect(namesByName).toEqual(expectedByName)

    // sort by weight
    fireEvent.change(screen.getByLabelText(/Sort by/i), { target: { value: 'weight' } })
    const namesByWeight = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent)
    const expectedByWeight = [...hogs].sort((a, b) => a.weight - b.weight).map(h => h.name)
    expect(namesByWeight).toEqual(expectedByWeight)
  })

  it('hides a hog when the hide button is clicked', () => {
    render(<App />)
    const cardsBefore = screen.getAllByLabelText('hog card')
    const firstCard = cardsBefore[0]
    const hideBtn = within(firstCard).getByRole('button', { name: /hide me/i })
    fireEvent.click(hideBtn)
    const cardsAfter = screen.queryAllByLabelText('hog card')
    expect(cardsAfter.length).toBe(cardsBefore.length - 1)
  })

  it('adds a new hog via the form', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Hog' } })
    fireEvent.change(screen.getByLabelText(/Specialty/i), { target: { value: 'Testing' } })
    fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: '42' } })
    fireEvent.click(screen.getByLabelText('Greased'))
    fireEvent.change(screen.getByLabelText(/Highest Medal/i), { target: { value: 'bronze' } })
    fireEvent.click(screen.getByRole('button', { name: /add hog/i }))
    expect(screen.getByText('Test Hog')).toBeInTheDocument()
  })

  it('renders hog tiles using Semantic Cards (aria-label present)', () => {
    render(<App />)
    const cards = screen.getAllByLabelText('hog card')
    expect(cards.length).toBeGreaterThan(0)
  })
})
