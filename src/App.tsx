import { useFetchPaymentMethods } from './hooks/payment-methods'

function App() {
	const { data, isLoading } = useFetchPaymentMethods()

	return isLoading ? (
		<div>Loading...</div>
	) : (
		data && data.map(({ id, name }) => <div key={id}>{name}</div>)
	)
}

export default App
