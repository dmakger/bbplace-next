'use client'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren, useEffect, useState } from 'react'
import {Provider} from "react-redux";
import { setupStore } from '@/storage';

const store = setupStore()

export function Providers({ children }: PropsWithChildren) {
	// tanstack
	// const [client] = useState(
	// 	new QueryClient({
	// 		defaultOptions: {
	// 			queries: {
	// 				refetchOnWindowFocus: false
	// 			}
	// 		}
	// 	})
	// )

	return (
		<Provider store={store}>
			{/* <QueryClientProvider client={client}> */}
				{children}
				{/* <ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider> */}
		</Provider>
	)
}
