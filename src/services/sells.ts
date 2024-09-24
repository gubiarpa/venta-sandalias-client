import apiBase from '../services/base/api-base'
import apiUrl from '../constants/api-url'

import { SellResponse } from '../types/sell'
import { getProductsById } from './products'
import { getPaymentMethodsById } from './payment-methods'
import { toSell } from '../adapters/sells'

export async function getSells() {
	/// Get Sells
	const url = apiUrl.SELLS
	const sellsResponse = (await apiBase.get<SellResponse[]>(url)).data

	/// Get Products and Payment Methods
	const productsIds = sellsResponse.map((sell) => sell.productId)
	const paymentMethodsIds = sellsResponse.map((sell) => sell.paymentMethodId)
	const productIdsWihtoutDuplicates = [...new Set(productsIds)]
	const paymentMethodsIdsWithoutDuplicates = [...new Set(paymentMethodsIds)]

	const [products, paymentMethods] = await Promise.all([
		getProductsById(productIdsWihtoutDuplicates),
		getPaymentMethodsById(paymentMethodsIdsWithoutDuplicates),
	])

	/// Map Sells
	return sellsResponse.map((sellResponse) => {
		const product = products.find(
			(product) => product.id === sellResponse.productId
		)!
		const paymentMethod = paymentMethods.find(
			(paymentMethod) => paymentMethod.id === sellResponse.paymentMethodId
		)!

		return toSell({ sell: sellResponse, product, paymentMethod })
	})
}
