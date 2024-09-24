import { useEffect, useId, useRef } from 'react'
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
		decreaseQuantity,
		increaseQuantity,
		setAmount,
	} = useModalParametersStore()

	const defaultProductId = useId()

	const amountInputRef = useRef<HTMLInputElement>(null)

	// Loads the amount input with the current amount (default value)
	useEffect(() => {
		if (amountInputRef.current) {
			amountInputRef.current.value = sellForm.amount.toFixed(2)
		}
	}, [])

	const handleAmountBlur = () => {
		if (!amountInputRef.current) {
			return
		}

    // Format the amount to two decimal places
		amountInputRef.current.value = parseFloat(
			amountInputRef.current.value ?? '0'
		).toFixed(2)
	}

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

			{/* Cantidad */}
			<Form.Group
				className='mb-3'
				controlId='sellFormQuantity'
			>
				<Form.Label className='mt-2'>Cantidad</Form.Label>
				<InputGroup className='mb-3'>
					<Button
						variant={`${
							sellForm.quantity <= 1 ? 'outline-secondary' : 'outline-danger'
						}`}
						disabled={sellForm.quantity <= 1}
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
					></Form.Control>
					<Button
						variant='outline-success'
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
		</Form>
	)
}

export default SellForm
