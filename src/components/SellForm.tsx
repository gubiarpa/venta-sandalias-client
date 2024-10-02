import { useEffect, useId, useRef } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

import { PaymentMethod } from '../types/payment-methods'
import { Product } from '../types/products'
import { useModalParametersStore } from '../store/modal-parameters'
import { formatNumber, isNumber } from '../utils/number'

interface Props {
	products: Product[]
	paymentMethods: PaymentMethod[]
}

function SellForm({ products, paymentMethods }: Props) {
	/// ⚓ Store
	const {
		state: sellForm,
		setProductId,
		decreaseQuantity,
		increaseQuantity,
		setAmount,
		setPaymentMethodId,
		setAmountCalcDetail,
	} = useModalParametersStore()

	/// ⚓ Flags
	const isProductIdUndefined = sellForm.productId === undefined

	/// ⚓ State
	const defaultProductId = useId()
	const amountRef = useRef<HTMLInputElement>(null)

	/// ⚓ Handlers
	const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const productId = e.target.value
		setProductId(productId)
	}

	const handleDecreaseQuantity = () => {
		decreaseQuantity()
	}

	const handleIncreaseQuantity = () => {
		increaseQuantity()
	}

	const handleAmountClick = () => {
		amountRef.current?.select()
	}

	const handleAmountBlur = () => {
		if (!amountRef.current) {
			return
		}

		if (!isNumber(amountRef.current.value)) {
			// amountRef.current.value = sellForm.amount
			return
		}

		// Format the amount to two decimal places
		const formattedAmount = parseFloat(amountRef.current.value).toFixed(2)
		setAmount(formattedAmount)
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value)
	}

	const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const paymentMethodId = e.target.value
		setPaymentMethodId(paymentMethodId)
	}

	/// ⚓ Effects
	useEffect(() => {
		paymentMethods && setPaymentMethodId(paymentMethods[0].id)
	}, [])

	useEffect(() => {
		if (isProductIdUndefined) return

		// Amount Calculation Details
		const selectedProduct = products.find((product) => product.id === sellForm.productId)
		const formattedAmount = formatNumber(selectedProduct?.price! * sellForm.quantity)
		const message = `S/ ${selectedProduct?.price} x ${sellForm.quantity} = S/ ${formattedAmount}`

		setAmount(formattedAmount)
		setAmountCalcDetail(message)
	}, [sellForm.productId, sellForm.quantity])

	/// ⚓ Render
	return (
		<Form>
			{/* 🍎 Product */}
			<Form.Group
				className='mb-3'
				controlId='sellFormProduct'
			>
				<Form.Label className='mt-2'>Producto</Form.Label>
				<Form.Select
					defaultValue={defaultProductId}
					onChange={handleProductChange}
				>
					<option
						value={defaultProductId}
						disabled
					>
						Seleccione un producto
					</option>
					{products.map(({ id, name, price }) => (
						<option
							key={id}
							value={id}
						>
							{name} {price && `(S/ ${price.toFixed(2)})`}
						</option>
					))}
				</Form.Select>
			</Form.Group>

			{/* 🍎 Quantity */}
			<Form.Group
				className='mb-3'
				controlId='sellFormQuantity'
			>
				<Form.Label className='mt-2'>Cantidad</Form.Label>
				<InputGroup className='mb-3'>
					<Button
						onClick={handleDecreaseQuantity}
						disabled={isProductIdUndefined || sellForm.quantity <= 1}
						variant={`${isProductIdUndefined || sellForm.quantity <= 1 ? 'outline-secondary' : 'primary'}`}
					>
						-
					</Button>
					<Form.Control
						type='text'
						value={sellForm.quantity}
						className={`text-center ${sellForm.productId !== undefined ? 'background-white' : ''}`}
						disabled
					></Form.Control>
					<Button
						onClick={handleIncreaseQuantity}
						disabled={sellForm.productId === undefined}
						variant={`${sellForm.productId === undefined ? 'outline-secondary' : 'primary'}`}
					>
						+
					</Button>
				</InputGroup>
			</Form.Group>

			{/* 🍎 Amount */}
			<Form.Group className={`mb-md-3 ${isProductIdUndefined ? 'mb-3' : 'mb-1'}`}>
				<Form.Label className='mt-3'>Monto Total</Form.Label>
				<InputGroup className='mb-1'>
					<InputGroup.Text>S/</InputGroup.Text>
					<Form.Control
						type='tel'
						className='text-end'
						ref={amountRef}
						disabled={isProductIdUndefined}
						value={sellForm.amount}
						onClick={handleAmountClick}
						onBlur={handleAmountBlur}
						onChange={handleAmountChange}
					/>
				</InputGroup>
				{!isProductIdUndefined && (
					<div className={'text-end'}>
						<small className={'text-muted me-3'}>{sellForm.amountCalcDetail}</small>
					</div>
				)}
			</Form.Group>

			{/* 🍎 Payment Method */}
			<Form.Group className='mb-3'>
				<Form.Label className='mt-3'>Método de Pago</Form.Label>
				<Form.Select
					disabled={isProductIdUndefined}
					defaultValue={paymentMethods && paymentMethods[0].id}
					onChange={handlePaymentMethodChange}
				>
					{paymentMethods.map(({ id, name }) => (
						<option
							key={id}
							value={id}
						>
							{name}
						</option>
					))}
				</Form.Select>
			</Form.Group>
		</Form>
	)
}

export default SellForm
