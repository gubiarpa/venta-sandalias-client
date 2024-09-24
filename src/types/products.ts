export interface Product {
	id: string
	name: string
	price?: number
}

export interface ProductRequest {
	_id: string
	name: string
	price: number
}

export interface ProductResponse {
	_id: string
	name: string
	price: number
}
