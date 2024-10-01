import { IoSettingsOutline } from 'react-icons/io5'

interface Props {
	className?: string
}

function Loader({ className }: Props) {
	return (
		<div
			className={`d-flex flex-column align-items-center h-50 text-secondary ${className}`}
		>
			<IoSettingsOutline
				className='my-5 rotating'
				size={100}
			/>
			<span className='fs-1 text-loading beating'>Cargando...</span>
		</div>
	)
}

export default Loader
