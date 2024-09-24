import { PaymentMethod } from '../types/payment-methods'
import { Product } from '../types/products'
import { Sell, SellResponse } from '../types/sell'

type SellMapper = {
	sell: SellResponse
	product: Product
	paymentMethod: PaymentMethod
}

export function toSell({ sell, product, paymentMethod }: SellMapper): Sell {
	return {
		id: sell._id,
		quantity: sell.quantity,
		amount: sell.amount,
		paymentMethod: paymentMethod,
		product: product,
	}
}
