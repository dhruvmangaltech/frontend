import {
  Button,
  Row,
  Col,
  Table,
  ButtonGroup
} from '@themesberg/react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import PaginationComponent from '../../components/Pagination'
import CreateCasinoProviders from './components/CreateCasinoProvider'
import { ConfirmationModal, DeleteConfirmationModal } from '../../components/ConfirmationModal'
import {
  faCheckSquare,
  faWindowClose,
  faEdit,
  faArrowCircleUp,
  faArrowCircleDown,
  faBan,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import useProviderListing from './useProviderListing'
import Trigger from '../../components/OverlayTrigger'
import Preloader, { InlineLoader } from '../../components/Preloader'
import useCheckPermission from '../../utils/checkPermission'
import { AdminRoutes } from '../../routes'
import { tableHeaders } from './constants'

const CasinoProviders = () => {
  const {
    limit,
    setLimit,
    page,
    setPage,
    show,
    statusShow,
    setStatusShow,
    data,
    type,
    casinoProvidersData,
    totalPages,
    handleClose,
    handleShow,
    handleStatusShow,
    handleYes,
    loading,
    createUpdateLoading,
    status,
    t,
    createProvider,
    updateProvider,
    navigate,
    setOrderBy,
    selected,
    sort,
    setSort,
    over,
    setOver,
    handleDeleteModal,
    deleteModalShow,
    setDeleteModalShow,
    handleDeleteYes
  } = useProviderListing()
  const { isHidden } = useCheckPermission()
  return (
    <>
      <>
        <Row>
          <Col sm={7}>
            <h3>{t('casinoProvider.title')}</h3>
          </Col>

          <Col sm={5}>
            <div className='text-right mb-2'>
              <Button
                variant='success'
                className='f-right'
                size='sm'
                onClick={() => handleShow('Create', null)}
                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'C' } })}
              >
                {t('casinoProvider.createButton')}
              </Button>
            </div>
          </Col>
        </Row>

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

        <tbody>
            {casinoProvidersData &&
                  casinoProvidersData?.rows?.map(
                    (
                      {
                        masterCasinoProviderId,
                        name,
                        isActive,
                        thumbnailUrl
                      },
                      index
                    ) => {
                      return (
                        <tr key={masterCasinoProviderId}>
                          <td>{masterCasinoProviderId}</td>
                          <td>
                            <Trigger message={name} id={masterCasinoProviderId + 'name'} />
                              <span
                              id={masterCasinoProviderId + 'name'}
                                style={{
                                  width: '100px',
                                  cursor: 'pointer'
                                }}
                                className='d-inline-block text-truncate'
                              >
                                {name}
                              </span>
                          </td>

                          <td>
                            {thumbnailUrl
                              ? (
                                <span
                                  onClick={() => window.open(thumbnailUrl)}
                                  className='text-link'
                                  style={{ cursor: 'pointer' }}
                                >
                                  {t('casinoProvider.viewHere')}
                                </span>
                                )
                              : (
                                <span className='text-danger'>
                                  {t('casinoProvider.noImageAvailable')}
                                </span>
                                )}
                          </td>

                          <td>
                            {isActive
                              ? (
                                <span className='text-success'>{t('casinoProvider.activeStatus')}</span>
                                )
                              : (
                                <span className='text-danger'>{t('casinoProvider.inActiveStatus')}</span>
                                )}
                          </td>
                          <td>
                            {(!isHidden({ module: { key: 'CasinoManagement', value: 'U' } }) || !isHidden({ module: { key: 'CasinoManagement', value: 'T' } }))
                              ? (
                                <>
                                  <Trigger message='Edit' id={masterCasinoProviderId + 'edit'} />

                                    <Button
                                    id={masterCasinoProviderId + 'edit'}
                                      className='m-1'
                                      size='sm'
                                      variant='warning'
                                      onClick={() =>
                                        handleShow(
                                          'Edit',
                                          casinoProvidersData?.rows[index]
                                        )}
                                      hidden={isHidden({ module: { key: 'CasinoManagement', value: 'U' } })}
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </Button>

                                  {!isActive
                                    ? (
                                      <>
                                      <Trigger message='Set Status Active' id={masterCasinoProviderId + 'active'} />
                                        <Button
                                        id={masterCasinoProviderId + 'active'}
                                          className='m-1'
                                          size='sm'
                                          variant='success'
                                          onClick={() =>
                                            handleStatusShow(
                                              masterCasinoProviderId,
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

                                  <Trigger message='View Blocked Countries' id={masterCasinoProviderId + 'coun'} />
                                    <Button
                                    id={masterCasinoProviderId + 'coun'}
                                      className='m-1'
                                      size='sm'
                                      variant='secondary'
                                      hidden={isHidden({ module: { key: 'CasinoManagement', value: 'U' } })}
                                      onClick={() => navigate(`${AdminRoutes.RestrictedProviderCountries.split(':').shift()}${masterCasinoProviderId}`)}
                                    >
                                      <FontAwesomeIcon icon={faBan} />
                                    </Button>
                                    <Trigger message={'Delete'} id={masterCasinoProviderId +'delete'} />
                                    <Button
                                    id={masterCasinoProviderId +'delete'}
                                      className='m-1'
                                      size='sm'
                                      variant='danger'
                                      hidden={isHidden({ module: { key: 'CasinoManagement', value: 'D' } })}
                                      onClick={() => handleDeleteModal(masterCasinoProviderId)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </>)
                              : 'NA'}
                          </td>
                        </tr>
                      )
                    }
                  )}

            {
                  casinoProvidersData?.count === 0 &&
                    (
                      <tr>
                        <td
                          colSpan={5}
                          className='text-danger text-center'
                        >
                          {t('casinoProvider.noDataFound')}
                        </td>
                      </tr>
                    )
                }
          </tbody>
        </Table>
        {loading && <InlineLoader />}
        {casinoProvidersData?.count !== 0 &&
        (
          <PaginationComponent
            page={casinoProvidersData?.count < page ? setPage(1) : page}
            totalPages={totalPages}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        )}

        <ConfirmationModal
          setShow={setStatusShow}
          show={statusShow}
          handleYes={handleYes}
          active={status}
        />
        {deleteModalShow &&
        (
          <DeleteConfirmationModal
            deleteModalShow={deleteModalShow}
            setDeleteModalShow={setDeleteModalShow}
            handleDeleteYes={handleDeleteYes}
          />)}
      </>
      <CreateCasinoProviders
        t={t}
        handleClose={handleClose}
        data={data}
        type={type}
        show={show}
        loading={createUpdateLoading}
        createProvider={createProvider}
        updateProvider={updateProvider}
      />
    </>
  )
}

export default CasinoProviders;