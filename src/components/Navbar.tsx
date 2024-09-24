import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavbarBs from 'react-bootstrap/Navbar'
import { IoBagHandleOutline, IoLogOutOutline } from 'react-icons/io5'

interface Props {
	className?: string
}

function Navbar({ className }: Props) {
	return (
		<NavbarBs
			expand='lg'
			className={`bg-body-tertiary ${className}`}
			bg='dark'
			data-bs-theme='dark'
			sticky='top'
		>
			<Container fluid>
				<NavbarBs.Brand
					href='/'
					className='mb-1 me-4'
				>
					<IoBagHandleOutline className='beating me-3 mb-1' />
					Control de Ventas
				</NavbarBs.Brand>
				<NavbarBs.Toggle aria-controls='navbarScroll' />
				<NavbarBs.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						navbarScroll
					>
						<Nav.Link href='/'>Inicio</Nav.Link>
					</Nav>
					<Form>
						<Button variant='outline-danger'>
							<IoLogOutOutline className='me-2 mb-1' />
							Salir
						</Button>
					</Form>
				</NavbarBs.Collapse>
			</Container>
		</NavbarBs>
	)
}

export default Navbar
