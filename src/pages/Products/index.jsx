import * as React from 'react'
import ProductSearch from './ProductSearch'
import useProductListing from './useProductListing';
import { Row, Col, Card, Form, Button, Table, Tabs, Tab } from '@themesberg/react-bootstrap'
import { tableHeaders } from './constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCheckSquare, faWindowClose, faArrowCircleUp, faArrowCircleDown, faQrcode } from '@fortawesome/free-solid-svg-icons'
import Trigger from '../../components/OverlayTrigger'
import useCheckPermission from '../../utils/checkPermission'
import { AdminRoutes } from '../../routes';


const Products = () => {

	const { t, navigate, selected, loading, sort, setStatusShow, statusShow, handleYes, status,
		setSort, over, setOver, stockList, search, setSearch, totalPages, page, setPage, limit, setLimit, setKycOptions, setOrderBy, handleStatusShow,
		globalSearch,
		setGlobalSearch
	} = useProductListing();

	const { isHidden } = useCheckPermission()

	return (
		<>
			<div className='d-flex justify-content-end'>

				{/* Button to create new product */}
				<Button
					variant='success'
					className='m-1'
					size='sm'
					onClick={() =>
						navigate(AdminRoutes.CreateProducts)}
					hidden={isHidden({ module: { key: 'Admins', value: 'C' } })}
				>
					Create
				</Button>
			</div>

			<ProductSearch
				globalSearch={globalSearch}
				setGlobalSearch={setGlobalSearch}
			/>

			<Table bordered striped responsive hover size='sm' className='text-center mt-4'>
				<thead className='thead-dark'>
					<tr>
						{tableHeaders.map((h, idx) => (
							<th
								key={idx}
								onClick={() => h.value !== '' && setOrderBy(h.value)}
								style={{
									cursor: 'pointer'
								}}
								className={
									selected(h)
										? 'border-3 border border-blue'
										: ''
								}
							>
								{t(h.labelKey)}{' '}
								{selected(h) &&
									(sort === 'asc'
										? (
											<FontAwesomeIcon
												style={over ? { color: 'red' } : {}}
												icon={faArrowCircleUp}
												onClick={() => setSort('desc')}
												onMouseOver={() => setOver(true)}
												onMouseLeave={() => setOver(false)}
											/>
										)
										: (
											<FontAwesomeIcon
												style={over ? { color: 'red' } : {}}
												icon={faArrowCircleDown}
												onClick={() => setSort('asc')}
												onMouseOver={() => setOver(true)}
												onMouseLeave={() => setOver(false)}
											/>
										))}
							</th>
						))}
					</tr>
				</thead>

				{!loading && <tbody>
					{stockList && stockList?.rows.map((player) => {
						return (
							<tr key={player.productId}
								onContextMenu={(e) => {
									e.preventDefault();
									const contextMenu = document.getElementById(`contextMenu-${player.productId}`);
									contextMenu.style.top = `${e.clientY}px`;
									contextMenu.style.left = `${e.clientX}px`;
									contextMenu.style.display = 'block';
								}}>
								<td>{player.productId}</td>
								<td>{player.name}</td>
								<td>{player.colour}</td>
								<td>{player.sclae}</td>
								<td className='text-link' style={{ cursor: 'pointer' }}
								// onClick={() => {
								// 	navigate(
								// 		`${AdminRoutes.PlayerDetails.split(':').shift()}${player.userId}`
								// 	)
								// }}
								>
									{player.size}
								</td>

								<td>
									{player.isActive ? <span className='text-success'>{t('activeStatus')}</span> : <span className='text-danger'>{t('inActiveStatus')}</span>}
								</td>
								{/* <td>{player.kycStatus}</td> */}
								<td>
									<>
										<Trigger message='View' id={player.userId + 'view'} />
										<Button
											id={player.userId + 'view'}
											className='m-1'
											size='sm'
											variant='info'
											onClick={() => {
												navigate(
													`${AdminRoutes.ProductDeatil.split(':').shift()}${player.productId}`
												)
											}}
										>
											<FontAwesomeIcon icon={faEye} />
										</Button>
										<div
											id={`contextMenu-${player.productId}`}
											style={{
												position: 'fixed',
												display: 'none',
												backgroundColor: 'white',
												boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
												borderRadius: '5px',
												padding: '5px',
												zIndex: '9999',
											}}
										>
											<div
												onClick={() => {
													window.open(
														`${AdminRoutes.ProductDeatil.split(':').shift()}${player.productId}`,
														'_blank'
													);
													document.getElementById(`contextMenu-${player.productId}`).style.display = 'none';
												}}
												style={{
													cursor: 'pointer',
													padding: '5px',
												}}
											>
												Open in new tab
											</div>
										</div>
										{/* Code to set Player as Active/Inactive   */}
										{
											 (
												<>
													<Trigger message='View QR Code' id={player.userId + 'inactive'} />
													<Button
														id={player.userId + 'inactive'}
														className='m-1'
														size='sm'
														variant='danger'
														onClick={
															()=>navigate(
															`${AdminRoutes.QrCode.split(':').shift()}${player.productId}`
														)}
														// hidden={isHidden({ module: { key: 'Users', value: 'T' } })}
													>
														<FontAwesomeIcon icon={faQrcode} />
													</Button>
												</>
											)}
									</>
								</td>
							</tr>
						)
					})
					}

					{stockList?.rows?.length === 0 && !loading &&
						<tr>
							<td colSpan={6} className='text-danger text-center'>
								{t('noDataFound')}
							</td>
						</tr>}
				</tbody>}
			</Table>
		</>
	)
}

export default Products