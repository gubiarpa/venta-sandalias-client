import Modal from './components/Modal'
import Navbar from './components/Navbar'

export interface ToastDisplay {
	title: string
	message: string
}

function App() {
	return (
		<>
			<Navbar />
			<Modal
				title='Nueva venta'
				className='m-3'
			>
				<p>Nueva venta</p>
			</Modal>
		</>
	)
}

export default App
