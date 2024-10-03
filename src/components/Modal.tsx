import { ReactNode, useState } from 'react'
import { Button, Container, Modal as ModalBs } from 'react-bootstrap'
import { IoBagAddOutline, IoCartSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { useCreateSell } from '../hooks/sells'
import { useModalParametersStore } from '../store/modal-parameters'
import { SellRequest } from '../types/sell'

interface Props {
	title: string
	className?: string
	children: ReactNode
}

function Modal({ title, className, children }: Props) {
	const [show, setShow] = useState(false)
	const createSellMutation = useCreateSell()
	const { state: sellForm, isProductIdUndefined, reset } = useModalParametersStore()

	/// ⚓ Flags
	const isInvalidProduct = isProductIdUndefined()

	const handleClose = () => {
		reset()
		setShow(false)
	}

	const handleShow = () => {
		setShow(true)
	}

	const handleSave = () => {
		const newSell: SellRequest = {
			productId: sellForm.productId!,
			quantity: sellForm.quantity,
			amount: parseFloat(sellForm.amount),
			paymentMethodId: sellForm.paymentMethodId!,
		}
		createSellMutation.mutate(newSell)
		handleClose()
	}

	return (
		<div className={className}>
			{/* Button */}
			<Container className='d-flex justify-content-start'>
				<Button
					variant={'outline-success'}
					onClick={handleShow}
					title={title}
				>
					<IoBagAddOutline className='me-2 mb-1' />
					{title}
				</Button>
			</Container>

			{/* Modal */}
			<ModalBs
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				centered
			>
				<ModalBs.Header closeButton>
					<ModalBs.Title>
						<IoCartSharp className='me-2 mb-1 beating' /> {title}
					</ModalBs.Title>
				</ModalBs.Header>
				<ModalBs.Body>{children}</ModalBs.Body>
				<ModalBs.Footer>
					<Button
						variant={`${isInvalidProduct ? 'outline-secondary' : 'primary'}`}
						disabled={isInvalidProduct}
						onClick={handleSave}
						className={'w-100'}
					>
						<IoCheckmarkSharp className='me-2 mb-1' />
						Guardar
					</Button>
				</ModalBs.Footer>
			</ModalBs>
		</div>
	)
}

export default Modal
