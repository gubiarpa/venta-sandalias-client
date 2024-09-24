import { ReactNode, useState } from 'react'
import { Button, Modal as ModalBs } from 'react-bootstrap'
import {
	IoBagAddOutline,
	IoBanOutline,
	IoCartSharp,
	IoCheckmarkSharp,
} from 'react-icons/io5'

interface Props {
	isLoading: boolean
	title: string
	className?: string
	children: ReactNode
}

function Modal({ isLoading, title, className, children }: Props) {
	const [show, setShow] = useState(false)

	const handleClose = () => {
		setShow(false)
	}

	const handleShow = () => {
		setShow(true)
	}

	const handleSave = () => {
		handleClose()
	}

	return (
		<div className={className}>
			{/* Button */}
			<Button
				disabled={isLoading}
				variant={isLoading ? 'outline-secondary' : 'outline-success'}
				onClick={handleShow}
			>
				<IoBagAddOutline className='me-2 mb-1' />
				{title}
			</Button>

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
						variant='outline-secondary'
						onClick={handleClose}
					>
						<IoBanOutline className='me-2 mb-1' />
						Cancelar
					</Button>
					<Button
						variant='primary'
						onClick={handleSave}
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
