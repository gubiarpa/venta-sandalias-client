import { useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { getSellsWithExternalEntities } from '../services/sells'
import { Product } from '../types/products'
import { PaymentMethod } from '../types/payment-methods'

const sellsStaleTime = import.meta.env.VITE_SELLS_STALE_TIME

interface Props {
	products?: Product[]
	paymentMethods?: PaymentMethod[]
}

export function useSells({
	products: products,
	paymentMethods: paymentMethods,
}: Props) {
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
