import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL?.toString()

const apiBase = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	timeout: parseInt(import.meta.env.VITE_TIMEOUT ?? '10000'),
})

export default apiBase
