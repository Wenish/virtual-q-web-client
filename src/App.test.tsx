import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App Component', () => {
  it('should render component', () => {
    render(<App />)
  })

  it('should render the header element', () => {
    render(<App />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })

  it('should render the main content area', () => {
    render(<App />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(<App />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
  })
})
