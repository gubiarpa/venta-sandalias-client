import apiBase from '../services/base/api-base'
import apiUrl from '../constants/api-url'

import { toProduct } from '../adapters/products'
import { ProductRequest, ProductResponse } from '../types/products'

export async function getProducts() {
	const url = apiUrl.PRODUCTS
	const { data } = await apiBase.get<ProductResponse[]>(url)
	const products = data.map((_) => toProduct(_))
	return products
}

export async function getProductById(id: ProductRequest['_id']) {
	const url = `${apiUrl.PRODUCTS}/${id}`
	const { data } = await apiBase.get<ProductResponse>(url)
	return toProduct(data)
}
