/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string
	readonly VITE_TIMEOUT: number

	readonly VITE_PRODUCTS_STALE_TIME: number
	readonly VITE_PAYMENT_METHODS_STALE_TIME: number
	readonly VITE_SELLS_STALE_TIME: number

	readonly VITE_TRACKING_SHOW: 'ENABLE' | 'DISABLE'
	readonly VITE_TRACKING_INTTERMITENT: 'ENABLE' | 'DISABLE'
}
