import apiBase from './base/api-base'
import apiUrl from '../constants/api-url'

import { toPaymentMethod } from '../adapters/payment-methods'
import { PaymentMethod, PaymentMethodResponse } from '../types/payment-methods'

export async function fetchPaymentMethods() {
	const url = apiUrl.PAYMENT_METHODS
	const { data } = await apiBase.get<PaymentMethodResponse[]>(url)
	const paymentMethods = data.map(toPaymentMethod)
	return paymentMethods
}

export async function fetchPaymentMethodById(id: PaymentMethod['id']) {
	const url = `${apiUrl.PAYMENT_METHODS}/${id}`
	const { data } = await apiBase.get<PaymentMethodResponse>(url)
	return toPaymentMethod(data)
}

export async function fetchPaymentMethodsById(ids: PaymentMethod['id'][]) {
	const urls = ids.map((id) => `${apiUrl.PAYMENT_METHODS}/${id}`)
	const fetchPromises = urls.map((url) =>
		apiBase.get<PaymentMethodResponse>(url)
	)
	const responses = await Promise.all(fetchPromises)
	const data = await Promise.all(responses.map((response) => response.data))
	return data.map(toPaymentMethod)
}
