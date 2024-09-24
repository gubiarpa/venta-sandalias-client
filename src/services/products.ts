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

export async function getProductsById(ids: ProductRequest['_id'][]) {
	const urls = ids.map((id) => `${apiUrl.PRODUCTS}/${id}`)
	const fetchPromises = urls.map((url) => apiBase.get<ProductResponse>(url))
	const responses = await Promise.all(fetchPromises)
	const data = await Promise.all(responses.map((response) => response.data))
	return data.map(toProduct)
}
