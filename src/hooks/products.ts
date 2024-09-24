import { useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import {
	getProductById,
	getProducts,
	getProductsById,
} from '../services/products'
import { Product } from '../types/products'

const productsStaleTime = parseInt(
	import.meta.env.VITE_PRODUCTS_STALE_TIME ?? '10000'
)

export function useFetchProducts() {
	return useQuery({
		queryKey: [queryKeys.PRODUCTS],
		queryFn: () => getProducts(),
		staleTime: productsStaleTime,
	})
}

export function useFetchProductById(product: Pick<Product, 'id'>) {
	const { id } = product
	return useQuery({
		queryKey: [queryKeys.PRODUCTS, id],
		queryFn: () => getProductById(id),
		staleTime: productsStaleTime,
	})
}

export function useFetchProductsById(products: Pick<Product, 'id'>[]) {
	const ids = products.map(({ id }) => id)
	return useQuery({
		queryKey: [queryKeys.PRODUCTS, ids],
		queryFn: () => getProductsById(ids),
		staleTime: productsStaleTime,
	})
}
