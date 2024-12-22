import { Button, Col, Row, Form } from '@themesberg/react-bootstrap'
import React from 'react'
import DateRangePicker from '../../../components/DateRangePicker'
import { getDateDaysAgo } from '../../../utils/dateFormatter'
import Preloader from '../../../components/Preloader'
import Trigger from '../../../components/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { toast } from '../../../components/Toast'
import useTransactionBLIst from '../hooks/useTransactionBList'
import { paymentProviders, statusTypeOptions, transactionTypeOptions } from '../constants'
import BankingTransactionsList from '../../../components/BankingTransactionsList'

const TransactionBanking = ({ email, isAllUser }) => {
  const {
    t,
    setLimit,
    setPage,
    totalPages,
    limit,
    page,
    setSelectedAction,
    selectedAction,
    state,
    setState,
    transactionData,
    loading,
    onDeposit,
    getCsvDownloadUrl,
    status,
    setStatus,
    search,
    setSearch,
    transactionRefetch,
    setSelectedProvider,
    selectedProvider,
  } = useTransactionBLIst(email)

  const onDownloadCsvClick = () => {
    const newWindow = window.open(
      getCsvDownloadUrl('player'),
      'csv_window',
      'width=700,height=700'
    )

    setTimeout(() => {
      newWindow.close()
      toast('CSV downloaded', 'success')
    }, 1000)
  }
  const resetFilters = () => {
    setSearch('')
    setSelectedAction('')
    setStatus('all')
    setSelectedProvider('all')
    setLimit(15)
    setPage(1)
    setState([
      {
        startDate: getDateDaysAgo(10),
        endDate: new Date(),
        key: 'selection'
      }
    ])
  }
  
  return (
    <>
      {isAllUser && <Row className='mb-3'>
        <Col sm={12}>
          <h3>{t('transactions.transactionsBanking')}</h3>
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
                )}}
            />
        </Col>}

        <Col xs='12' sm='6' lg='2' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            {t('transactions.filters.actionType')}
          </Form.Label>

          <Form.Select
            onChange={(e) => {
              setPage(1)
              setSelectedAction(e.target.value)
            }}
            value={selectedAction}
          >
            {/* <option value=''>{t('transactions.filters.actionTypeOpt')}</option> */}
            {transactionTypeOptions && transactionTypeOptions?.map(
              ({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              )
            )}
          </Form.Select>
        </Col>

        <Col xs='12' sm='6' lg='2' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
            {t('transactions.filters.paymentProviders')}
          </Form.Label>

          <Form.Select
            onChange={(e) => {
              setPage(1)
              setSelectedProvider(e.target.value)
            }}
            value={selectedProvider}
          >
            {paymentProviders && paymentProviders?.map(
              ({ label, value }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              )
            )}
          </Form.Select>
        </Col>

        <Col xs='12' sm='6' lg='2' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
          {t('transactions.filters.status')}
          </Form.Label>

          <Form.Select
            value={status}
            onChange={e => {
              setPage(1)
              setStatus(e.target.value.replace(/[~`!$%^&*#=)()><?]+/g, ''))}
            }
          >
            {statusTypeOptions.map(({ label, value }) => {
              return <option key={label} value={value}>{label}</option>
            })}
          </Form.Select>
        </Col>

        <Col xs='12' sm='6' lg='4' className='mb-3'>
          <Form.Label column='sm' className='mx-auto text-nowrap px-2'>
          {t('transactions.filters.time')}
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
              className=''
              onClick={resetFilters}
            >
              <FontAwesomeIcon icon={faRedoAlt} />
            </Button>
          {/* <Trigger message='Download as CSV' id={'csv'} />
            <Button
            id={'csv'}
              variant='success'
              size='sm'
              style={{ marginLeft: '10px' }}
              disabled={transactionData?.count === 0}
              onClick={onDownloadCsvClick}
            >
              <FontAwesomeIcon icon={faFileDownload} />
            </Button> */}
        </Col>

      </Row>
      <BankingTransactionsList
        page={page}
        setLimit={setLimit}
        limit={limit}
        setPage={setPage}
        totalPages={totalPages}
        data={transactionData}
        loading={loading}
        isAllUser={isAllUser}
        transactionRefetch = {transactionRefetch}
        // onDeposit={onDeposit}
      />
    </>
  )
}

export default TransactionBanking
