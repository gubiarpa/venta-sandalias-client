import { useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { PaymentMethod } from '../types/payment-methods'
import {
	getPaymentMethodById,
	getPaymentMethods,
	getPaymentMethodsById,
} from '../services/payment-methods'

const paymentMethodsStaleTime = parseInt(
	import.meta.env.VITE_PAYMENT_METHODS_STALE_TIME ?? '10000'
)

export function useFetchPaymentMethods() {
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS],
		queryFn: () => getPaymentMethods(),
		staleTime: paymentMethodsStaleTime,
	})
}

export function useFetchPaymentMethodById(
	paymentMethod: Pick<PaymentMethod, 'id'>
) {
	const { id } = paymentMethod
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS, id],
		queryFn: () => getPaymentMethodById(id),
		staleTime: paymentMethodsStaleTime,
	})
}

export function useFetchPaymentMethodsById(
	paymentMethods: Pick<PaymentMethod, 'id'>[]
) {
	const ids = paymentMethods.map(({ id }) => id)
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS, ids],
		queryFn: () => getPaymentMethodsById(ids),
		staleTime: paymentMethodsStaleTime,
	})
}
