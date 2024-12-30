import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Button, Table, Tabs, Tab } from '@themesberg/react-bootstrap'
import useStock from '../../hooks/useStock'
import StockLogs from '../StockLogs/StockLogs'

const ViewStock = (props) => {

	const [stockAmount, setStockAmount] = useState(0)
	const {
		isLoading,
		res: product,
		updateStock,
		stockLogsListing
	} = useStock()

	useEffect(()=>{
		product?.stocks[0]?.amount && setStockAmount(product?.stocks[0].amount)
	}, [product?.stocks[0]?.amount])

	const increase = () => {
		setStockAmount(prev=>prev+1)
	}

	const decrease  = () => setStockAmount(prev=>prev-1 > 0 ? prev-1: 0)

	
	const updateStockForm = () => {
		updateStock({
			stockId: ''+product?.stocks[0].stockId,
			actionType: product?.stocks[0].amount - stockAmount > 0 ? '0': '1',
			amount: Math.abs(product?.stocks[0].amount - stockAmount)
		})
	}	

	return (
		<>
			{
				(isLoading && <div>Loading</div>)

			}

			{!isLoading &&
				<div>
					<Table>
						<tr>
							<td> Product Name</td>
							<td>{product.name}</td>
						</tr>
						<tr>
							<td> Product Scale</td>
							<td>{product.sclae}</td>
						</tr>
						<tr>
							<td> Product Size</td>
							<td>{product.size}</td>
						</tr>
						<tr>
							<td> Product description</td>
							<td>{product.description}</td>
						</tr>
					</Table>
					<div style={{margin:'20px'}}>
						Stock Deatils: 

						<Row>
							<Col>
								<Button onClick={decrease}>-</Button>
							</Col>
							<Col>{stockAmount}</Col>
							<Col>
							<Button onClick={increase}>+</Button>
							</Col>
						</Row>
						<Row style={{marginTop: '10px'}}>
							<Col><Button style={{backgroundColor: 'green'}} onClick={updateStockForm}>Update Stock</Button></Col>
							<Col></Col>
							<Col>
								
							</Col>
						</Row>
					</div>

					<div>
						<h2>Stock Logs</h2>
						<StockLogs stockLogsList={stockLogsListing} />
					</div>
				</div>
			}
		</>
	)
}

export default ViewStock