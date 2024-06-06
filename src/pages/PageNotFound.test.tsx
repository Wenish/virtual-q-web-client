import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PageNotFound from './PageNotFound'

describe('PageNotFound Component', () => {
  it('should render the "404 Page Not Found" message', () => {
    render(<PageNotFound />)
    const notFoundElement = screen.getByText('404 Page Not Found')
    expect(notFoundElement).toBeInTheDocument()
  })
})
