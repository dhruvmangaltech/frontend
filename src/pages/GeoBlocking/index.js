import { Button, Table } from '@themesberg/react-bootstrap'
import * as React from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from '../../components/Toast'
import useGeoBlocking from './hooks/useGeoBlocking'
const GeoBlocking = () => {
	const {
		state: stateData,
		initialState,
		isLoading,
		tableHeaders,
		t,
		updateAllowedStatesFn,
		dispatch,
		resetToggler,
	} = useGeoBlocking()
	
	
	return (
		<>
			{
				isLoading ?
					<Skeleton /> :
					(
						<>
						<Table bordered striped responsive hover size='sm' className='text-center mt-4'>
							<thead className='thead-dark'>
								<tr>
									{tableHeaders.map((h, idx) => (
										<th
											key={idx}
											// onClick={() => h.value !== '' && setOrderBy(h.value)}
											style={{
												cursor: 'pointer'
											}}
											// className={
											// 	selected(h)
											// 		? 'border-3 border border-blue'
											// 		: ''
											// }
										>
											{t(h.labelKey)}{' '}
											
										</th>
									))}
								</tr>
							</thead>

							{!isLoading && <tbody>
								{stateData && stateData?.map((state) => {
									return (
										<tr key={state.state_id}
											onContextMenu={(e) => {
												e.preventDefault();
											
											}}>
											<td>{state?.state_id}</td>
											<td>{state?.name}</td>
											<td>{state?.stateCode}</td>
										
											<td>
												{state?.isAllowed ? "True" : "False"}
												
											</td>
											{/* <td>{player.kycStatus}</td> */}
											<td>
												{state?.isAllowed ? 
													<Button style={{backgroundColor: "red"}} onClick={()=>dispatch({type: 'remove', value: state?.state_id})}>{t('buttons.restrict')} </Button>:
													<Button onClick={()=>dispatch({type: 'add', value: state?.state_id})}>{t('buttons.allow')} </Button>
												}
											</td>
											
										</tr>
									)
								})
								}

								{stateData?.rows?.length === 0 && !isLoading &&
									<tr>
										<td colSpan={6} className='text-danger text-center'>
											{t('noDataFound')}
										</td>
									</tr>}
							</tbody>}
						</Table>

						<div style={{marginTop: "20px"}}>
							<Button onClick={resetToggler}>Reset</Button>
							<Button style={{float: 'right'}} onClick={()=>updateAllowedStatesFn(stateData)}>Submit</Button>
						</div>
						</>
					)
			}
		</>
	)
}

export default GeoBlocking