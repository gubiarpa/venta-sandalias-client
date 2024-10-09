import { Button, Container } from 'react-bootstrap'
import { ButtonListProps } from '../types/elements'

interface Props {
	className?: string
	buttons: ButtonListProps[]
}

function OptionGroup({ className, buttons }: Props) {
	return (
		<>
			<Container className={className}>
				{buttons.map(({ title, variant, disabled, children, onClick }) => (
					<Button
						key={title}
						variant={variant}
						disabled={disabled}
						onClick={onClick}
						title={title}
					>
						{children}
					</Button>
				))}
			</Container>
		</>
	)
}

export default OptionGroup
