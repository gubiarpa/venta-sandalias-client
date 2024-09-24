import apiBase from '../services/base/api-base'
import apiUrl from '../constants/api-url'

import { toPaymentMethod } from '../adapters/payment-methods'
import {
	PaymentMethodRequest,
	PaymentMethodResponse,
} from '../types/payment-methods'

export async function getPaymentMethods() {
	const url = apiUrl.PAYMENT_METHODS
	const { data } = await apiBase.get<PaymentMethodResponse[]>(url)
	const paymentMethods = data.map((_) => toPaymentMethod(_))
	return paymentMethods
}

export async function getPaymentMethodById(id: PaymentMethodRequest['_id']) {
	const url = `${apiUrl.PAYMENT_METHODS}/${id}`
	const { data } = await apiBase.get<PaymentMethodResponse>(url)
	return toPaymentMethod(data)
}

export async function getPaymentMethodsById(
	ids: PaymentMethodRequest['_id'][]
) {
	const urls = ids.map((id) => `${apiUrl.PAYMENT_METHODS}/${id}`)
	const fetchPromises = urls.map((url) =>
		apiBase.get<PaymentMethodResponse>(url)
	)
	const responses = await Promise.all(fetchPromises)
	const data = await Promise.all(responses.map((response) => response.data))
	return data.map((_) => toPaymentMethod(_))
}
