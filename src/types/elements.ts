import { ButtonVariant } from 'react-bootstrap/esm/types'

export interface ButtonListProps {
	title: string
	variant?: ButtonVariant
	children: React.ReactNode
	disabled?: boolean
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
