import { create } from 'zustand'

interface ModalParameters {
	quantity: number
	productId?: string
	amount: number
	paymentMethodId?: string
}

interface ModalParametersState {
	state: ModalParameters
}

export const useModalParametersStore = create<ModalParametersState>((set) => ({
	state: {
		quantity: 1,
		amount: 0,
	},
	setModalParameters: (parameters: ModalParameters) => {
		set({ state: parameters })
	},
}))
