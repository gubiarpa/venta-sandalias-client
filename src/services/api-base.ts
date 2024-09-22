import axios from 'axios'

const apiBase = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL?.toString(),
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export default apiBase
