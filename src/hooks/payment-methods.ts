import { useQueries, useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { PaymentMethod } from '../types/payment-methods'
import {
	getPaymentMethodById,
	getPaymentMethods,
} from '../services/payment-methods'

const paymentMethodsStaleTime = import.meta.env.VITE_PAYMENT_METHODS_STALE_TIME

export function usePaymentMethods() {
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS],
		queryFn: () => getPaymentMethods(),
		staleTime: paymentMethodsStaleTime,
	})
}

export function usePaymentMethodById(
	paymentMethod: Pick<PaymentMethod, 'id'> | undefined
) {
	const { id } = paymentMethod!
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS, { id }],
		queryFn: () => getPaymentMethodById(id),
		staleTime: paymentMethodsStaleTime,
	})
}

export function usePaymentMethodsById(
	paymentMethods?: (Pick<PaymentMethod, 'id'> | undefined)[]
) {
	const ids = (paymentMethods ?? []).map((_) => _?.id)
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: [queryKeys.PAYMENT_METHODS, { id }],
				queryFn: () => getPaymentMethodById(id!),
				staleTime: paymentMethodsStaleTime,
			}
		}),
	})
}
