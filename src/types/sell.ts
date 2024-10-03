import { PaymentMethod } from './payment-methods'
import { Product } from './products'

export interface Sell {
	id: string
	quantity: number
	product: Product
	amount: number
	paymentMethod: PaymentMethod
}

export interface SellRequest {
	_id?: string
	quantity: number
	productId: string
	amount: number
	paymentMethodId: string
}

export interface SellResponse {
	_id: string
	quantity: number
	productId: string
	amount: number
	paymentMethodId: string
}
