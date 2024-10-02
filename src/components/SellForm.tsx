import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { PaymentMethod } from '../types/payment-methods'
import { Product } from '../types/products'
import Tracking from './Tracking'

interface Props {
	products: Product[]
	paymentMethods: PaymentMethod[]
}

function SellForm({ products, paymentMethods }: Props) {
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
				<Form.Select aria-label='Default select example'>
					<option disabled>Seleccione un producto</option>
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
					<Button>-</Button>
					<Form.Control
						type='text'
						className='text-center text-secondary'
						readOnly
					></Form.Control>
					<Button>+</Button>
				</InputGroup>
			</Form.Group>

			{/* Amount */}
			<Form.Group>
				<Form.Label className='mt-3'>Monto Total</Form.Label>
				<InputGroup className='mb-1'>
					<InputGroup.Text>S/</InputGroup.Text>
					<Form.Control
						type='tel'
						className='text-end'
					/>
				</InputGroup>
				<div className={'text-end'}>
					<small className={'text-muted me-3'}>
						{/* {selectedProduct?.price} x {sellForm.quantity} = S/{' '}
						{formatNumber(sellForm.quantity * selectedProduct?.price!)} */}
					</small>
				</div>
			</Form.Group>

			{/* Payment Method */}
			<Form.Group className='mb-3'>
				<Form.Label className='mt-3'>Método de Pago</Form.Label>
				<Form.Select
					aria-label='Default select example'
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
						gubiarpa: true,
					}}
				/>
			)}
		</Form>
	)
}

export default SellForm
