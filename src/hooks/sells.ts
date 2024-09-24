import { useQuery } from '@tanstack/react-query'

import queryKeys from '../constants/query-keys'
import { getSells } from '../services/sells'

const sellsStaleTime = parseInt(
	import.meta.env.VITE_SELLS_STALE_TIME ?? '60000'
)

export function useFetchSells() {
	return useQuery({
		queryKey: [queryKeys.SELLS],
		queryFn: () => getSells(),
		staleTime: sellsStaleTime,
	})
}
