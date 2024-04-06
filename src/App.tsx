import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TheRouter from './TheRouter'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TheRouter />
    </QueryClientProvider>
  )
}

export default App
