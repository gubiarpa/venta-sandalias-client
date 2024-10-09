import { ReactNode } from 'react'
import { Button, Modal as ModalBs } from 'react-bootstrap'
import { IoCartSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { useCreateSell } from '../hooks/sells'
import { useModalParametersStore } from '../store/modal-parameters'
import { SellRequest } from '../types/sell'

interface Props {
	show: boolean
	handleClose: () => void
	title: string
	className?: string
	children: ReactNode
}

function Modal({ show, handleClose, title, children }: Props) {
	const createSellMutation = useCreateSell()
	const { state: sellForm, isProductIdUndefined } = useModalParametersStore()

	/// ⚓ Flags
	const isInvalidProduct = isProductIdUndefined()

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
		<>
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
		</>
	)
}

export default Modal
