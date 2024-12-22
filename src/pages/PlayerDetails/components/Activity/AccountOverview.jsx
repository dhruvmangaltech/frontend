import { Button, Col, Row, Table} from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import {  useQueryClient } from '@tanstack/react-query'
import RedeemConfirmationForm from "./RedeemConfirmation";
import ModalView from "../../../../components/Modal";
import Preloader from "../../../../components/Preloader";
import { usePaymentRefundMutation, useUpdateWithdrawRequestMutation } from "../../../../reactQuery/hooks/customMutationHook";
import { toast } from "../../../../components/Toast";
import { getDateTime } from "../../../../utils/dateFormatter";
import RemarksModal from "../Verification/RemarksModal";
import RefundDetailsModal from "../../../../components/BankingTransactionsList/RefundDetailsModal";

const AccountOverview = ({ setOpenAccountOverview, basicInfo,  currentDetails }) => {
  const [openRedeemModal, setOpenRedeemModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [showDetails, setShowDetails] = useState(false);
  const [moreDetails, setMoreDetails] = useState(null)
  const queryClient = useQueryClient()
  const TRANSACTION_STATUS = {
    0: 'Pending',
    1: 'Success',
    2: 'Cancelled',
    3: 'Failed',
    4: 'Rollback',
    5: 'Approved',
    6: 'Declined',
    9: 'Void',
    10: 'Refunded',
    11 : 'Short'
  }

  const handleCloseDetails = () => setShowDetails(false);

  const { mutate: updateWithdrawalRequest, isLoading: updateLoading } = useUpdateWithdrawRequestMutation({
    onSuccess: (data) => {
      if (data.data.success) {
        toast('Withdraw request updated successfully', 'success')
        queryClient.invalidateQueries({ queryKey: ['withdrawList'] })
      } else {
        toast(data.data.message, 'error')
      }
    }, onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
        errors.map((error) => {
          if (error?.errorCode === 500) {
            toast('Something Went Wrong', 'error')
          }
          if (error?.description) {
            toast(error?.description, 'error')
          }
        })
      }
    }
  })


  const handleRedeem = () => {
    setOpenRedeemModal(true)
  };
  const toggleRedeemModal = () => {
    setOpenRedeemModal(!openRedeemModal)
  }
  const closeModal = () => {
    setOpenModal(false);
    setOpenRedeemModal(false)
  }

  const handleRefund = () => {
    setOpenModal(true)
  };

  const onSubmit = (dataValue) => {
    const data = {
      userId: basicInfo.userId,
      reason: dataValue.reason,
      status: dataValue.status,
      transactionId: currentDetails.payment_transaction_id,
      withdrawRequestId: ''
    }
    updateWithdrawalRequest(data)
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const { mutate: refundPayment , isLoading : loading } = usePaymentRefundMutation({
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message, 'success');
        closeModal();
        setOpenAccountOverview(false)
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

  const initiateRefund = (dataValue) => {
    const data = {
      userId: basicInfo.userId,
      reason: dataValue.reason,
      paymentTransactionId :currentDetails?.paymentTransactionId,
      transactionBankingId : currentDetails?.transactionBankingId
    };
    refundPayment(data);
  };

  return (
    <>
      <ModalView
        openModal={openRedeemModal}
        toggleModal={toggleRedeemModal}
        size='lg'
        hideHeader
        center
        className='announcement-view-wrap'
        firstBtnClass='btn-primary'
        secondBtnClass='btn-secondary'
        hideFooter
      >
        {
          updateLoading && <Preloader />
        }
        <RedeemConfirmationForm
          closeModal={closeModal}
          onSubmit={onSubmit}
        />
      </ModalView>
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
        <RemarksModal closeModal={closeModal} onSubmit={initiateRefund} loading={loading} />
      </ModalView>
      <Row>
        <Col>
          <Button
            variant='secondary'
            className='me-2 my-2'
            onClick={() =>
              setOpenAccountOverview(false)
            }
          >
            Activity Overview
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table
            bordered
            striped
            responsive
            hover
            size='sm'
            className='text-center'
          >
            <tbody>
              <tr>
                <td>Player First Name</td>
                <td>{basicInfo?.firstName ? basicInfo?.firstName : 'NA'}</td>
              </tr>
              <tr>
                <td>Player Last Name</td>
                <td>{basicInfo?.lastName ? basicInfo?.lastName : 'NA'}</td>
              </tr>
              <tr>
                <td>Player Id</td>
                <td>{basicInfo.userId}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{TRANSACTION_STATUS[currentDetails?.status]}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{currentDetails?.transactionType}</td>
              </tr>
              <tr>
                <td>Transaction Start Date</td>
                <td>{currentDetails?.createdAt ? getDateTime(currentDetails?.createdAt) : (currentDetails?.updatedAt ? getDateTime(currentDetails?.updatedAt) : "NA")}</td>
              </tr>
              <tr>
                <td>Transaction End Date</td>

                <td>{currentDetails?.updatedAt ? getDateTime(currentDetails?.updatedAt) : "NA"}</td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col>
          <Table
            bordered
            striped
            responsive
            hover
            size='sm'
            className='text-center'
          >
            <tbody>
              <tr>
                <td>Amount</td>
                <td>{currentDetails?.amount}$</td>
              </tr>
              <tr>
                <td>Package Info</td>
                <td>{currentDetails.transactionType === 'Purchase' ? `GC Coin: ${currentDetails?.gcCoin}, SC Coin: ${currentDetails?.scCoin}` : 'NA'}</td>
              </tr>
              <tr>
                <td>Transaction Id</td>
                <td>{currentDetails.paymentTransactionId}</td>
              </tr>
              <tr>
                <td>Account Name</td>
                <td>{basicInfo?.firstName ? basicInfo?.firstName : 'NA'}</td>
              </tr>
              <tr>
                <td>Account Email</td>
                <td>{basicInfo.email}</td>
              </tr>
              {(currentDetails?.transactionType === 'redeem') && (currentDetails?.status === 0) && <tr>
                <td>Action</td>
                <td><Button onClick={handleRedeem}>Process Redemption</Button></td>
              </tr>
              }
                {(currentDetails?.transactionType === 'deposit') && (currentDetails?.status === 1 || currentDetails?.status === 11) && <tr>
                <td>Action</td>
                <td><Button size='sm' onClick={handleRefund}>Refund</Button></td>
              </tr>
              }
               {(currentDetails?.transactionType === 'deposit' || currentDetails?.transactionType === 'redeem' ) && <tr>
                <td>More Details</td>
                <td><Button size='sm' onClick={() => {setShowDetails(true); setMoreDetails(currentDetails?.moreDetails)}}>View</Button></td>
              </tr>
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <RefundDetailsModal
        handleClose={handleCloseDetails}
        showModal={showDetails}
        moreDetails={moreDetails}
      />
    </>
  );
};

export default AccountOverview;
