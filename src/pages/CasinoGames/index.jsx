import React from 'react'
import {
  Row,
  Col,
  Table,
  Form,
  Button,
  ButtonGroup,
  ListGroup,
  Card
} from '@themesberg/react-bootstrap'
import PaginationComponent from '../../components/Pagination'
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faCheckSquare,
  faEdit,
  faTrash,
  faWindowClose
} from '@fortawesome/free-solid-svg-icons'

import Trigger from '../../components/OverlayTrigger'
import { useTranslation } from 'react-i18next'
import Preloader, { InlineLoader } from '../../components/Preloader'
import useCasinoGamesListing from './hooks/useCasinoGamesListing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConfirmationModal, DeleteConfirmationModal } from '../../components/ConfirmationModal'
import EditGames from './components/EditGames'
import { allowedKeysForOrder, tableHeaders } from './constants'
import useCheckPermission from '../../utils/checkPermission'
import { AdminRoutes } from '../../routes'
import UploadGames from './components/uploadGames'

const CasinoGames = () => {
  const {
    limit,
    page,
    loading,
    setLimit,
    setPage,
    totalPages,
    casinoGames,
    casinoCategoryId,
    setCasinoCategoryId,
    subCategories,
    providerId,
    setProviderId,
    casinoProvidersData,
    show,
    setShow,
    handleShow,
    handleYes,
    active,
    handleShowModal,
    showModal,
    type,
    handleClose,
    gameData,
    categoryGameId,
    setDeleteModalShow,
    deleteModalShow,
    handleDeleteYes,
    handleDeleteModal,
    statusFilter,
    setStatusFilter,
    setOrderBy,
    setSort,
    setOver,
    selected,
    sort,
    over,
    getProviderName,
    navigate,
    handleUploadClose,
    showUploadModal,
    uploadGamesLoading,
    uploadGames,
    setShowUploadModal,
    search,
    setSearch
  } = useCasinoGamesListing()
  const { isHidden } = useCheckPermission()
  const { t } = useTranslation('casinoGames')

  return (
    <>
      <>
        <Row>
          <Col xs='12' sm='6'>
            <h3>{t('title')}</h3>
          </Col>
          <Col xs='12' sm='6'>
              <ListGroup.Item>
              <Card.Text className='text-sm-right'>
                <Button
                className='m-1'
                size='sm'
                variant='success'
                onClick={() => setShowUploadModal(true)}
              >
                {t('Upload Games')}
              </Button>
              <Button
              className='m-1'
                variant='success'
                size='sm'
                onClick={() => navigate(AdminRoutes.ReorderGames)}
              >
                {t('reorder')}
              </Button>
              </Card.Text>
            </ListGroup.Item>
            </Col>
        </Row>

        <Row className='mt-3'>
          <Col className='col-12 col-lg-8'>
              <div className='d-flex align-items-center w-100 flex-wrap row p-0 m-auto'>
                <div className='col-12 col-lg-4'>
                <Form.Label column='sm'>
                {t('filter.search.title')}
                </Form.Label>

                <Form.Control
                  type='search'
                  value={search}
                  placeholder={t('filter.search.place')}
                  onChange={(event) => {
                    setPage(1)
                    setSearch(
                      event.target.value.replace(/[~`!$%@^&*#=)()><?]+/g, '')
                    )}}
                />
                </div>
                <div className='col-12 col-lg-4'>
                <Form.Label column='sm'>
                  {t('filter.provider.title')}
                </Form.Label>

                <Form.Select
                  onChange={(e) => { 
                    setPage(1)
                    setProviderId(e.target.value) 
                  }}
                  value={providerId}
                >
                  <option value=''>{t('filter.provider.options.all')}</option>
                  {casinoProvidersData && casinoProvidersData?.rows?.map((c) => (
                    <option key={c?.masterCasinoProviderId} value={c?.masterCasinoProviderId}>{c?.name}</option>
                  ))}

                </Form.Select>
                </div>

                {/* <Form.Label column='sm' style={{marginLeft: '15px', marginBottom: '0', marginRight: '15px', minWidth: 'fit-content' }}>
                  {t('filter.subCategory.title')}
                </Form.Label>

                <Form.Select
                  style={{ marginBottom: '0', marginRight: '15px', maxWidth: '230px' }}
                  value={casinoCategoryId}
                  size='sm'
                  onChange={(e) => {
                    setPage(1)
                    setCasinoCategoryId(e.target.value)
                  }}
                >
                  <option value=''>{t('filter.subCategory.options.all')}</option>

                    {subCategories &&
                    subCategories?.rows?.map(({ name, masterGameSubCategoryId }) => {
                      const subName = (name)?.EN || t('notAvailable')

                      return (
                        <option key={masterGameSubCategoryId} value={masterGameSubCategoryId}>
                          {subName}
                        </option>
                      )
                    })}
                </Form.Select> */}
                <div className='col-12 col-lg-4'>
                <Form.Label column='sm'>
                  {t('filter.status.title')}
                </Form.Label>

                <Form.Select
                  onChange={(e) => { 
                    setPage(1)
                    setStatusFilter(e.target.value) 
                  }}
                  value={statusFilter}
                >
                  <option value=''>{t('filter.status.options.all')}</option>
                  <option value='true'>{t('filter.status.options.active')}</option>
                  <option value='false'>{t('filter.status.options.inActive')}</option>
                </Form.Select>
                </div>
                
              </div>
            </Col>
        </Row>

        

        {<Table bordered striped responsive hover size='sm' className='text-center mt-4'>
          <thead className='thead-dark'>
            <tr>
              {tableHeaders.map((h, idx) => (
                <th
                  key={idx}
                  onClick={() => allowedKeysForOrder.includes(h.value) ? setOrderBy(h.value) : setOrderBy(allowedKeysForOrder[0])}
                  style={{
                    cursor: 'pointer'
                  }}
                  className={
                        selected(h)
                          ? 'border-3 border border-blue'
                          : ''
                      }
                >
                  {t(h.labelKey)} &nbsp;
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
            {casinoGames?.count > 0 &&
                casinoGames?.rows?.map(
                  ({
                    name,
                    isActive,
                    masterCasinoGameId: categoryGameId,
                    thumbnailUrl,
                    masterGameSubCategoryId,
                    MasterGameSubCategory,
                    masterCasinoProviderId,
                    returnToPlayer
                  }, index) => {
                    const subCategoryName = MasterGameSubCategory ? (MasterGameSubCategory?.name)?.EN : t('notAvailable')
                    const categoryName = MasterGameSubCategory?.MasterGameCategory ? MasterGameSubCategory?.MasterGameCategory?.name.EN : t('notAvailable')
                    return (
                      <tr key={categoryGameId}>
                        <td>{categoryGameId}</td>
                        <td>
                          <Trigger message={name} id={categoryGameId} />
                            <span
                            id={categoryGameId}
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
                          <span
                            onClick={() => thumbnailUrl && window.open(thumbnailUrl)}
                            className='text-link'
                            style={{ cursor: 'pointer' }}
                          >
                            { thumbnailUrl ? t('viewThumbnail') : t('notAvailable')}
                              </span>
                            </td>

                            <td>
                              {isActive
                                ? (
                                  <span className='text-success'>{t('active')}</span>
                                  )
                                : (
                                  <span className='text-danger'>{t('inActive')}</span>
                                  )}
                            </td>

                            <td>{getProviderName(masterCasinoProviderId)}</td>
                            <td>{returnToPlayer != null ? returnToPlayer : '-'}</td>
                            {/* <td>
                              {subCategoryName}
                              {MasterGameSubCategory && 
                              (MasterGameSubCategory?.isActive
                                ? <span className='text-success'>({t('active')})</span>
                                : <span className='text-danger'>({t('inActive')})</span>
                               ) }                    
                            </td> 

                            <td>
                              {categoryName}
                              {MasterGameSubCategory?.MasterGameCategory && 
                              (MasterGameSubCategory?.MasterGameCategory?.isActive
                                ? <span className='text-success'>({t('active')})</span>
                                : <span className='text-danger'>({t('inActive')})</span>
                               ) }    
                            </td> */}
                           

                            <td>
                              <>
                                <Trigger message={t('trigger.edit')} id={categoryGameId+'edit'} />
                              <Button
                              id={categoryGameId+'edit'}
                                className='m-1'
                                size='sm'
                                variant='warning'
                                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'U' } })}
                                onClick={() => {
                                  handleShowModal('Edit', casinoGames?.rows[index], categoryGameId)
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>

                            {!isActive
                              ? (
                                <>
                                <Trigger message={t('trigger.activeStatus')} id={categoryGameId+'active'} />
                                  <Button
                                  id={categoryGameId+'active'}
                                    className='m-1'
                                    size='sm'
                                    variant='success'
                                    hidden={isHidden({ module: { key: 'CasinoManagement', value: 'T' } })}
                                    onClick={() =>
                                      handleShow(categoryGameId, isActive)}
                                  >
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                  </Button>
                                </>
                                )
                              : (
                                <>
                                <Trigger message={t('trigger.inActiveStatus')} id={categoryGameId+'inactive'} />
                                  <Button
                                  id={categoryGameId+'inactive'}
                                    className='m-1'
                                    size='sm'
                                    variant='danger'
                                    hidden={isHidden({ module: { key: 'CasinoManagement', value: 'T' } })}
                                    onClick={() =>
                                      handleShow(categoryGameId, isActive)}
                                  >
                                    <FontAwesomeIcon icon={faWindowClose} />
                                  </Button>
                                </>
                                )}

                            <Trigger message={t('trigger.delete')} id={categoryGameId+'delete'} />
                              <Button
                              id={categoryGameId+'delete'}
                                className='m-1'
                                size='sm'
                                variant='danger'
                                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'D' } })}
                                onClick={() => handleDeleteModal(categoryGameId)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                          </>
                        </td>
                      </tr>
                    )
                  }
                )}

            {casinoGames?.count === 0 &&
                  (
                    <tr>
                      <td
                        colSpan={8}
                        className='text-danger text-center'
                      >
                        {t('noDataFound')}
                      </td>
                    </tr>
                  )}
          </tbody>
        </Table>}
        {loading && <InlineLoader />}
        {casinoGames?.count !== 0 &&
        (
          <PaginationComponent
            page={casinoGames?.count < page ? setPage(1) : page}
            totalPages={totalPages}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </>

      {show && (
        <ConfirmationModal
          setShow={setShow}
          show={show}
          handleYes={handleYes}
          active={active}
        />
      )}

      {deleteModalShow &&
        (
          <DeleteConfirmationModal
            deleteModalShow={deleteModalShow}
            setDeleteModalShow={setDeleteModalShow}
            handleDeleteYes={handleDeleteYes}
          />)}

      {categoryGameId !== null && 
        <EditGames
          handleClose={handleClose}
          show={showModal}
          gameData={gameData}
          type={type}
          subCategories={subCategories}
          limit={limit}
          pageNo={page}
          casinoCategoryId={casinoCategoryId}
          statusFilter={statusFilter}
          providerId={providerId}
        />}
      <UploadGames
        t={t}
        handleClose={handleUploadClose}
        show={showUploadModal}
        loading={uploadGamesLoading}
        casinoProviders={casinoProvidersData}
        uploadGames={uploadGames}
      />

    </>

  )
}

export default CasinoGames
