'use client'


import { PropsWithChildren, useEffect, useState } from 'react'
import {Provider} from "react-redux";
import { setupStore } from '@/storage';

const store = setupStore()

export function Providers({ children }: PropsWithChildren) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}
