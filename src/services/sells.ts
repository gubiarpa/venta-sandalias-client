import apiBase from '../services/base/api-base'
import apiUrl from '../constants/api-url'

import { Sell, SellRequest, SellResponse } from '../types/sell'
import { toSell } from '../adapters/sells'
import { Product } from '../types/products'
import { PaymentMethod } from '../types/payment-methods'
import { getProductById } from './products'
import { getPaymentMethodById } from './payment-methods'

interface SellMapper {
	products: Product[]
	paymentMethods: PaymentMethod[]
}

async function getAndMapProductsById(sellsResponse: Pick<SellResponse, 'productId'>[]): Promise<Product[]> {
	const productIdsWithDuplicates = sellsResponse.map(({ productId }) => productId)
	const productsIds = [...new Set(productIdsWithDuplicates)]
	return await Promise.all(productsIds.map(async (id) => await getProductById(id)))
}

async function getAndMapPaymentMethodsById(
	sellsResponse: Pick<SellResponse, 'paymentMethodId'>[]
): Promise<PaymentMethod[]> {
	const paymentMethodIdsWithDuplicates = sellsResponse.map(({ paymentMethodId }) => paymentMethodId)
	const paymentMethodsIds = [...new Set(paymentMethodIdsWithDuplicates)]
	return await Promise.all(paymentMethodsIds.map(async (id) => await getPaymentMethodById(id)))
}

function mapSellsWithExternalEntities({
	sellResponse,
	sellMapper,
}: {
	sellResponse: SellResponse
	sellMapper: SellMapper
}): Sell {
	const { products, paymentMethods } = sellMapper

	const product = products.find((product) => product.id === sellResponse.productId)!
	const paymentMethod = paymentMethods.find((paymentMethod) => paymentMethod.id === sellResponse.paymentMethodId)!

	return toSell({ sell: sellResponse, product, paymentMethod })
}

export async function getSellsWithExternalEntities({ products, paymentMethods }: SellMapper) {
	/// Get Sells
	const url = apiUrl.SELLS
	const sellsResponse = (await apiBase.get<SellResponse[]>(url)).data

	/// Map Sells
	return sellsResponse.map((sellResponse) =>
		mapSellsWithExternalEntities({
			sellResponse,
			sellMapper: { products, paymentMethods },
		})
	)
}

export async function getSells() {
	/// Get Sells
	const url = apiUrl.SELLS
	const sellsResponse = (await apiBase.get<SellResponse[]>(url)).data

	/// Get Products and Payment Methods
	const [products, paymentMethods] = await Promise.all([
		getAndMapProductsById(sellsResponse),
		getAndMapPaymentMethodsById(sellsResponse),
	])

	/// Map Sells
	return sellsResponse.map((sellResponse) =>
		mapSellsWithExternalEntities({
			sellResponse,
			sellMapper: { products, paymentMethods },
		})
	)
}

export async function createSell(sell: SellRequest) {
	const url = apiUrl.SELLS
	const { data } = await apiBase.post<SellResponse>(url, sell)
	return data
}
