import React from 'react'
import useCasinoTransactionsList from '../hooks/useCasinoTransactionsList'
import Preloader from '../../../components/Preloader'
import { Button, Col, Row, Form } from '@themesberg/react-bootstrap'
import DateRangePicker from '../../../components/DateRangePicker'
import { getDateDaysAgo } from '../../../utils/dateFormatter'
import { toast } from '../../../components/Toast'
import Trigger from '../../../components/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { actionTypeOptions, coinTypeOptions, statusOptions } from '../constants'
import CasinoTransactionsList from '../../../components/CasinoTransactionsList'

const CasinoTransactions = ({ email, isAllUser }) => {
  const {
    t,
    setSelectedCurrency,
    setLimit,
    setPage,
    totalPages,
    limit,
    page,
    setSelectedAction,
    selectedCurrency,
    selectedAction,
    state,
    setState,
    transactionData,
    loading,
    status,
    setStatus,
    getCsvDownloadUrl,
    search,
    setSearch
  } = useCasinoTransactionsList(email)

  return (
    <>
      {isAllUser && <Row className='mb-3'>
        <Col sm={12}>
          <h3>{t('transactions.casinoTransactions')}</h3>
        </Col>
      </Row>}
      <Row className='w-100 m-auto'>
      {isAllUser &&
        <Col xs='12' sm='6' lg='3' className='mb-3'>
            <Form.Label style={{ marginBottom: '0', marginRight: '15px', marginTop: '5px' }}>
            {t('transactions.filters.search')}
            </Form.Label>

            <Form.Control
              type='search'
              value={search}
              placeholder='Search By Email'
              onChange={(event) => {
                setPage(1)
                setSearch(
                  event.target.value.replace(/[~`!$%^&*#=)()><?]+/g, '')
                )}
              }
            />
        </Col>}

        <Col xs='12' sm='6' lg='2' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            {t('history.filters.coinType')}
          </Form.Label>

          <Form.Select
            onChange={(e) => {
              setPage(1)
              setSelectedCurrency(e.target.value)}
            }
            value={selectedCurrency}
          >
            {coinTypeOptions && coinTypeOptions?.map(
              ({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </Form.Select>
        </Col>

        <Col xs='12' sm='6' lg='2' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            Action Type
          </Form.Label>

          <Form.Select
            onChange={(e) => {
              setPage(1)
              setSelectedAction(e.target.value)
            }}
            value={selectedAction}
          >
            {actionTypeOptions && actionTypeOptions?.map(
              ({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              )
            )}
          </Form.Select>
        </Col>

        {/* <Col xs='auto' className='d-flex mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            Status
          </Form.Label>

          <Form.Select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            size='sm'
            style={{ maxWidth: '230px' }}
          >
            {statusOptions && statusOptions?.map(
              ({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              )
            )}
          </Form.Select>

        </Col> */}
        <Col xs='12' sm='6' lg='4' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            Time Period
          </Form.Label>
          <DateRangePicker
            width="auto"
            state={state} setState={setState}
          />
        </Col>

        <Col xs='12' sm='6' lg='1' className='d-flex align-items-end mt-2 mt-sm-0 mb-0 mb-sm-3'>
          <Trigger message='Reset Filters' id={'redo'} />
            <Button
            id={'redo'}
              variant='success'
              onClick={() => {
                setSearch('')
                setSelectedAction('all')
                setSelectedCurrency('')
                setLimit(15)
                setPage(1)
                setState([
                  {
                    startDate: getDateDaysAgo(10),
                    endDate: new Date(),
                    key: 'selection'
                  }
                ])
                setStatus('all')
              }}
            >
              <FontAwesomeIcon icon={faRedoAlt} />
            </Button>
        </Col>

        {/* <Col xs='auto' className='d-flex mb-3'>
          <Trigger message='Download as CSV' id={'csv'} />
            <Button
            id={'csv'}
              variant='success'
              size='sm'
              disabled={transactionData?.count === 0}
              onClick={() => {
                const newWindow = window.open(
                  getCsvDownloadUrl(),
                  'csv_window',
                  'width=700,height=700'
                )

                setTimeout(() => {
                  newWindow.close()
                  toast('CSV downloaded', 'success')
                }, 1000)
              }}
            >
              <FontAwesomeIcon icon={faFileDownload} />
            </Button>
        </Col> */}

      </Row>
      <CasinoTransactionsList
        page={page}
        setLimit={setLimit}
        limit={limit}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
        data={transactionData}
        isAllUser={isAllUser}
      />
    </>
  )
}

export default CasinoTransactions
