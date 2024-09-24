import { useFetchSells } from '../hooks/sells'

function Test() {
	const { data: sells, isLoading } = useFetchSells()

	if (isLoading) return <p>Cargando...</p>

	return <pre className='m-3'>{JSON.stringify(sells, null, 2)}</pre>
}

export default Test
