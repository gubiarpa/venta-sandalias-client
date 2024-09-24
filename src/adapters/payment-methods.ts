import { PaymentMethod, PaymentMethodResponse } from '../types/payment-methods'

export function toPaymentMethod(
	paymentMethod: PaymentMethodResponse
): PaymentMethod {
	return {
		id: paymentMethod._id,
		name: paymentMethod.name,
	}
}
