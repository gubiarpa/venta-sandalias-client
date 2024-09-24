import { Container, Table as TableBs } from 'react-bootstrap'
import { Sell } from '../types/sell'

interface Props {
	className?: string
	sells: Sell[]
}

function Table({ className, sells }: Props) {
	return (
		<Container className={className}>
			<TableBs
				hover
				responsive='sm'
			>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Modo</th>
						<th className='text-end'>Cant.</th>
						<th className='text-end'>Monto (S/)</th>
					</tr>
				</thead>
				<tbody>
					{sells.map((sell) => (
						<tr key={sell.id}>
							<td className='shorten-string'>{sell.product.name}</td>
							<td>{sell.paymentMethod.name}</td>
							<td className='text-end'>{sell.quantity}</td>
							<td className='text-end'>
								{sell.amount && sell.amount.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={2}>Total Venta</th>
						<th className='text-end'>
							{sells.reduce((acc, { quantity }) => acc + quantity!, 0)}
						</th>
						<th className='text-end'>
							{sells.reduce((acc, { amount }) => acc + amount!, 0).toFixed(2)}
						</th>
					</tr>
				</tfoot>
			</TableBs>
		</Container>
	)
}

export default Table
