import React, { useEffect, useState } from 'react'
import useCheckPermission from '../../utils/checkPermission'
import {
    Button,
    Form,
    Row,
    Col,
    Table
  } from '@themesberg/react-bootstrap'
import { AdminRoutes } from '../../routes'
import useBonusListing from './hooks/useBonusListing'
import Preloader, { InlineLoader } from '../../components/Preloader'
import { formatDateYMD } from '../../utils/dateFormatter'
import Trigger from '../../components/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faEdit, faEye, faWindowClose, faTrash } from '@fortawesome/free-solid-svg-icons'
import PaginationComponent from '../../components/Pagination'
import { ConfirmationModal, DeleteConfirmationModal } from '../../components/ConfirmationModal'

const BonusListing = () => {
    const { isHidden } = useCheckPermission()
    const [dataBonus, setDataBonus] = useState([])

    const {
        t,
        navigate,
        limit,
        page,
        search,
        setPage,
        setLimit,
        setSearch,
        bonusTypeFil,
        setBonusTypeFil,
        handleStatusShow,
        statusShow,
        setStatusShow,
        handleDeleteModal,
        status,
        handleYes,
        bonusData,
        totalPages,
        loading,
        active,
        setActive,
        handleDeleteYes,
        deleteModalShow,
        setDeleteModalShow,
        bonus
    } = useBonusListing()

    useEffect(()=>{
      const set = new Set()
      bonusData?.rows?.map((bonus) => {set.add(bonus?.bonusType)})
      setDataBonus(Array.from(set))
    },[bonusData])

    return (
      <>
            <Row>
            <Col xs='9'>
                <h3>{t('title')}</h3>
            </Col>

            {/* <Col xs='3' className='text-end'>
            <Button
                   disabled={dataBonus.find(e => e == 'daily bonus')}
                   variant='success'
                   className='f-right'
                   size='sm'
                   onClick={() => navigate(AdminRoutes.BonusCreate, { state: dataBonus })}
                   hidden={isHidden({ module: { key: 'Bonus', value: 'C' } })}
                   >
                {t('createBtn')}
                </Button>
                </Col> */}
        </Row>
        <Row className='mt-2'>
        <Col xs='12' sm='6' lg='3'>

                {/* <Form.Label style={{ width: '-webkit-fill-available', marginBottom: '0', marginRight: '15px' }}>
                {t('filter.bonusType')}
                </Form.Label>

                <Form.Select
                size='sm'
                style={{ maxWidth: '200px', marginRight: '10px' }}
                value={bonusTypeFil}
                onChange={(event) => {
                    setPage(1)
                    setBonusTypeFil(
                    event.target.value.replace(/[~`!$%^&*#=)()><?]+/g, '')
                    )}
                }
                >
                <option key='' value=''>{t('filter.all')}</option>
                <option key='both' value='both'>{t('filter.both')}</option>
                <option key='sc' value='sc'>{t('filter.sc')}</option>
                <option key='gc' value='gc'>{t('filter.gc')}</option>
                <option key='freespin' value='freespin'>{t('filter.freeSpin')}</option>
                </Form.Select> */}
                
                <Form.Label>
                {t('filter.search')}
                </Form.Label>

                <Form.Control
                type='search'
                value={search}
                placeholder={t('filter.searchPlace')}
                onChange={(event) => {
                    setPage(1)
                    setSearch(
                    event.target.value.replace(/[~`!$%^&*#=)()><?]+/g, '')
                    )}
                }
                />
            </Col>
            <Col xs='12' sm='6' lg='3'>
              <Form.Label>
                  {t('filter.status')}
                  </Form.Label>

                  <Form.Select
                  value={active}
                  onChange={(event) => {
                    setPage(1)
                      setActive(
                      event.target.value.replace(/[~`!$%^&*#=)()><?]+/g, '')
                      )}
                  }
                  >
                  <option key='' value=''>{t('filter.all')}</option>
                  <option key='true' value>{t('filter.active')}</option>
                  <option key='false' value={false}>{t('filter.inActive')}</option>
                  </Form.Select>
            </Col>
        </Row>
        {<Table bordered striped responsive hover size='sm' className='text-center mt-4'>
            <thead className='thead-dark'>
            <tr>
                {[t('headers.id'), t('headers.name'), t('headers.type'), t('headers.day'), t('headers.userCount'), t('headers.validFrom'),  t('headers.status'), t('headers.action')].map((h) => (
                <th key={h}>{h}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {Boolean(bonusData) &&
            bonusData?.rows?.map(
              (bonus) => {
                const { bonusId, bonusName, bonusType, day, validFrom, claimedCount, userCount, isActive } = bonus;
                return (
                  <tr key={bonusId}>
                    <td>{bonusId}</td>
                    <td>{bonusName}</td>
                    <td>{(bonusType).toUpperCase()}</td>
                    <td>{day || '-'}</td>
                    <td>{claimedCount || '-'}</td>
                    <td>{validFrom ? formatDateYMD(validFrom) : '-'}</td>
                    {/* <td>{userCount}</td> */}
                    <td>
                      {isActive
                        ? (
                          <span className='text-success'>{t('filter.active')}</span>
                          )
                        : (
                          <span className='text-danger'>{t('filter.inActive')}</span>
                          )}
                    </td>
                    <td>
                      <Trigger message={t('message.edit')} id={bonusId +'edit'} />
                        <Button
                        id={bonusId +'edit'}
                          className='m-1'
                          size='sm'
                          variant='warning'
                          onClick={() =>
                            navigate(
                              `${AdminRoutes.BonusEdit.split(':').shift()}${bonusId}`
                            )}
                          hidden={isHidden({ module: { key: 'Bonus', value: 'U' } })}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      <Trigger message={t('message.view')} id={bonusId +'view'} />
                        <Button
                        id={bonusId +'view'}
                          className='m-1'
                          size='sm'
                          variant='info'
                          onClick={() =>
                            navigate(
                              `${AdminRoutes.BonusDetails.split(':').shift()}${bonusId}`
                            )}
                          hidden={isHidden({ module: { key: 'Bonus', value: 'R' } })}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>

                      {!isActive
                        ? (
                          <>
                          <Trigger message={t('message.statusActive')} id={bonusId +'active'} />
                            <Button
                            id={bonusId +'active'}
                              className='m-1'
                              size='sm'
                              variant='success'
                              onClick={() =>
                                handleStatusShow(bonus, isActive)}
                              hidden={isHidden({ module: { key: 'Bonus', value: 'T' } })}
                            >
                              <FontAwesomeIcon icon={faCheckSquare} />
                            </Button>
                          </>
                          )
                        : (<>
                          <Trigger message={t('message.statusInactive')} id={bonusId +'inactive'} />
                            <Button
                            id={bonusId +'inactive'}
                              className='m-1'
                              size='sm'
                              variant='danger'
                              onClick={() =>
                                handleStatusShow(bonus, isActive)}
                              hidden={isHidden({ module: { key: 'Bonus', value: 'T' } })}
                            >
                              <FontAwesomeIcon icon={faWindowClose} />
                            </Button>
                            </>
                          )}
                          {/* {(bonusType !== 'welcome bonus' && bonusType !== 'daily bonus') && <><Trigger message={t('message.delete')} id={bonusId +'delete'} />
                              <Button
                              id={bonusId +'delete'}
                                className='m-1'
                                size='sm'
                                variant='danger'
                                hidden={isHidden({ module: { key: 'Bonus', value: 'D' } })}
                                onClick={() => handleDeleteModal(bonusId)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button></>} */}
                    </td>
                  </tr>
                )
              })
            }
            {bonusData?.count === 0 &&
                  (
                    <tr>
                      <td
                        colSpan={6}
                        className='text-danger text-center'
                      >
                        {t('noDataFound')}
                      </td>
                    </tr>
                  )}
            </tbody>
        </Table>}
        {loading && <InlineLoader />}
        {bonusData?.count !== 0 && (
        <PaginationComponent
          page={bonusData?.count < page ? setPage(1) : page}
          totalPages={totalPages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
      {statusShow && 
      <ConfirmationModal
        isBonus={true}
        bonus={bonus}
        setShow={setStatusShow}
        show={statusShow}
        handleYes={handleYes}
        active={status}
      />}
      {deleteModalShow &&
        (
          <DeleteConfirmationModal
            deleteModalShow={deleteModalShow}
            setDeleteModalShow={setDeleteModalShow}
            handleDeleteYes={handleDeleteYes}
          />)}
      </>
    )
}

export default BonusListing