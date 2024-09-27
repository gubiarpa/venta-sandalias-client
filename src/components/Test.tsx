import { useSells } from '../hooks/sells'

function Test() {
	const { data: sells, isLoading } = useSells()

	if (isLoading) return <p>Cargando...</p>

	return <pre className='m-3'>{JSON.stringify(sells, null, 2)}</pre>
}

export default Test
