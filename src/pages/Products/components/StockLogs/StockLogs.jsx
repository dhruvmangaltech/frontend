import * as React from 'react'
import { Row, Col, Card, Form, Button, Table, Tabs, Tab } from '@themesberg/react-bootstrap'
import { useParams } from 'react-router-dom'

const StockLogs = (props) => {
	const {
		stockLogsList
	} = props

	const {productId} = useParams()

	console.log(stockLogsList)
	return (
		<>
			<Table bordered striped responsive hover size='sm' className='text-center mt-4'>
			<thead className='thead-dark'>
				<tr>

					{!!!productId && <th>Product Name</th>}
					<th>Logs By</th>
					{/* <th>Action Type</th> */}
					<th>Before Balance</th>
					<th>After Balance</th>
					{/* <th>Amount</th> */}
					<th>Date</th>
				</tr>
				</thead>
				{stockLogsList.map((item) => {

					const {
						beforeBalance,
						afterBalance,
						actionType,
						createdAt,
						Stock: {
							amount,
							product: {
								name,
								isActive
							}
						},
						AdminUser: {
							firstName,
							lastName
						}
					} = item

					return (
						<tr className='text-center mt-4' style={{backgroundColor: actionType === 'DEBIT'? '#fa8072': '#a4ff7d', color: 'black', margin: '10px' }}>
							{!!!productId && <td>{name}</td>}
							<td>{`${firstName} ${lastName}`}</td>
							{/* <td>{actionType}</td> */}
							<td>{beforeBalance}</td>
							<td>{afterBalance}</td>
							{/* <td>{amount}</td> */}
							<td>{new Date(createdAt).toLocaleString()}</td>
						</tr>
					)
				})}

			</Table>
		</>
	)
}

export default StockLogs