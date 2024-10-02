import Modal from './Modal'
import SellForm from './SellForm'

import { usePaymentMethods } from '../hooks/payment-methods'
import { useProducts } from '../hooks/products'
import { useSells } from '../hooks/sells'

import { useModalParametersStore } from '../store/modal-parameters'

import Table from './Table'
import Loader from './Loader'
import Error from './Error'
import Tracking from './Tracking'

function Content() {
	const productsQuery = useProducts()
	const paymentMethodsQuery = usePaymentMethods()
	const sellsQuery = useSells({
		products: productsQuery.data!,
		paymentMethods: paymentMethodsQuery.data!,
	})
	const { state: sellForm } = useModalParametersStore()

	const isLoading =
		sellsQuery.isLoading ||
		productsQuery.isLoading ||
		paymentMethodsQuery.isLoading

	const isError =
		sellsQuery.isError || productsQuery.isError || paymentMethodsQuery.isError

	if (isLoading) return <Loader />
	if (isError) return <Error />

	return (
		<>
			<Modal
				title='Nueva venta'
				className='m-3'
			>
				<SellForm
					products={productsQuery.data!}
					paymentMethods={paymentMethodsQuery.data!}
				/>
			</Modal>
			<Table sells={sellsQuery.data!} />

			{/* Tracking Form State (DEV only) */}
			{import.meta.env.VITE_TRACKING_SHOW === 'ENABLE' &&
				import.meta.env.DEV && <Tracking obj={sellForm} />}
		</>
	)
}

export default Content
