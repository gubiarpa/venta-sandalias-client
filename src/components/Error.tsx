import { IoCloudOfflineOutline } from 'react-icons/io5'

interface Props {
	className?: string
}

function Error({ className }: Props) {
	return (
		<div
			className={`d-flex flex-column align-items-center h-50 text-danger ${className}`}
		>
			<IoCloudOfflineOutline
				className='my-5'
				size={100}
			/>
			<span className='fs-1 text-loading'>Hubo un error</span>
		</div>
	)
}

export default Error
