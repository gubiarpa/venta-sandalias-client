import { useEffect, useId, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { PaymentMethod } from '../types/payment-methods'
import { Product } from '../types/products'
import { useModalParametersStore } from '../store/modal-parameters'
import { formatNumber } from '../utils/number'
import Tracking from './Tracking'

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

	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
	useEffect(() => {
		if (!sellForm.productId) {
			return setSelectedProduct(undefined)
		}

		const foundProduct = products.find(({ id }) => id === sellForm.productId)

		if (!foundProduct) {
			return setSelectedProduct(undefined)
		}

		setSelectedProduct(foundProduct)
	}, [sellForm.productId])

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
	const [testing] = useState(false)

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
				className={`mb-md-3 ${isProductIdUndefined ? 'mb-3' : 'mb-1'}`}
				controlId='formBasicPassword'
			>
				<Form.Label className='mt-3'>Monto Total</Form.Label>
				<InputGroup className='mb-1'>
					<InputGroup.Text>S/</InputGroup.Text>
					<Form.Control
						type='tel'
						ref={amountInputRef}
						className='text-end'
						disabled={isProductIdUndefined}
						onClick={() => amountInputRef.current?.select()}
						onBlur={handleAmountBlur}
					/>
				</InputGroup>
				{!isProductIdUndefined && (
					<div className={'text-end'}>
						<small className={'text-muted me-3'}>
							{selectedProduct?.price} x {sellForm.quantity} = S/{' '}
							{formatNumber(sellForm.quantity * selectedProduct?.price!)}
						</small>
					</div>
				)}
			</Form.Group>

			{/* Payment Method */}
			<Form.Group
				className='mb-3'
				controlId='formBasicPassword'
			>
				<Form.Label className='mt-3'>Método de Pago</Form.Label>
				<Form.Select
					aria-label='Default select example'
					disabled={isProductIdUndefined}
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
				<Tracking
					obj={{
						productIdIsUndefined: sellForm.productId === undefined,
						sellForm,
					}}
				/>
			)}
		</Form>
	)
}

export default SellForm
