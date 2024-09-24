import { create } from 'zustand'

interface ModalParameters {
	quantity: number
	productId?: string
	amount: number
	paymentMethodId?: string
}

interface ModalParametersState {
	state: ModalParameters
	decreaseQuantity: (value?: number) => void
	increaseQuantity: (value?: number) => void
}

export const useModalParametersStore = create<ModalParametersState>((set) => ({
	state: {
		quantity: 1,
		amount: 0,
	},
	decreaseQuantity: (value: number = 1) => {
		set((state) => ({
			state: {
				...state.state,
				quantity: state.state.quantity - value,
			},
		}))
	},
	increaseQuantity: (value: number = 1) => {
		set((state) => ({
			state: {
				...state.state,
				quantity: state.state.quantity + value,
			},
		}))
	},
}))
