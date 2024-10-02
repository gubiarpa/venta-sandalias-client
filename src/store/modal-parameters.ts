import { create } from 'zustand'

export interface ModalParameters {
	productId?: string
	quantity: number
	amount: string
	paymentMethodId?: string
}

interface ModalParametersState {
	state: ModalParameters
	setProductId: (productId: string) => void
	decreaseQuantity: (value?: number) => void
	increaseQuantity: (value?: number) => void
	setAmount: (value: string) => void
	reset: () => void
}

const initialState: ModalParameters = {
	quantity: 1,
	amount: '',
}

export const useModalParametersStore = create<ModalParametersState>((set) => ({
	state: initialState,
	setProductId: (productId: string) => {
		set((state) => ({
			state: {
				...state.state,
				productId,
			},
		}))
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
	setAmount: (value: string) => {
		if (!value) {
			return
		}

		set((state) => ({
			state: {
				...state.state,
				amount: value,
			},
		}))
	},
	reset: () => {
		set(() => ({
			state: initialState,
		}))
	},
}))
