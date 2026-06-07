import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import EmployeeForm from '../components/EmployeeForm'

describe('EmployeeForm', () => {
  it('calls setEmployees with a new employee when password is admin', () => {
    const mockSetEmployees = vi.fn()
    render(<EmployeeForm employees={[]} setEmployees={mockSetEmployees} />)

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Taylor' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Swift' },
    })
    fireEvent.change(screen.getByPlaceholderText('Role Name'), {
      target: { value: 'Singer' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'admin' },
    })

    fireEvent.click(screen.getByRole('button', { name: /add employee/i }))

    expect(mockSetEmployees).toHaveBeenCalledTimes(1)
    const newEmployees = mockSetEmployees.mock.calls[0][0]
    expect(newEmployees).toHaveLength(1)
    expect(newEmployees[0]).toEqual(
      expect.objectContaining({
        firstName: 'Taylor',
        lastName: 'Swift',
        role: 'Singer',
      })
    )
  })

  it('does not call setEmployees when password is invalid', () => {
    const mockSetEmployees = vi.fn()
    render(<EmployeeForm employees={[]} setEmployees={mockSetEmployees} />)

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Taylor' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Swift' },
    })
    fireEvent.change(screen.getByPlaceholderText('Role Name'), {
      target: { value: 'Singer' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrong' },
    })

    fireEvent.click(screen.getByRole('button', { name: /add employee/i }))

    expect(mockSetEmployees).not.toHaveBeenCalled()
  })
})
