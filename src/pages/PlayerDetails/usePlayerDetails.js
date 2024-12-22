import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import moment from 'moment-timezone'
import { useParams } from 'react-router-dom'
import { formatDateMDY, formatDateYMD } from '../../utils/dateFormatter'
import { getPlayerById } from '../../utils/apiCalls'
import { useGetUserDocumentsQuery, usePlayerActivityQuery } from '../../reactQuery/hooks/customQueryHook'
import { useUpdateRequestDocumentMutation, useUpdateVerifyDocumentMutation, useCancelDocumentMutation } from '../../reactQuery/hooks/customMutationHook'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { commonDateTimeFormat } from '../../utils/helper'
import { SIGN_UP_METHOD } from './constants'

const usePlayerDetails = () => {
  const { t } = useTranslation('players')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showManageMoneyModal, setShowManageMoneyModal] = useState(false)
  const [refetchActivity, setRefetchActivity] = useState(false)

  const { userId } = useParams()

  const [show, setShow] = useState(false)
  const [status, setStatus] = useState('')
  const [userDocumentId, setUserDocumentId] = useState('')
  const [showReasonModal, setShowReasonModal] = useState(false)
  const [enable, setEnable] = useState(false)
  const [title, setTitle] = useState('')
  const [docStatus, setDocStatus] = useState(null)
  const [imagePreviewModalShow, setImagePreviewModalShow] = useState(false)
  const [imageUrl, setImageUrl] = useState({ name: '', preview: [] })
  const docLabels = ''
  const [listInfo, setListInfo] = useState({
    pageNo: 1,
    limit: 15,
    userId: userId,
    actioneeType: 'admin'
  })
  const { isLoading: loading, data: res, refetch: getUserDetails } = useQuery({
    queryKey: ['players', userId],
    queryFn: ({ queryKey }) => {
      const params = queryKey[1] ? {userId: queryKey[1]} : {}
      return getPlayerById(params)
    },
    refetchOnWindowFocus: false,
  })

  const { data: userDocuments, refetch: getUserDocumentStart } = useGetUserDocumentsQuery({userId})
  const { mutateAsync: updateDocumentStart } = useUpdateRequestDocumentMutation()
  const { mutateAsync: verifyUserDocumentStart } = useUpdateVerifyDocumentMutation()
  const { mutateAsync: cancelUserDocumentStart } = useCancelDocumentMutation()
  let userData = res?.data?.user


  const handleClose = () => {
    setShowReasonModal(false)
    setEnable(false)
  }

  const handleYes = (reason, request , expiryDate, status) => {
    if (request === 'request' || request === 'cancel') {
      handleUpdateDocumentStart({ body: { documentLabelId: userDocumentId, reason, userId: parseInt(userId), reRequested: true }, isRequested: (request === 'request') })
    } else {
      handleVerifyUserDocument({ userId, body: { userDocumentId, reason, status, userId: parseInt(userId) ,documentExpiry : expiryDate } })
    }
    setShow(false)
    setShowReasonModal(false)
    setStatus('')
  }

  const handleUpdateDocumentStart = async (data) => {
    try {
      const { body, isRequested } = data
  
      isRequested ? await updateDocumentStart(body) : await cancelUserDocumentStart(body)
      getUserDocumentStart()  
      toast(`Document ${isRequested ? 'Requested' : 'UnRequested'} Successfully`, 'success', 'docToast')
    } catch (e) {  
      toast(e.message, 'error', 'docToast')
    }
  }

  const handleVerifyUserDocument = async (data) => {
    try {
      const { body } = data
  
      await verifyUserDocumentStart(body)
      getUserDetails()
      toast('Document Verification Processed Successfully', 'success')
      getUserDocumentStart()
    } catch (e) {  
      toast(e?.response?.data?.message, 'error')
    }
  }

  const handleVerify = (modalStatus, userDocumentId) => {
    setStatus(modalStatus)
    setUserDocumentId(userDocumentId)
    if (modalStatus === 'approved') {
      setShow(true)
      setShowReasonModal(false)
    } else {
      setShow(false)
      setShowReasonModal(true)
    }
    setTitle('Rejecting')
  }

  const updateDocument = ({ documentLabelId, isRequested }) => {
    updateDocumentStart({ body: { documentLabelId, userId: parseInt(userId) }, isRequested })
  }

  const handleReRequest = (docId, myStatus) => {
    setStatus('')
    if (myStatus === 'cancel') {
      setShow(true)
      setShowReasonModal(false)
    } else {
      setShow(false)
      setShowReasonModal(true)
    }
    setUserDocumentId(docId)
    setTitle('Re-Requesting')
  }

  const handleImagePreview = (documentUrl,name,signature) => {
    setImageUrl({ name,documentUrl,signature})
  }

  const showGreenText = (data) => { return <span className='text-success'> {data} </span>}
  const showRedText = (data) => { return <span className='text-danger'> {data} </span>}
  const showLink = (data) => {return <span onClick={()=> window.open(data,'_blank')} className='text-link' style={{ cursor: "pointer" }}>{data}</span>}
  
  const showStyle = (data) => (data ? 'text-success' : 'text-danger')
  const printData = (data) => (data ? 'Yes' : 'No')
  const checkStatus = () => {
    if (userData?.isBan) {
      return <span className='text-danger'>Banned</span>
    } else if (userData?.isRestrict) {
      return <span className='text-danger'>Restricted</span>
    } else if(userData?.RG === 'self exclusion'){
      return <span className='text-danger'>Self Exclusion</span>
    } else if(userData?.RG === 'Take a break'){
      return <span className='text-danger'>Take a break</span>
    }
    else 
    return <span className='text-success'>OK</span>
  }


  const checkRG = () => {
    if (userData?.RG === 'self exclusion') {
      return <span className='text-danger'>Perm Self Exclusion</span>
    } else if (userData?.RG === 'Take a break') {
      return <span className='text-danger'>Take a break</span>
    } else if (userData?.RG === 'Limit') {
      return <span className='text-danger'>Limit</span>
    }
    else 
    return <span className='text-success'>OK</span>

  }
  
  const basicInfo = [
    { label: 'ID', value: userId },
    // { label: 'Social Security', value: userData?.ssn || 'NA' },
    { label: 'Email', value: userData?.email },
    { label: 'Phone', value: userData?.phone },
    { label: 'First Name', value: userData?.firstName || 'NA'},
    { label: 'Last Name', value: userData?.lastName || 'NA'},
    { label: 'DOB', value: userData?.dateOfBirth ? moment(new Date(userData?.dateOfBirth)).format(commonDateTimeFormat.date) : 'NA'},
    { label: 'Country', value: 'United States Of America' },
    // { label: 'VIP Level', value: userData?.userVipTierName || 'NA' },
    { label: 'User Status', value: checkStatus() },
    // { label: 'Marketing', value: userData?.moreDetails?.isSubscribed === true ? showGreenText('Yes') : showRedText('No') },
    { label: 'Login Method', value: SIGN_UP_METHOD[Number(userData?.signInMethod)] || 'NA' },
    // { label: 'Affiliate ID', value: userData?.affiliateId || 'NA' },
    // { label: 'KYC Level', value: userData?.kycStatus || 'NA' },
    { label: ' KYC Verification', value: userData?.kycStatus || 'NA' },
    // { label: ' SSN Verification', value: userData?.ssnStatus || 'NA' },
    // { label: 'Tracker ID', value: 'NA' },
    // { label: 'LexID', value: userData?.moreDetails?.transactionId || 'NA' },
    // { label: 'RG', value: checkRG() },
    { label: 'Registration Date', value: moment(userData?.createdAt).format(commonDateTimeFormat.dateWithTime) },
    { label: 'Registration IP', value: userData?.signInIp || 'NA' },
    { label: 'Last Login', value: moment(userData?.lastLoginDate).format(commonDateTimeFormat.dateWithTime) },
    // { label: 'Last IP', value: 'NA' },
    { label: 'Operating System', value: userData?.moreDetails?.platform || 'NA' },
    { label: 'Login Browser', value: userData?.moreDetails?.browser || 'NA' },
    { label: 'Email Verification', value: userData?.isEmailVerified ? 'Verified' : 'Not Verified' },
    // { label: 'Invited Friends', value: userData?.referralBonusCount },
    // { label: 'Activation Link', value: userData?.activationLink ? showLink(userData?.activationLink) : 'NA' }
  ]

  const alertInfo = [
    { label: 'Redemption', value: userData?.userPendingRedemptionTickets},
    { label: 'Expiry', value: userData?.userPendingExpiryTickets},
    { label: 'Fraud', value: userData?.userPendingFraudTickets},
    { label: 'Verification', value: userData?.userPendingVerificationTickets},

  ]

  const handelRefetchActivity = (data) => {
    setRefetchActivity(data)
  }
  const {
    refetch: refatchActivityList
  } = usePlayerActivityQuery({ params: listInfo })
  const getActivityLogs = () =>{
    refatchActivityList()
  }

  return {
    userData,
    loading,
    basicInfo,
    alertInfo,
    selectedTab,
    showManageMoneyModal,
    setSelectedTab,
    getUserDetails,
    setShowManageMoneyModal,
    userDocuments: userDocuments?.data?.userDocument,
    updateDocument,
    handleVerify,
    show,
    setShow,
    handleYes,
    status,
    showReasonModal,
    handleClose,
    enable,
    setEnable,
    docLabels,
    handleReRequest,
    title,
    imagePreviewModalShow,
    setImagePreviewModalShow,
    handleImagePreview,
    imageUrl,
    setImageUrl,
    t,
    refetchActivity,
    handelRefetchActivity,
    docStatus, 
    setDocStatus,
    getActivityLogs
  }
}

export default usePlayerDetails
