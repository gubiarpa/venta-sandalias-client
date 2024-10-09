import { useEffect } from 'react'

import { useWindowDimensionsStore } from './store/window-dimensions'

import Navbar from './components/Navbar'
import Content from './components/Content'

function App() {
	const { subscribe } = useWindowDimensionsStore()

	useEffect(subscribe, [])

	return (
		<>
			<Navbar />
			<Content />
		</>
	)
}

export default App
