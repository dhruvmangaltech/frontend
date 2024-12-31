import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Button, Table, Tabs, Tab, InputGroup, Form as BForm, } from '@themesberg/react-bootstrap'
import useStock from '../../hooks/useStock'
import StockLogs from '../StockLogs/StockLogs'

const TabsDeatils = {
	ProductDetails: { label: 'Product Details', key: 'ProductDetails' },
	Inward: { label: 'Inward', key: 'Inward' },
	Outward: { label: 'Outward', key: 'Outward' },
	StockLogs: { label: 'Stock Logs', key: 'StockLogs' }
}

const ViewStock = (props) => {

	const [stockAmount, setStockAmount] = useState(0)
	const [currentSelectedTab, setCurrentSelectedTab] = useState('ProductDetails')
	const {
		isLoading,
		res: product,
		updateStock,
		stockLogsListing
	} = useStock()

	const parentTabToggler = (itemValue) => {
		setCurrentSelectedTab(itemValue);
	};

	// useEffect(() => {
	// 	product?.stocks[0]?.amount && setStockAmount(product?.stocks[0].amount)
	// }, [product?.stocks[0]?.amount])

	const increase = () => {
		updateStock({
			stockId: '' + product?.stocks[0].stockId,
			actionType: '1',
			amount: stockAmount
		})
	}

	const decrease = () => {
		updateStock({
			stockId: '' + product?.stocks[0].stockId,
			actionType: '0',
			amount: stockAmount
		})
	}



	const updateStockForm = () => {
		updateStock({
			stockId: '' + product?.stocks[0].stockId,
			actionType: product?.stocks[0].amount - stockAmount > 0 ? '0' : '1',
			amount: Math.abs(product?.stocks[0].amount - stockAmount)
		})
	}

	return (
		<>
			{
				(isLoading && <div>Loading</div>)

			}

			<Tabs
				activeKey={currentSelectedTab}
				onSelect={(tab) => parentTabToggler(tab)}
				className='nav-light w-100 m-auto'
				mountOnEnter
				unmountOnExit
			>
				{Object.keys(TabsDeatils).map((item, index) => <Tab
					eventKey={item}
					title={TabsDeatils[item].label}
					key={index}
				/>)}
			</Tabs>

			{!isLoading &&
				<div>
					{currentSelectedTab === "ProductDetails" &&
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
					}


					{currentSelectedTab === "Inward" && <div style={{ margin: '20px' }}>
						<Row>
							<Col><h2>InWard Stock</h2></Col>
						</Row>
						<Row>
							<Col><b>Current Stock</b></Col>
							<Col><b>{product?.stocks[0]?.amount}</b></Col>
							<Col></Col>
							<Col></Col>
							<Col></Col>
						</Row>
						<br/>
						<Row>
							<Col>Add Stock</Col>
						</Row>
	
						<Row>
							<Col>
								<InputGroup id={'info'}>
									<BForm.Control
										type='text'
										name='size'
										placeholder='Enter the amount to be added'
										value={stockAmount}
										onChange={(e)=>setStockAmount(+e.target.value)}
									// onBlur={handleBlur}
									/>
								</InputGroup>
							</Col>
							<Col></Col>
						</Row>
						<Row>
							<Col><Button style={{margin: '10px 0px', backgroundColor: 'green'}} onClick={increase}>Add Stock</Button></Col>
							<Col></Col>
							<Col></Col>
							<Col></Col>
						</Row>
					</div>}

					{currentSelectedTab === "Outward" && <div style={{ margin: '20px' }}>
						<Row>
							<Col><h2>Outward Stock</h2></Col>
						</Row>
						<Row>
							<Col><b>Current Stock</b></Col>
							<Col><b>{product?.stocks[0]?.amount}</b></Col>
							<Col></Col>
							<Col></Col>
							<Col></Col>
						</Row>
						<br/>
						<Row>
							<Col>Out Stock</Col>
						</Row>
	
						<Row>
							<Col>
								<InputGroup id={'info'}>
									<BForm.Control
										type='text'
										name='size'
										placeholder='Enter the amount to be removed'
										value={stockAmount}
										onChange={(e)=>setStockAmount(+e.target.value)}
									// onBlur={handleBlur}
									/>
								</InputGroup>
							</Col>
							<Col></Col>
						</Row>
						<Row>
							<Col><Button style={{margin: '10px 0px', backgroundColor: 'red'}} onClick={decrease}>Remove Stock</Button></Col>
							<Col></Col>
							<Col></Col>
							<Col></Col>
						</Row>
					</div>}

					{currentSelectedTab === "StockLogs" &&
						<div>
							<StockLogs stockLogsList={stockLogsListing} />
						</div>
					}
				</div>
			}
		</>
	)
}

export default ViewStock