import { useEffect, useId, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { PaymentMethod } from '../types/payment-methods'
import { Product } from '../types/products'
import { useModalParametersStore } from '../store/modal-parameters'

interface Props {
	products: Product[]
	paymentMethods: PaymentMethod[]
}

function SellForm({ products, paymentMethods }: Props) {
	const {
		state: sellForm,
		setProductId,
		decreaseQuantity,
		increaseQuantity,
	} = useModalParametersStore()

	const defaultProductId = useId()

	const amountInputRef = useRef<HTMLInputElement>(null)

	// Loads the amount input with the current amount (default value)
	useEffect(() => {
		if (amountInputRef.current) {
			amountInputRef.current.value = sellForm.amount.toFixed(2)
		}
	}, [])

	/// Handlers
	const handleAmountBlur = () => {
		if (!amountInputRef.current) {
			return
		}

		// Format the amount to two decimal places
		amountInputRef.current.value = parseFloat(
			amountInputRef.current.value ?? '0'
		).toFixed(2)
	}

	const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setProductId(e.target.value)
	}

	/// Utils (if needed, replace with useCallback)
	const isProductIdUndefined = sellForm.productId === undefined

	const decreaseQuantityButtonDisabled =
		sellForm.quantity <= 1 || isProductIdUndefined

	const increaseQuantityButtonDisabled = isProductIdUndefined

	/// Testing
	const [testing] = useState(true)

	/// Render
	return (
		<Form>
			{/* Product */}
			<Form.Group
				className='mb-3'
				controlId='formBasicPassword'
			>
				<Form.Label className='mt-2'>Producto</Form.Label>
				<Form.Select
					aria-label='Default select example'
					defaultValue={defaultProductId}
					onChange={handleProductChange}
				>
					<option
						disabled
						value={defaultProductId}
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

			{/* Quantity */}
			<Form.Group
				className='mb-3'
				controlId='sellFormQuantity'
			>
				<Form.Label className='mt-2'>Cantidad</Form.Label>
				<InputGroup className='mb-3'>
					<Button
						variant={`${
							decreaseQuantityButtonDisabled
								? 'outline-secondary'
								: 'outline-danger'
						}`}
						disabled={decreaseQuantityButtonDisabled}
						onClick={() => {
							decreaseQuantity()
						}}
					>
						-
					</Button>
					<Form.Control
						type='text'
						className='text-center text-secondary'
						value={sellForm.quantity}
						readOnly
						disabled={isProductIdUndefined}
					></Form.Control>
					<Button
						variant={`${
							increaseQuantityButtonDisabled
								? 'outline-secondary'
								: 'outline-success'
						}`}
						disabled={increaseQuantityButtonDisabled}
						onClick={() => {
							increaseQuantity()
						}}
					>
						+
					</Button>
				</InputGroup>
			</Form.Group>

			{/* Amount */}
			<Form.Group
				className='mb-3'
				controlId='formBasicPassword'
			>
				<Form.Label className='mt-3'>Monto Total</Form.Label>
				<InputGroup className='mb-3'>
					<InputGroup.Text>S/</InputGroup.Text>
					<Form.Control
						style={{ textAlign: 'right' }}
						type='tel'
						onClick={() => amountInputRef.current?.select()}
						onBlur={handleAmountBlur}
						ref={amountInputRef}
					/>
				</InputGroup>
			</Form.Group>

			{/* Payment Method */}
			<Form.Group
				className='mb-3'
				controlId='formBasicPassword'
			>
				<Form.Label className='mt-3'>Método de Pago</Form.Label>
				<Form.Select
					aria-label='Default select example'
					// defaultValue={defaultPaymentMethodId}
					defaultValue={paymentMethods && paymentMethods[0].id}
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

			{/* Tracking Form State */}
			{testing && (
				<pre>
					{JSON.stringify(
						{
							productIdIsUndefined: sellForm.productId === undefined,
							sellForm,
						},
						null,
						2
					)}
				</pre>
			)}
		</Form>
	)
}

export default SellForm
