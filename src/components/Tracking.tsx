interface Props {
	obj: any
}

function Tracking({ obj }: Props) {
	return <pre>{JSON.stringify(obj, null, 2)}</pre>
}

export default Tracking
