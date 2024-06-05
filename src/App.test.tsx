import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it } from 'vitest'
import App from './App'

describe('App Component', () => {
  it('should render component', () => {
    render(<App />)
  })
})
