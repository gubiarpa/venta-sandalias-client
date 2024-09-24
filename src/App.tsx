import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Table from './components/Table'

import { useFetchSells } from './hooks/sells'

export interface ToastDisplay {
	title: string
	message: string
}

function App() {
	const { data: sells, isLoading: isLoadingSells } = useFetchSells()

	return (
		<>
			<Navbar />
			<Modal
				title='Nueva venta'
				className='m-3'
			>
				<p>Nueva venta</p>
			</Modal>
			{isLoadingSells ? <Loader /> : <Table sells={sells!} />}
		</>
	)
}

export default App
