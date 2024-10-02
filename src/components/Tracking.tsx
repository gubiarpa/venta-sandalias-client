import { useEffect, useState } from 'react'

interface Props {
	obj: any
}

function Tracking({ obj }: Props) {
	const [show, setShow] = useState<boolean>(
		() => import.meta.env.VITE_TRACKING_SHOW === 'ENABLE'
	)

	useEffect(() => {
		if (import.meta.env.VITE_TRACKING_INTTERMITENT === 'DISABLE') {
			return
		}

		const eventId = setInterval(() => {
			setShow((prevState) => !prevState)
		}, import.meta.env.VITE_TRACKING_CYCLE)

		return () => {
			clearInterval(eventId)
		}
	}, [])

	return (
		show && (
			<pre
				style={{
					width: '100%',
					backdropFilter: 'blur(3px)',
					padding: '1rem',
					position: 'fixed',
					bottom: 0,
					left: 0,
					paddingLeft: '1rem',
					zIndex: 1056,
				}}
			>
				{JSON.stringify(obj, null, 2)}
			</pre>
		)
	)
}

export default Tracking
