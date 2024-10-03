import { create } from 'zustand'

export interface ModalParameters {
	productId?: string
	quantity: number
	amount: string
	amountCalcDetail?: string
	paymentMethodId?: string
}

interface ModalParametersState {
	state: ModalParameters
	setProductId: (productId: string) => void
	isProductIdUndefined: () => boolean
	decreaseQuantity: (value?: number) => void
	increaseQuantity: (value?: number) => void
	setAmount: (value: string) => void
	setAmountCalcDetail: (value: string) => void
	setPaymentMethodId: (paymentMethodId: string) => void
	reset: () => void
}

const initialState: ModalParameters = {
	quantity: 1,
	amount: '',
}

export const useModalParametersStore = create<ModalParametersState>((set, get) => ({
	state: initialState,
	setProductId: (productId: string) => {
		set((state) => ({
			state: {
				...state.state,
				productId,
			},
		}))
	},
	isProductIdUndefined: () => get().state.productId === undefined,
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
	setAmountCalcDetail: (value: string) => {
		set((state) => ({
			state: {
				...state.state,
				amountCalcDetail: value,
			},
		}))
	},
	setPaymentMethodId: (paymentMethodId: string) => {
		set((state) => ({
			state: {
				...state.state,
				paymentMethodId,
			},
		}))
	},
	reset: () => {
		set(() => ({
			state: initialState,
		}))
	},
}))
