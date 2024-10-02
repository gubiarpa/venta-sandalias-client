import { useQueries, useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { getProductById, getProducts } from '../services/products'
import { Product } from '../types/products'

const productsStaleTime = import.meta.env.VITE_PRODUCTS_STALE_TIME

export function useProducts() {
	return useQuery({
		queryKey: [queryKeys.PRODUCTS],
		queryFn: () => getProducts(),
		staleTime: productsStaleTime,
	})
}

export function useProductById(product: Pick<Product, 'id'> | undefined) {
	const { id } = product!
	return useQuery({
		queryKey: [queryKeys.PRODUCTS, { id }],
		queryFn: () => getProductById(id),
		staleTime: productsStaleTime,
	})
}

export function useProductsById(
	products?: (Pick<Product, 'id'> | undefined)[]
) {
	const ids = (products ?? []).map((_) => _?.id)
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: [queryKeys.PRODUCTS, { id }],
				queryFn: () => getProductById(id!),
				staleTime: productsStaleTime,
			}
		}),
	})
}
