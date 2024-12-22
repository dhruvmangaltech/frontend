/*
Filename: Players/index.js
Description: View List of all users.
Author: uchouhan
Created at: 2023/03/03
Last Modified: 2023/03/30
Version: 0.1.0
*/
import React, { useState } from 'react'
import { Row, Col, Card, Form, Button, Table, Tabs, Tab } from '@themesberg/react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCheckSquare, faWindowClose, faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import usePlayerListing from './usePlayerListing'
import Skeleton from 'react-loading-skeleton'
import PaginationComponent from '../../components/Pagination'
import { kycStatusOption } from '../PlayerDetails/constants'
import { AdminRoutes } from '../../routes'
import { tableHeaders } from './constants'
import { InlineLoader } from '../../components/Preloader'
import Trigger from '../../components/OverlayTrigger'
import useCheckPermission from '../../utils/checkPermission'
import { ConfirmationModal } from '../../components/ConfirmationModal'
import PlayerSearch from './PlayerSearch'
import { formatDateMDY } from '../../utils/dateFormatter'


const Players = () => {
  const { t, navigate, selected, loading, sort, setStatusShow, statusShow, handleYes, status,
    setSort, over, setOver, playersData, search, setSearch, totalPages, page, setPage, limit, setLimit, setKycOptions, setOrderBy, handleStatusShow,
    globalSearch,
    setGlobalSearch
  } = usePlayerListing();
 
    const { isHidden } = useCheckPermission()
    const [selectedTab, setSelectedTab] = useState('playerSearch')

  return (
    <>
      <Card className='p-2 mb-2'>
        <Row>
          <Col>
            <h3>{t('title')}</h3>
          </Col>
          {/* <Col>
            <div className='d-flex justify-content-end align-items-center'>
              <Form.Label  style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px' }}>{t('kycStatus')}</Form.Label>
              <Form.Select size='sm' style={{ marginRight: '15px', maxWidth: '150px' }} onChange={(event) => {
                setPage(1)
                setKycOptions(event.target.value === 'ALL' ? '': event.target.value)
              }}>
                {kycStatusOption.map((status, idx) => (
                  <option key={status.label} defaultValue={idx === 0} value={status.value}>{status.label}</option>
                ))}
              </Form.Select>
              <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px' }}>
                {t('search')}
              </Form.Label>
              <Form.Control
                type='search'
                placeholder='Search By Email, Name'
                size='sm'
                style={{ maxWidth: '230px', marginRight: '10px', maxHeight: '15px' }}
                value={search}
                onChange={(event) => {
                  setPage(1)
                  setSearch(
                    event.target.value.replace(/[~`!$%^&*#=)()><?]+/g, '')
                  )}
                }
              />
            </div>
          </Col> */}
        </Row>
        <PlayerSearch
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
                {playersData && playersData?.rows.map((player) => { return (
                <tr key={player.userId}
                onContextMenu={(e) => {
                  e.preventDefault();
                  const contextMenu = document.getElementById(`contextMenu-${player.userId}`);
                  contextMenu.style.top = `${e.clientY}px`;
                  contextMenu.style.left = `${e.clientX}px`;
                  contextMenu.style.display = 'block';
                }}>
                  <td>{player.userId}</td>
                  <td>{player.email}</td>
                  <td>{player.created_at ? formatDateMDY(player.created_at) : 'NA'}</td>
                  <td>{player.username || 'NA'}</td>
                  <td className='text-link' style={{cursor: 'pointer'}} 
                    onClick={() => {
                      navigate(
                        `${AdminRoutes.PlayerDetails.split(':').shift()}${player.userId}`
                      )
                    }}>
                    {(player.firstName && player.lastName) ? `${player.firstName} ${player.lastName}` : 'NA'}
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
                          `${AdminRoutes.PlayerDetails.split(':').shift()}${player.userId}`
                        )
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button> 
                    <div
      id={`contextMenu-${player.userId}`}
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
            `${AdminRoutes.PlayerDetails.split(':').shift()}${player.userId}`,
            '_blank'
          );
          document.getElementById(`contextMenu-${player.userId}`).style.display = 'none';
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
                     {!player.isActive
                                    ? (
                                      <>
                                      <Trigger message='Set Status Active' id={player.userId + 'active'} />
                                        <Button
                                        id={player.userId + 'active'}
                                          className='m-1'
                                          size='sm'
                                          variant='success'
                                          onClick={() =>
                                            handleStatusShow(
                                              player.userId,
                                              player.isActive
                                            )}
                                          hidden={isHidden({ module: { key: 'Users', value: 'T' } })}
                                        >
                                          <FontAwesomeIcon icon={faCheckSquare} />
                                        </Button>
                                      </>
                                      )
                                    : (
                                      <>
                                      <Trigger message='Set Status In-Active' id={player.userId + 'inactive'} />
                                        <Button
                                        id={player.userId + 'inactive'}
                                          className='m-1'
                                          size='sm'
                                          variant='danger'
                                          onClick={() =>
                                            handleStatusShow(
                                              player.userId,
                                              player.isActive
                                            )}
                                          hidden={isHidden({ module: { key: 'Users', value: 'T' } })}
                                        >
                                          <FontAwesomeIcon icon={faWindowClose} />
                                        </Button>
                                      </>
                                      )}
                    </>
                  </td>
                </tr>
              )})  
              }

            {playersData?.rows?.length === 0 && !loading && 
            <tr>
            <td colSpan={6} className='text-danger text-center'>
              {t('noDataFound')}
            </td>
          </tr>}
              </tbody>}
            </Table>
            {loading && <InlineLoader />}
            {playersData?.rows?.length !== 0 && (
              <PaginationComponent
                page={playersData?.count < page ? setPage(1) : page}
                totalPages={totalPages}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
              />
            )}
      </Card>
      <ConfirmationModal
          setShow={setStatusShow}
          show={statusShow}
          handleYes={handleYes}
          active={status}
        />
    </>
  )
}
export default Players