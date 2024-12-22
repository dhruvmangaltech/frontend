import {
    Button,
    Row,
    Col,
    Table,
  } from '@themesberg/react-bootstrap'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  
  import React from 'react'
  import PaginationComponent from '../../components/Pagination'
  import {
    faCheckSquare,
    faWindowClose,
    faEdit,
    faArrowCircleUp,
    faArrowCircleDown,
    faBan,
    faTrash
  } from '@fortawesome/free-solid-svg-icons'
  import Trigger from '../../components/OverlayTrigger'
  import { InlineLoader } from '../../components/Preloader'
  import useCheckPermission from '../../utils/checkPermission'
  import { tableHeaders } from './constants'
import { useGetPaymentProviderListingQuery } from '../../reactQuery/hooks/customQueryHook'
import { useTranslation } from 'react-i18next'
  
  const PaymentProviders = () => {
    // const {
    //   limit,
    //   setLimit,
    //   page,
    //   setPage,
    //   show,
    //   statusShow,
    //   setStatusShow,
    //   data,
    //   type,
    //   casinoProvidersData,
    //   totalPages,
    //   handleClose,
    //   handleShow,
    //   handleStatusShow,
    //   handleYes,
    //   loading,
    //   createUpdateLoading,
    //   status,
    //   t,
    //   createProvider,
    //   updateProvider,
    //   navigate,
    //   setOrderBy,
    //   selected,
    //   sort,
    //   setSort,
    //   over,
    //   setOver,
    //   handleDeleteModal,
    //   deleteModalShow,
    //   setDeleteModalShow,
    //   handleDeleteYes
    // } = useProviderListing()

    const { data , isLoading : loading } = useGetPaymentProviderListingQuery()
    const { t } = useTranslation('payment')

    const { isHidden } = useCheckPermission()
    return (
      <>
        <>
          <Row>
            <Col sm={7}>
              <h3>{t('paymentProvider.title')}</h3>
            </Col>

          </Row>
  
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
                className= ''
              >
                {t(h.labelKey)}{' '}
              </th>
              ))}
            </tr>
          </thead>
  
          <tbody>
              {data &&
                    data?.map(
                      (
                        {
                          providerId,
                          providerName,
                          isActive,
                        },
                        index
                      ) => {
                        return (
                          <tr key={providerId}>
                            <td>{providerId}</td>
                            <td>
                              <Trigger message={providerName} id={providerId + 'name'} />
                                <span
                                id={providerId + 'name'}
                                  style={{
                                    width: '100px',
                                    cursor: 'pointer'
                                  }}
                                  className='d-inline-block text-truncate'
                                >
                                  {providerName}
                                </span>
                            </td>
  
                            <td>
                              {/* {isActive
                                ? (
                                  <span className='text-success'>{t('paymentProvider.activeStatus')}</span>
                                  )
                                : (
                                  <span className='text-danger'>{t('paymentProvider.inActiveStatus')}</span>
                                  )} */}
                                <span className='text-success'>{t('paymentProvider.activeStatus')}</span>
                            </td>
                            {/* <td>
                              {(!isHidden({ module: { key: 'CasinoManagement', value: 'U' } }) || !isHidden({ module: { key: 'CasinoManagement', value: 'T' } }))
                                ? (
                                  <>
                                    {!isActive
                                      ? (
                                        <>
                                        <Trigger message='Set Status Active' id={providerId + 'active'} />
                                          <Button
                                          id={providerId + 'active'}
                                            className='m-1'
                                            size='sm'
                                            variant='success'
                                            onClick={() =>
                                              handleStatusShow(
                                                providerId,
                                                isActive
                                              )}
                                            hidden={isHidden({ module: { key: 'CasinoManagement', value: 'T' } })}
                                          >
                                            <FontAwesomeIcon icon={faCheckSquare} />
                                          </Button>
                                        </>
                                        )
                                      : (
                                        <>
                                        <Trigger message='Set Status In-Active' id={masterCasinoProviderId + 'inactive'} />
                                          <Button
                                          id={masterCasinoProviderId + 'inactive'}
                                            className='m-1'
                                            size='sm'
                                            variant='danger'
                                            onClick={() =>
                                              handleStatusShow(
                                                masterCasinoProviderId,
                                                isActive
                                              )}
                                            hidden={isHidden({ module: { key: 'CasinoManagement', value: 'T' } })}
                                          >
                                            <FontAwesomeIcon icon={faWindowClose} />
                                          </Button>
                                        </>
                                        )}
                                  </>)
                                : 'NA'}
                            </td> */}
                          </tr>
                        )
                      }
                    )}
  
              {
                    data?.length === 0 &&
                      (
                        <tr>
                          <td
                            colSpan={5}
                            className='text-danger text-center'
                          >
                            {t('paymentProvider.noDataFound')}
                          </td>
                        </tr>
                      )
                  }
            </tbody>
          </Table>
          {loading && <InlineLoader />}
          {/* {data?.length !== 0 &&
          (
            <PaginationComponent
              page={data?.length < page ? setPage(1) : page}
              totalPages={totalPages}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          )} */}
  
          {/* <ConfirmationModal
            setShow={setStatusShow}
            show={statusShow}
            handleYes={handleYes}
            active={status}
          /> */}
        </>
      </>
    )
  }
  
  export default PaymentProviders;