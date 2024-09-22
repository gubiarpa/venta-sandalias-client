import { useQuery } from '@tanstack/react-query'

import apiBase from '../services/api-base'
import apiUrl from '../constants/api-url'
import queryKeys from '../constants/query-keys'
import { PaymentMethodResponse } from '../types/payment-methods'
import { toPaymentMethod } from '../adapters/payment-methods'

async function fetchPaymentMethods() {
	const { data } = await apiBase.get<PaymentMethodResponse[]>(
		apiUrl.PAYMENT_METHODS
	)
	console.log({ data })
	const paymentMethods = data.map(toPaymentMethod)
	return paymentMethods
}

export function useFetchPaymentMethods() {
	return useQuery({
		queryKey: [queryKeys.PAYMENT_METHODS],
		queryFn: fetchPaymentMethods,
	})
}
