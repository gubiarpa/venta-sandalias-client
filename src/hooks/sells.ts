import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { createSell, getSellsWithExternalEntities } from '../services/sells'
import { Product } from '../types/products'
import { PaymentMethod } from '../types/payment-methods'
import { SellRequest } from '../types/sell'

const sellsStaleTime = import.meta.env.VITE_SELLS_STALE_TIME

interface Props {
	products?: Product[]
	paymentMethods?: PaymentMethod[]
}

export function useSells({ products: products, paymentMethods: paymentMethods }: Props) {
	return useQuery({
		enabled: !!products && !!paymentMethods,
		queryKey: [queryKeys.SELLS],
		queryFn: () =>
			getSellsWithExternalEntities({
				products: products!,
				paymentMethods: paymentMethods!,
			}),
		staleTime: sellsStaleTime,
	})
}

export function useCreateSell() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (sell: SellRequest) => createSell(sell),
		onSettled: async (_, error) => {
			if (error) {
				return console.error('🍐 Error creating sell', error)
			}
			console.log('En este punto se deberia refrescar')
			await queryClient.invalidateQueries({ queryKey: [queryKeys.SELLS] })
		},
	})
}
