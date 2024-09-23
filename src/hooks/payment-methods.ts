import { useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { PaymentMethod } from '../types/payment-methods'
import {
	fetchPaymentMethodById,
	fetchPaymentMethods,
	fetchPaymentMethodsById,
} from '../services/payment-methods'

export function useFetchPaymentMethods() {
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS],
		queryFn: () => fetchPaymentMethods(),
	})
}

export function useFetchPaymentMethodById(id: PaymentMethod['id']) {
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS, id],
		queryFn: () => fetchPaymentMethodById(id),
	})
}

export function useFetchPaymentMethodsById(ids: PaymentMethod['id'][]) {
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS, ids],
		queryFn: () => fetchPaymentMethodsById(ids),
	})
}
