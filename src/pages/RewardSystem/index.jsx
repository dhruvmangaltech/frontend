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
import Trigger from '../../components/OverlayTrigger'
import Preloader, { InlineLoader } from '../../components/Preloader'
import { allowedKeysforOrder, tableHeaders } from './constants'
import useCheckPermission from '../../utils/checkPermission'
import { AdminRoutes } from '../../routes'
import useRewards from './hooks/useRewards'

const RewardSystem = () => {
  const {
    navigate,
    t,
    selected,
    data,handleShow,handleYes,show,setShow,active,
    handleDeleteModal, deleteModalShow, setDeleteModalShow, handleDeleteYes,
    setOrderBy,
    sort,
    over,
    setSort,
    setOver
  } = useRewards()
  const { isHidden } = useCheckPermission()
  // if(loading) return (<Preloader />)
    return (
    <>
      <>
        <Row className='mb-3'>
          <Col sm={8}>
            <h3>VIP/Rewards System</h3>
          </Col>

          <Col sm={4}>
            <div className='d-flex justify-content-start justify-content-sm-end'>
              <Button
                variant='success'
                size='sm'
                style={{ marginRight: '10px' }}
                hidden={isHidden({ module: { key: 'RewardSystem', value: 'C' } })}
                onClick={() =>
                  navigate(AdminRoutes.CreateRewardSystem)}
              >
                Create
              </Button>
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
            {data &&
              data?.rows?.map(
                ({
                  vipTierId,
                  name,
                  boost,
                  rakeback,
                  scRequiredPlay,
                  gcRequiredPurchase,
                  scRequiredMonth,
                  gcRequiredMonth,
                  bonusSc,
                  bonusGc,
                  gradualLoss,
                  level,
                  isActive,
                  liveSupport,
                }) => {
                  return (
                    <tr key={vipTierId}>
                      <td>{vipTierId}</td>
                      <td>{name}</td>
                      <td>{boost}</td>
                      <td>{rakeback}</td>
                      <td>{scRequiredPlay}/{scRequiredMonth}</td>
                      <td>{gcRequiredPurchase}/{gcRequiredMonth}</td>
                      <td>{bonusSc}</td>
                      <td>{bonusGc}</td>
                      <td>{gradualLoss}</td>
                      <td>{level}</td>
                      {/* <td>
                        {isActive
                          ? (
                            <span className='text-success'>{t('createRewardSystem.activeStatus')}</span>
                          )
                          : (
                            <span className='text-danger'>{t('createRewardSystem.inActiveStatus')}</span>
                          )}
                      </td> */}
                      <td>
                        {liveSupport
                          ? (
                            <span className='text-success'>{t('createRewardSystem.yes')}</span>
                          )
                          : (
                            <span className='text-danger'>{t('createRewardSystem.no')}</span>
                          )}
                      </td>

                      <td>
                        <>
                          <Trigger message='Edit' id={vipTierId + 'edit'} />
                          <Button
                            id={vipTierId + 'edit'}
                            className='m-1'
                            size='sm'
                            variant='warning'
                            onClick={() =>
                              navigate(
                                `${AdminRoutes.EditRewardSystem.split(':').shift()}${vipTierId}`
                              )}
                            hidden={isHidden({ module: { key: 'RewardSystem', value: 'U' } })}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          {/* {!isActive
                            ? (
                              <>
                                <Trigger message='Set Status Active' id={vipTierId + 'active'} />
                                <Button
                                  id={vipTierId + 'active'}
                                  className='m-1'
                                  size='sm'
                                  variant='success'
                                  onClick={() =>
                                    handleShow(vipTierId, isActive)}
                                >
                                  <FontAwesomeIcon icon={faCheckSquare} />
                                </Button>
                              </>
                            )
                            : (
                              <>
                                <Trigger message='Set Status In-Active' id={vipTierId + 'inactive'} />
                                <Button
                                  id={vipTierId + 'inactive'}
                                  className='m-1'
                                  size='sm'
                                  variant='danger'
                                  onClick={() =>
                                    handleShow(vipTierId, isActive)}
                                >
                                  <FontAwesomeIcon icon={faWindowClose} />
                                </Button>
                              </>
                            )} */}
                          {/* <Trigger message='Delete' id={vipTierId + 'delete'} />
                          <Button
                            id={vipTierId + 'delete'}
                            className='m-1'
                            size='sm'
                            variant='danger'
                            onClick={() => handleDeleteModal(vipTierId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button> */}
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
        </Table>
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
    </>
  )
}

export default RewardSystem