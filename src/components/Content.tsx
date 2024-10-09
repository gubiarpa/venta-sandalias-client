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

import { ButtonListProps } from '../types/elements'
import { IoBagAddOutline, IoRefreshOutline } from 'react-icons/io5'
import OptionGroup from './OptionGroup'
import { useState } from 'react'
import { useWindowDimensionsStore } from '../store/window-dimensions'

function Content() {
	const [show, setShow] = useState(false)

	/// Queries
	const productsQuery = useProducts()
	const paymentMethodsQuery = usePaymentMethods()
	const sellsQuery = useSells({
		products: productsQuery.data!,
		paymentMethods: paymentMethodsQuery.data!,
	})

	/// Store
	const { state: sellForm, reset } = useModalParametersStore()
	const { isMobileWidth } = useWindowDimensionsStore()

	/// Flags
	const isLoading = sellsQuery.isLoading || productsQuery.isLoading || paymentMethodsQuery.isLoading
	const isError = sellsQuery.isError || productsQuery.isError || paymentMethodsQuery.isError
	const isMobile = isMobileWidth()

	const handleClose = () => {
		setShow(false)
		reset()
	}

	if (isLoading) return <Loader />
	if (isError) return <Error />

	const buttons: ButtonListProps[] = [
		{
			title: 'Nueva venta',
			variant: 'outline-primary',
			disabled: isLoading,
			children: (
				<>
					<IoBagAddOutline className={`mb-1 ${!isMobile && 'me-2'}`} />
					{!isMobile && 'Nueva venta'}
				</>
			),
			onClick: () => setShow(true),
		},
		{
			title: 'Recargar',
			variant: 'outline-secondary',
			disabled: isLoading,
			children: (
				<>
					<IoRefreshOutline className={`mb-1 ${!isMobile && 'me-2'}`} />
					{!isMobile && 'Actualizar'}
				</>
			),
			onClick: () => sellsQuery.refetch(),
		},
	]

	return (
		<>
			{/* List of Buttons */}
			<OptionGroup
				className={`d-flex ${isMobile ? 'justify-content-evenly' : 'justify-content-start gap-3'} my-3`}
				buttons={buttons}
			/>

			{/* Modal */}
			<Modal
				show={show}
				handleClose={handleClose}
				title='Nueva venta'
				className='my-3'
			>
				<SellForm
					products={productsQuery.data!}
					paymentMethods={paymentMethodsQuery.data!}
				/>
			</Modal>

			{/* Table of Sells */}
			<Table sells={sellsQuery.data!} />

			{/* 🍎 Tracking Form State (DEV only) */}
			{import.meta.env.VITE_TRACKING_SHOW === 'ENABLE' && import.meta.env.DEV && <Tracking obj={sellForm} />}
		</>
	)
}

export default Content
