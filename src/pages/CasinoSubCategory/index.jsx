import React from 'react'
import {
  Button,
  Row,
  Col,
  Table,
  ButtonGroup,
  Form
} from '@themesberg/react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaginationComponent from '../../components/Pagination'
import { ConfirmationModal, DeleteConfirmationModal } from '../../components/ConfirmationModal'
import {
  faCheckSquare,
  faEdit,
  faWindowClose,
  faPlusSquare,
  faArrowCircleUp,
  faArrowCircleDown,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import CreateSubCategory from './components/CreateSubCategory'
import useCasinoSubCategoriesListing from './hooks/useCasinoSubCategoriesListing'
import Trigger from '../../components/OverlayTrigger'
import Preloader, { InlineLoader } from '../../components/Preloader'
import { allowedKeysforOrder, tableHeaders } from './constants'
import useCheckPermission from '../../utils/checkPermission'
import { AdminRoutes } from '../../routes'

const CasinoSubCategory = () => {
  const {
    t,
    limit,
    page,
    loading,
    subCategories,
    casinoCategories,
    show,
    setLimit,
    setPage,
    setShow,
    totalPages,
    handleShow,
    handleYes,
    handleShowModal,
    showModal,
    type,
    handleClose,
    selectedSubCategory,
    setSelectedSubCategory,
    search,
    setSearch,
    setCategoryFilter,
    categoryFilter,
    active,
    navigate,
    statusFilter,
    setStatusFilter,
    setOrderBy,
    setSort,
    setOver,
    selected,
    sort,
    over,
    handleDeleteModal,
    handleDeleteYes,
    deleteModalShow,
    setDeleteModalShow
  } = useCasinoSubCategoriesListing()
  const { isHidden } = useCheckPermission()
  // if(loading) return (<Preloader />)
  return (
    <>
      <>
        <Row className='mb-3'>
          <Col sm={8}>
            <h3>{t('casinoSubCategory.title')}</h3>
          </Col>

          <Col sm={4}>
            <div className='d-flex justify-content-start justify-content-sm-end'>
              <Button
                variant='success'
                size='sm'
                style={{ marginRight: '10px' }}
                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'C' } })}
                onClick={() => handleShowModal('Create')}
              >
                {t('casinoSubCategory.createButton')}
              </Button>

              <Button
                variant='success'
                size='sm'
                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'U' } })}
                onClick={() => navigate(AdminRoutes.ReorderCasinoSubCategories)}
              >
                {t('casinoSubCategory.reorder')}
              </Button>
            </div>
          </Col>
        </Row>

        <Row className='mb-3 w-100 m-auto'>
          <Col xs='12' lg='auto'>
            <div className='d-flex justify-content-start align-items-center w-100 mb-2 flex-wrap'>
              <Form.Label column='sm' style={{ marginBottom: '0', marginRight: '15px' }}>
              {t('casinoSubCategory.filters.category')}
              </Form.Label>

              <Form.Select
                value={categoryFilter}
                onChange={(e) => {
                  setPage(1)
                  setCategoryFilter(e.target.value)
                }}
                style={{ minWidth: '230px' }}
              >
                <option value=''>{t('casinoSubCategory.filters.all')}</option>

                {casinoCategories && casinoCategories?.rows?.map((c) => (
                  <option key={c?.masterGameCategoryId} value={c?.masterGameCategoryId}>{c?.name?.EN}</option>
                ))}
              </Form.Select>
            </div>
          </Col>

          <Col xs='12' lg='auto'>
            <div className='d-flex justify-content-start align-items-center w-100 flex-wrap'>
              <Form.Label column='sm' style={{ marginBottom: '0', marginRight: '15px' }}>
              {t('casinoSubCategory.filters.status')}
              </Form.Label>

              <Form.Select
                onChange={(e) => { 
                  setPage(1)
                  setStatusFilter(e.target.value)
                }}
                value={statusFilter}
                style={{ minWidth: '230px' }}
              >
                <option value='all'>{t('casinoSubCategory.filters.all')}</option>
                <option value='true'>{t('casinoSubCategory.filters.active')}</option>
                <option value='false'>{t('casinoSubCategory.filters.inactive')}</option>
              </Form.Select>
            </div>
          </Col>

          <Col xs='12' lg='auto' className='mt-2 mt-lg-0'>
            <div className='d-flex justify-content-start align-items-center w-100 flex-wrap'>
              <Form.Label column='sm' style={{ marginBottom: '0', marginRight: '15px' }}>
              {t('casinoSubCategory.filters.search')}
              </Form.Label>

              <Form.Control
                type='search'
                value={search}
                placeholder={t('casinoSubCategory.filters.searchPlace')}
                onChange={(event) => {
                  setPage(1)
                  setSearch(
                    event.target.value.replace(/[~`!$%@^&*#=)()><?]+/g, '')
                  )}}
                style={{ minWidth: '230px' }}
              />
            </div>
          </Col>
        </Row>

        <Table bordered striped responsive hover size='sm' className='text-center mt-3'>
          <thead className='thead-dark'>
            <tr>
              {tableHeaders.map((h, idx) => (
                <th
                  key={idx}
                  onClick={() => allowedKeysforOrder.includes(h.value) && setOrderBy(h.value)}
                  style={{
                    cursor: 'pointer'
                  }}
                  className={
                        selected(h)
                          ? 'border-3 border border-secondary'
                          : ''
                      }
                >
                  {t(h.label)} &nbsp;
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
            {subCategories?.count > 0 &&
                subCategories?.rows?.map(
                  ({
                    name,
                    MasterGameCategory: { name: categoryName },
                    isActive,
                    masterGameSubCategoryId,
                    imageUrl,
                    masterGameCategoryId,
                    orderId,
                    isFeatured
                  }, i) => {
                    const subName = (name)?.EN || 'NA'
                    return (
                      <tr key={masterGameSubCategoryId}>
                        <td>{masterGameSubCategoryId}</td>
                        <td>
                          <Trigger message={subName} id={i + 'sub'} />
                            <span
                            id={i + 'sub'}
                              style={{
                                width: '100px',
                                cursor: 'pointer'
                              }}
                              className='d-inline-block text-truncate'
                            >
                              {subName}
                            </span>
                        </td>

                        <td>{orderId}</td>

                        <td>
                          {isActive
                            ? (
                              <span className='text-success'>{t('casinoSubCategory.activeStatus')}</span>
                              )
                            : (
                              <span className='text-danger'>{t('casinoSubCategory.inActiveStatus')}</span>
                              )}
                        </td>

                        <td>
                          {imageUrl
                          ? (
                            <span
                              onClick={() => window.open(imageUrl)}
                              className='text-link'
                              style={{ cursor: 'pointer' }}
                            >
                              {t('casinoSubCategory.viewHere')}
                            </span>
                            )
                          : (
                            <span className='text-danger'>
                              {t('casinoSubCategory.noImageAvailable')}
                            </span>
                          )}
                        </td>

                        <td>
                          <Trigger message={categoryName?.EN} id={i + 'name'} />
                            <span
                            id={i + 'sub'}
                              style={{
                                width: '100px',
                                cursor: 'pointer'
                              }}
                              className='d-inline-block text-truncate'
                            >
                              {categoryName?.EN}
                            </span>
                        </td>

                        <td>
                          {isFeatured ? 'Yes' : 'No'}
                        </td>

                        <td>
                          <>
                            <Trigger message='Edit' id={i + 'edit'} />
                              <Button
                              id={i + 'edit'}
                                className='m-1'
                                size='sm'
                                variant='warning'
                                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'U' } })}
                                onClick={() => {
                                  setSelectedSubCategory({
                                    masterGameCategoryId,
                                    masterGameSubCategoryId,
                                    name,
                                    isActive,
                                    imageUrl,
                                    isFeatured
                                  })
                                  handleShowModal('Edit')
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>

                            <Trigger message='View Games to this sub category' id={i + 'addgame'} />
                              <Button
                                id={i + 'addgame'}
                                className='m-1'
                                size='sm'
                                variant='dark'
                                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'U' } })}
                                onClick={() =>
                                  navigate(
                                    `${AdminRoutes.AddSubCategoryGames.split(':').shift()}${masterGameSubCategoryId}`,
                                    { state: { subCategoryName: subName } }
                                  )}
                              >
                                <FontAwesomeIcon icon={faPlusSquare} />
                              </Button>

                            {!isActive
                              ? (
                                <>
                                <Trigger message='Set Status Active' id={i + 'active'} />
                                  <Button
                                  id={i + 'active'}
                                    className='m-1'
                                    size='sm'
                                    variant='success'
                                    hidden={isHidden({ module: { key: 'CasinoManagement', value: 'T' } })}
                                    onClick={() =>
                                      handleShow(masterGameSubCategoryId, isActive)}
                                  >
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                  </Button>
                                  </>
                                )
                              : (
                                <>
                                <Trigger message='Set Status In-Active' id={i + 'inactive'} />
                                  <Button
                                  id={i + 'inactive'}
                                    className='m-1'
                                    size='sm'
                                    variant='danger'
                                    hidden={isHidden({ module: { key: 'CasinoManagement', value: 'T' } })}
                                    onClick={() =>
                                      handleShow(masterGameSubCategoryId, isActive)}
                                  >
                                    <FontAwesomeIcon icon={faWindowClose} />
                                  </Button>
                                </>
                                )}

                            <Trigger message='Delete' id={i + 'delete'} />
                              <Button
                              id={i + 'delete'}
                                className='m-1'
                                size='sm'
                                variant='danger'
                                hidden={isHidden({ module: { key: 'CasinoManagement', value: 'D' } })}
                                onClick={() => handleDeleteModal(masterGameSubCategoryId)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                          </>
                        </td>
                      </tr>
                    )
                  }
                )}

            {subCategories?.count === 0 &&
                  (
                    <tr>
                      <td
                        colSpan={7}
                        className='text-danger text-center'
                      >
                        {t('casinoSubCategory.noDataFound')}
                      </td>
                    </tr>
                  )}
          </tbody>
        </Table>
        {loading && <InlineLoader />}
        {subCategories?.count !== 0 &&
        (
          <PaginationComponent
            page={subCategories?.count < page ? setPage(1) : page}
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

      {type === 'Edit'
        ? (
            selectedSubCategory && (
              <CreateSubCategory
                selectedSubCategory={selectedSubCategory}
                handleClose={handleClose}
                limit={limit}
                pageNo={page}
                showModal={showModal}
                type={type}
                search={search}
                categoryFilter={categoryFilter}
                statusFilter={statusFilter}
                casinoCategories={casinoCategories}
              />
            )
          )
        : (
          <CreateSubCategory
            handleClose={handleClose}
            limit={limit}
            pageNo={page}
            showModal={showModal}
            type={type}
            search={search}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            casinoCategories={casinoCategories}
          />
          )}
    </>
  )
}

export default CasinoSubCategory