import Navbar from './components/Navbar'
import Test from './components/Test'

/// <testing>
import { useState } from 'react'
/// </testing>

function App() {
	/// <testing>
	const [show, setShow] = useState(false)
	/// </testing>

	return (
		<>
			<Navbar />
			{/* <testing> */}
			<button
				className='btn btn-outline-primary my-3 ms-3'
				onClick={() => setShow(!show)}
			>
				{show ? 'Hide' : 'Show'}
			</button>
			{show && <Test />}
			{/* </testing> */}
		</>
	)
}

export default App
