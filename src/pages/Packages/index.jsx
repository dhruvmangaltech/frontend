import React, { useState } from 'react'
import {
  Button,
  Form,
  Row,
  Col,
  Table,
  ButtonGroup
} from '@themesberg/react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckSquare,
  faWindowClose,
  faArrowCircleUp,
  faArrowCircleDown,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import PaginationComponent from '../../components/Pagination'
import { hotOptions, isVisibleInStoreOptions, statusOptions, tableHeaders } from './constants'
import usePackagesListing from './hooks/usePackagesListing'
import Trigger from '../../components/OverlayTrigger'
import { AdminRoutes } from '../../routes'
import useCheckPermission from '../../utils/checkPermission'
import useEditPackage from './hooks/useEditPackage'
import { toast } from '../../components/Toast'
import PackageUserModal from '../../components/PackageUserModal'
import packageTreeIcon from '../../assets/img/icons/package_tree.png'
import { ConfirmationModal } from '../../components/ConfirmationModal'
import { searchRegEx } from '../../utils/helper'
import Preloader, { InlineLoader } from '../../components/Preloader'
import { serialize } from 'object-to-formdata'

const Packages = () => {

  const [showPackageUser, setShowPackageUser] = useState(false)
  const [selectedPackageId, setSelectedPackageId] = useState(null)

  const {
    loading,
    navigate,
    limit,
    setLimit,
    page,
    setPage,
    setOrderBy,
    sort,
    setSort,
    setSearch,
    search,
    show,
    setShow,
    over,
    setOver,
    data,
    totalPages,
    handleYes,
    selected,
    active,
    setHot,
    setIsActive,
    setIsVisibleInStore,
    handleShow,
    t
  } = usePackagesListing()

  const { isHidden } = useCheckPermission()

  return (
    <>
      <Row>
        <Col>
          <h3>{t('title')}</h3>
        </Col>

        <Col>
          <div className='d-flex justify-content-end'>
            {/* <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px' }}>{t('filters.hot')}</Form.Label>
            <Form.Select size='sm' style={{ marginRight: '15px', minWidth: '120px', maxWidth: '150px' }} onChange={(event) => {
              setPage(1)
              setHot(event.target.value)
            }}>
              {hotOptions.map((status, idx) => (
                <option key={status.label} defaultValue={idx === 0} value={status.value}>{status.label}</option>
              ))}
            </Form.Select> */}
            <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px' }}>{t('filters.status')}</Form.Label>
            <Form.Select size='sm' style={{ marginRight: '15px', minWidth: '120px', maxWidth: '150px' }} onChange={(event) => {
              setPage(1)
              setIsActive(event.target.value)
            }}>
              {statusOptions.map((status, idx) => (
                <option key={status.label} defaultValue={idx === 0} value={status.value}>{status.label}</option>
              ))}
            </Form.Select>
            <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px', overflow: 'visible', whiteSpace: 'nowrap' }}>{t('filters.isVisibleInStore')}</Form.Label>
            <Form.Select size='sm' style={{ marginRight: '15px', minWidth: '120px', maxWidth: '150px' }} onChange={(event) => {
              setPage(1)
              setIsVisibleInStore(event.target.value)
            }}>
              {isVisibleInStoreOptions.map((status, idx) => (
                <option key={status.label} defaultValue={idx === 0} value={status.value}>{status.label}</option>
              ))}
            </Form.Select>
            <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '8px' }}>
            {t('filters.search')}
            </Form.Label>

            <Form.Control
              type='search'
              placeholder='Search By Amount & coins'
              value={search}
              size='sm'
              style={{ minWidth: '190px', maxWidth: '230px', marginRight: '10px', maxHeight: '15px', marginTop: '5px' }}
              onChange={(event) => {
                const mySearch = event.target.value.replace(searchRegEx, '')
                setPage(1)
                setSearch(mySearch)
              }}
            />
            {/* Button to create new admin */}
            <Button
              variant='success'
              className='mb-2 m-1'
              size='sm'
              onClick={() =>
                navigate(AdminRoutes.CreatePackage)}
              hidden={isHidden({ module: { key: 'Package', value: 'C' } })}
            >
              {t('createButton')}
            </Button>
            <Button
                variant='success'
                className='mb-2 m-1'
                size='sm'
                hidden={isHidden({ module: { key: 'Package', value: 'U' } })}
                onClick={() => navigate(AdminRoutes.ReorderPackage)}
              >
                {t('reorderButton')}
              </Button>
          </div>
        </Col>
      </Row>

     {<Table bordered striped responsive hover size='sm' className='text-center mt-4'>
        <thead className='thead-dark'>
          <tr>
            {tableHeaders.map((h, idx) => (
              <th
                key={idx}
                onClick={() => (h.value !== 'action' && h.value !== 'PackageUsers') && setOrderBy(h.value)}
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

        <tbody>
          {data &&
            data?.rows?.map(
              ({
                packageId,
                orderId,
                amount,
                gcCoin,
                scCoin,
                isActive,
                hot,
                packageType,
                isVisibleInStore,
                PackageUsers,
                newPackageType,
                showPackageType
              }) => {
                return (
                  <tr key={packageId}>
                    <td>{packageId}</td>
                    <td>{orderId ? orderId : '-'}</td>
                    <td>
                      <span>
                        {amount}
                      </span>
                    </td>
                    <td>
                        <span>
                          {gcCoin}
                        </span>

                    </td>
                    <td>{scCoin}</td>
                    <td>
                      {isActive
                        ? (
                          <span className='text-success'>{t('activeStatus')}</span>
                        )
                        : (
                          <span className='text-danger'>{t('inActiveStatus')}</span>
                        )}
                    </td>
                    {/* <td>{packageType === 0 ? 'Regular' : packageType === 1 ? 'Best' : packageType === 2 && 'Popular'}</td> */}
                    <td>{packageType}</td>
                    <td>{isVisibleInStore ? 'Yes' : 'No'}</td>
                    <td>{PackageUsers?.length || 0}</td>
                    <td>
                      <>
                        <Trigger message='Edit' id={packageId+'edit'} />
                          <Button
                          id={packageId+'edit'}
                            className='m-1'
                            size='sm'
                            variant='warning'
                            onClick={() =>
                              navigate(
                                `${AdminRoutes.EditPackageDetails.split(':').shift()}${packageId}`
                              )}
                            hidden={isHidden({ module: { key: 'Package', value: 'U' } })}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>

                          {!isActive
                            ? (
                              <>
                                <Trigger message='Set Status Active' id={packageId + 'active'} />
                                <Button
                                  id={packageId + 'active'}
                                  className='m-1'
                                  size='sm'
                                  variant='success'
                                  onClick={() =>
                                    handleShow(packageId, isActive)}
                                >
                                  <FontAwesomeIcon icon={faCheckSquare} />
                                </Button>
                              </>
                            )
                            : (
                              <>
                                <Trigger message='Set Status In-Active' id={packageId + 'inactive'} />
                                <Button
                                  id={packageId + 'inactive'}
                                  className='m-1'
                                  size='sm'
                                  variant='danger'
                                  onClick={() =>
                                    handleShow(packageId, isActive)}
                                >
                                  <FontAwesomeIcon icon={faWindowClose} />
                                </Button>
                              </>
                            )}
                        {PackageUsers?.length > 0 && 
                          (<><Trigger message='View Package Users' id={packageId+'user'} />
                            <Button
                            id={packageId+'user'}
                              className='m-1'
                              size='sm'
                              variant='secondary'
                              style={{ width: '35px' }}
                              onClick={() => {
                                setShowPackageUser(true)
                                setSelectedPackageId(packageId)
                              }
                              }
                              hidden={isHidden({ module: { key: 'Package', value: 'R' } })}
                            >
                              <img height='20px' src={packageTreeIcon} />

                            </Button>
                            </>
                          )}
                      </>
                    </td>
                  </tr>
                )
              }
            )}

          {data?.count === 0 &&
            (
              <tr>
                <td
                  colSpan={9}
                  className='text-danger text-center'
                >
                  {t('noDataFound')}
                </td>
              </tr>
            )}
        </tbody>
      </Table>}
      {loading && <InlineLoader />}
      {data?.count !== 0 &&
        (
          <PaginationComponent
            page={data?.count < page ? setPage(1) : page}
            totalPages={totalPages}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />

        )}

      {show && (
        <ConfirmationModal
          setShow={setShow}
          show={show}
          handleYes={handleYes}
          active={active}
        />
      )}

      {showPackageUser && (
        <PackageUserModal 
          setShow={setShowPackageUser}
          show={showPackageUser}
          packageDetail={data?.rows?.find(ele => ele.packageId === selectedPackageId)}
          navigate={navigate}
        />
      )}
    </>
  )
}

export default Packages