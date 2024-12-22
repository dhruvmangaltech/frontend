import React, { useState } from 'react'
import { Table, Button } from '@themesberg/react-bootstrap'
import { useTranslation } from 'react-i18next'
import { InlineLoader } from '../Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import PaginationComponent from '../Pagination'
import { tableHeaders } from './constants'
import { getDateTime } from '../../utils/dateFormatter'
import { Link } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from '../Toast'
import Trigger from '../OverlayTrigger'
import ModalView from '../Modal'
import RemarksModal from '../../pages/PlayerDetails/components/Verification/RemarksModal'
import { usePaymentRefundMutation } from '../../reactQuery/hooks/customMutationHook'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import RefundDetailsModal from './RefundDetailsModal'

const BankingTransactionsList = ({
  page,
  setLimit,
  limit,
  setPage,
  totalPages,
  loading,
  data,
  isAllUser,
  transactionRefetch
}) => {
  const { t } = useTranslation('players')
  const [paymentTransactionId, setPaymentTransactionId] = useState(null)
  const [transactionBankingId, setTransactionBankingId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [userId, setUserId] = useState(false)
  const [showDetails, setShowDetails] = useState(false);
  const [moreDetails, setMoreDetails] = useState(null)

  const TRANSACTION_STATUS = {
    0: 'Pending',
    1: 'Success',
    2: 'Cancelled',
    3: 'Failed',
    4: 'Rollback',
    5: 'Approved',
    6: 'Declined',
    7 : 'In-process',
    9: 'Void',
    10: 'Refunded',
    11 : 'Short'
  }

  const handleCloseDetails = () => setShowDetails(false);

  const toggleModalForRefund = (actioneeId, paymentTransactionId, transactionBankingId) => {
    setUserId(actioneeId)
    setPaymentTransactionId(paymentTransactionId);
    setTransactionBankingId(transactionBankingId);
    toggleModal();
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const { mutate: refundPayment, isLoading : refundLoading } = usePaymentRefundMutation({
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message, 'success');
        transactionRefetch()
        closeModal();
      } else {
        toast(data.data.message, 'error');
      }
    },
    onError: (error) => {
      if(error?.response?.data?.errors.length > 0) {
        const {errors} = error.response.data;
        errors.map((error) => {
          if (error?.errorCode === 3005) {
            toast('Something went wrong. Please try again.', 'error')
          }
          else {
            if(error?.description) toast(error?.description, 'error')
          }
        })
      }
    }
  });

  const onSubmit = (dataValue) => {
    const data = {
      userId,
      reason: dataValue.reason,
      paymentTransactionId,
      transactionBankingId,
    };
    refundPayment(data);
  };


  return (
    <>
     <ModalView
        openModal={openModal}
        toggleModal={toggleModal}
        size='lg'
        hideHeader
        center
        className='announcement-view-wrap'
        firstBtnClass='btn-primary'
        secondBtnClass='btn-secondary'
        hideFooter
      >
        <RemarksModal closeModal={closeModal} onSubmit={onSubmit} loading={refundLoading} />
      </ModalView>
      <Table bordered striped responsive hover size='sm' className='text-center mt-4'>
        <thead className='thead-dark'>
          <tr>
            {tableHeaders(isAllUser)?.map((h, idx) => (
              <th
                key={idx}
                style={{
                  cursor: 'pointer'
                }}
                className=''
              >
                {t(h.labelKey)}{' '}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data &&
            data?.rows?.map(
              ({
                transactionBankingId,
                actioneeName,
                actioneeEmail,
                actioneeId,
                transactionId,
                // actioneeType,
                amount,
                gcCoin,
                scCoin,
                transactionType,
                paymentTransactionId,
                status,
                createdAt,
                paymentMethod,
                moreDetails
              }) => {
                return (
                  <tr key={transactionBankingId}>
                    <td>{transactionBankingId}</td>
                    <td>
                      {paymentTransactionId ? <><Trigger message='Copy' id={`${paymentTransactionId}_copy`} />
                        <CopyToClipboard
                          text={paymentTransactionId}
                          onCopy={() => {
                            toast('Payment id copied to clipboard', 'success')
                          }}
                        >
                          <span
                            id={`${paymentTransactionId}_copy`}
                            style={{ cursor: 'pointer' }}
                          >
                            {paymentTransactionId}
                          </span>
                        </CopyToClipboard></> : '-'}
                    </td>
                    {!isAllUser ? <td>{actioneeName}</td> : <td><Link to={`/admin/player-details/${actioneeId}`}>{actioneeEmail}</Link></td>}
                    <td>{amount?.toFixed(2)}</td>
                    <td>{(gcCoin && status !== 11) ? gcCoin : '-'}</td>
                    <td>{(scCoin  && status !== 11) ? scCoin : '-'}</td>
                    <td>{transactionType}</td>
                    <td>{paymentMethod ? paymentMethod : '-'}</td>
                    <td>
                    {status === 1 || status === 5 ? (
                       <span className='success'>{TRANSACTION_STATUS[status]}</span>
                      ) : status === 2 || status === 3 ? (
                        <span className='danger'>{TRANSACTION_STATUS[status]}</span>
                      ) : status === 10 || status === 11 ? (
                        <span className='text-blue'>{TRANSACTION_STATUS[status]}</span>
                      ) : <span>{TRANSACTION_STATUS[status]}</span>}
                    </td>
                    <td>{getDateTime(createdAt)}</td>
                   {(transactionType === 'deposit' && (status === 1 || status === 11))  ?
                    <td>
                      <Button type='button' className='btn btn-success' size='sm'                 
                     onClick = {()=> toggleModalForRefund(actioneeId,paymentTransactionId, transactionBankingId)}>Refund</Button>                  
                     </td>
                      :
                      <td> - </td>}
                  {(transactionType === 'deposit'|| transactionType === 'withdraw') ? <td> 
                         <Button
                      id={transactionBankingId + 'view'}
                      className='m-1'
                      size='sm'
                      variant='info'
                      onClick={() => {
                        setShowDetails(true)
                        setMoreDetails(moreDetails)
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button> 
                    </td> :
                    <td> - </td> }
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
      {loading && <InlineLoader />}
      {data?.count !== 0 &&
        (
          <PaginationComponent
            page={data?.count < page ? setPage(1) : page}
            totalPages={totalPages}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        )}
          <RefundDetailsModal
        handleClose={handleCloseDetails}
        showModal={showDetails}
        moreDetails={moreDetails}
      />
    </>
  )
}

export default BankingTransactionsList