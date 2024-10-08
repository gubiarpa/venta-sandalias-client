import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './query-client.ts'

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools />
	</QueryClientProvider>
)
