import React from 'react'
import {
  Button,
  Table,
  Row,
  Col,
  Form
} from '@themesberg/react-bootstrap'
import PaginationComponent from '../../../components/Pagination'
import Trigger from '../../../components/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusSquare,
  faMinusSquare
} from '@fortawesome/free-solid-svg-icons'
import { InlineLoader } from '../../../components/Preloader'

const GamesList = ({
  t,
  page,
  limit,
  search,
  setLimit,
  setPage,
  setSearch,
  totalPages,
  masterGames,
  addGame,
  viewGames = false,
  disablePagination = false,
  hasActions = false,
  hasAddGamesAction = false,
  hasRemoveGamesAction = false,
  getProviderName,
  removeGames,
  loading
}) => {
  return (
    <div className='mt-1'>
      <Row className='mb-2'>

        <Col xs='auto'>
          <div className='d-flex justify-content-start '>
            <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px' }}>
              {t('casinoGames.addGames.search')}
            </Form.Label>

            <Form.Control
              type='search'
              value={search}
              placeholder={t('casinoGames.addGames.searchPlaceholder')}
              size='sm'
              style={{ maxWidth: '200px' }}
              onChange={(event) =>
                setSearch(
                  event.target.value.replace(/[~`!$%@^&*#=)()><?]+/g, '')
                )}
            />
          </div>
        </Col>
      </Row>

      <Table bordered striped responsive hover size='sm' className={'text-center'}>
        <thead className='thead-dark'>
          <tr>
            {[
              t('casinoGames.addGames.headers.id'),
              t('casinoGames.addGames.headers.gameName'),
              t('casinoGames.addGames.headers.casinoProvider'),
              t('casinoGames.addGames.headers.rtp'),
              t('casinoGames.addGames.headers.status')
              // t('casinoGames.addGames.headers.actions'),
            ].map((h) => (
              <th key={h}>{h}</th>
            ))}
            {hasActions && <th>{t('casinoGames.addGames.headers.actions')}</th>}
          </tr>
        </thead>

        <tbody>
          {masterGames?.count > 0 &&
                    masterGames?.rows?.map(
                      ({
                        masterCasinoGameId,
                        name,
                        masterCasinoProviderId,
                        isActive,
                        returnToPlayer
                      }) => {
                        return (
                          <tr key={masterCasinoGameId}>
                            <td> {masterCasinoGameId}</td>
                            <td>
                              <Trigger message={name} id={masterCasinoGameId +'name'} />
                                <span
                                id={masterCasinoGameId +'name'}
                                  style={{
                                    width: '300px',
                                    cursor: 'pointer'
                                  }}
                                  className='d-inline-block text-truncate'
                                >
                                  {name}
                                </span>
                            </td>

                            <td>{getProviderName(masterCasinoProviderId)}</td>
                            <td>{returnToPlayer || 'NA'}</td>
                            <td>{isActive ? <span className='text-success'>{t('casinoProvider.activeStatus')}</span> : <span className='text-danger'>{t('casinoProvider.inActiveStatus')}</span>}</td>

                            {hasAddGamesAction && <td>
                              <>
                                <Trigger message='Add this Game' id={masterCasinoGameId +'addGame'} />
                                  <Button
                                  id={masterCasinoGameId +'addGame'}
                                    className='m-1'
                                    size='sm'
                                    variant='success'
                                    onClick={() => addGame({ masterCasinoGameId, name: name })}
                                  >
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                  </Button>
                              </>
                            </td>}

                            {hasRemoveGamesAction && (
                              <td>
                                <>
                                  <Trigger message='Remove this Game' id={masterCasinoGameId+'remove'} />
                                    <Button
                                    id={masterCasinoGameId+'remove'}
                                      className='m-1'
                                      size='sm'
                                      variant='danger'
                                      onClick={() => removeGames(masterCasinoGameId)}
                                    >
                                      <FontAwesomeIcon icon={faMinusSquare} />
                                    </Button>
                                </>
                              </td>
                            )}
                          </tr>
                        )
                      }
          )}
          {masterGames?.count === 0 &&
                      (
                        <tr>
                          <td
                            colSpan={hasActions ? 4 : 3}
                            className='text-danger text-center'
                          >
                            {t('casinoGames.addGames.noData')}
                          </td>
                        </tr>
                      )}
        </tbody>
      </Table>
      {loading && <InlineLoader />}

      {!disablePagination && masterGames?.count !== 0 &&
            (
              <PaginationComponent
                page={masterGames?.count < page ? setPage(1) : page}
                totalPages={totalPages}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
              />
            )}
    </div>
  )
}

export default GamesList
