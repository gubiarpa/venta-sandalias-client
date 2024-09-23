import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL?.toString()

const apiBase = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export default apiBase
