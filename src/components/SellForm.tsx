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
	} = useModalParametersStore()

	return (
		<Form>
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
				<Form.Label className='mt-3'>Monto de Venta</Form.Label>
				<InputGroup className='mb-3'>
					<InputGroup.Text>S/</InputGroup.Text>
					<Form.Control
						aria-label='Amount (to the nearest dollar)'
						style={{ textAlign: 'right' }}
						type='tel'
						value={sellForm.amount ?? ''}
					/>
				</InputGroup>
			</Form.Group>
		</Form>
	)
}

export default SellForm
