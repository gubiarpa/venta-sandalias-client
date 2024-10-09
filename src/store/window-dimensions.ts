import { create } from 'zustand'
import { getCssVariable } from '../utils/css-variables'

export interface WindowDimensionsState {
	width: number
	height: number
}

export interface WindowDimensionsActions {
	subscribe: () => void
	isMobileWidth: () => boolean
}

interface WindowDimensionsStore {
	state: WindowDimensionsState
}

const initialState: WindowDimensionsState = {
	width: window.innerWidth,
	height: window.innerHeight,
}

export const useWindowDimensionsStore = create<WindowDimensionsStore & WindowDimensionsActions>((set, get) => ({
	state: initialState,
	subscribe: () => {
		const handleResize = () => {
			set((state) => ({
				state: {
					...state.state,
					width: window.innerWidth,
					height: window.innerHeight,
				},
			}))
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	},
	isMobileWidth: () => {
		const breakpoint = Number(getCssVariable('--bs-breakpoint-lg').slice(0, -2))
		return get().state.width < breakpoint
	},
}))
