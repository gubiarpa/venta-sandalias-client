import { Product, ProductResponse } from '../types/products'

export function toProduct(product: ProductResponse): Product {
	return {
		id: product._id,
		name: product.name,
	}
}
