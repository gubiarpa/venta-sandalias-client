import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const apiBase = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	timeout: import.meta.env.VITE_TIMEOUT,
})

export default apiBase
