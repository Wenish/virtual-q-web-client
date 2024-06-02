import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TheRouter from './TheRouter'
import AuthProvider from './components/AuthProvider'

const queryClient = new QueryClient()

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TheRouter />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
