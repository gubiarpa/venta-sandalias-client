import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Table from './components/Table'
import SellForm from './components/SellForm'

import { useFetchSells } from './hooks/sells'
import { useFetchProducts } from './hooks/products'
import { useFetchPaymentMethods } from './hooks/payment-methods'

function App() {
	const { data: sells, isLoading: isLoadingSells } = useFetchSells()
	const { data: products, isLoading: isLoadingProducts } = useFetchProducts()
	const { data: paymentMethods, isLoading: isLoadingPaymentMethods } =
		useFetchPaymentMethods()

	const isLoading =
		isLoadingSells || isLoadingProducts || isLoadingPaymentMethods

	return (
		<>
			<Navbar />
			<Modal
				isLoading={isLoading}
				title='Nueva venta'
				className='m-3'
			>
				<SellForm
					products={products!}
					paymentMethods={paymentMethods!}
				/>
			</Modal>
			{isLoading ? <Loader /> : <Table sells={sells!} />}
		</>
	)
}

export default App
