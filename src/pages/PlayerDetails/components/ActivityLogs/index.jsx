/*
Filename: ActivityLogs/index.js
Description: View List of all users.
Author: uchouhan
Created at: 2023/03/03
Last Modified: 2023/03/30
Version: 0.1.0
*/
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { toast } from 'react-hot-toast'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Card, Button, Table } from '@themesberg/react-bootstrap'
import { tableHeaders } from './constants'
import { ActivityLogContainer, NoDataContainer } from './style'
import { addUpdateActivityLog } from '../../../../reactQuery/hooks/customMutationHook'
import { usePlayerActivityQuery } from '../../../../reactQuery/hooks/customQueryHook'
import PaginationComponent from '../../../../components/Pagination';
import { InlineLoader } from '../../../../components/Preloader';
import { toast } from '../../../../components/Toast';
import { getDateTime } from '../../../../utils/dateFormatter';

const ActivityLogs = (props) => {
  const {
    user,
    refetchActivity,
    handelRefetchActivity 
  } = props
  const [listInfo, setListInfo] = useState({
    pageNo: 1,
    limit: 15,
    userId: user.userId,
    actioneeType: 'admin'
  })
  const [isOpenBankModal, setIsOpenBankModal] = useState(false)
  const toggleModal = () => {
    setIsOpenBankModal(!isOpenBankModal)
  }
  const closeModal = () => {
    setIsOpenBankModal(false)
  }

  const successToggler = () => {

  }

  useEffect(() => {
    if (refetchActivity) {
      refatchActivityList()
      handelRefetchActivity(false)
    }
  },[refetchActivity])

  const setListToggler = (value, type) => {
    const tempListInfo = { ...listInfo }
    if (type === 'page') {
      tempListInfo.pageNo = value
    }
    if (type === 'limit') {
      tempListInfo.limit = value
    }
    setListInfo(tempListInfo)
  }
  const {
    data: dataInfo,
    isLoading: isActivityListLoading,
    refetch: refatchActivityList
  } = usePlayerActivityQuery({ params: listInfo, successToggler })
  const { mutate: addUpdateActivityRequest, isLoading: isUdpdateLoding } = addUpdateActivityLog({
    onSuccess: (data) => {
      closeModal()
      refatchActivityList()
      if (data.data.message) {
        toast(data.data.message, 'success', 'dataSuccess')
      } else {
        toast(data.data.message, 'error', 'dataerror')
      }
    },
    onError: (error) => {
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
  const totalPages = Math.ceil(dataInfo?.count / listInfo.limit)
  const onFavToggle = (favBool, item) => {
    addUpdateActivityRequest({
      logId: item.activityLogId,
      userId: user.userId,
      favorite: favBool
    })
  }
  return (
    <ActivityLogContainer>
      <Table bordered striped responsive hover size='sm' className='text-center mt-4'>
        <thead className='thead-dark'>
          <tr>
            {
              tableHeaders.map((item, index) => {
                return (
                  <th style={item.style} key={index}>{item.value}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            !isUdpdateLoding &&
            !isActivityListLoading &&
            dataInfo?.count > 0 &&
            dataInfo?.rows?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='act-fav-icon'>
                    <FontAwesomeIcon
                      icon={faStar} size='1x'
                      style={{ color: item?.moreDetails.favorite ? '#ffdd77' : '' }}
                      onClick={() => onFavToggle(!item?.moreDetails.favorite, item)}
                    />
                  </td>
                  <td>{item?.remark || '-'}</td>
                  <td>{getDateTime(item?.createdAt)}</td>
                  <td>{item?.admin?.adminUsername}</td>
                </tr>
              )
            })
          }
          {
            !isActivityListLoading && !isUdpdateLoding && dataInfo?.count === 0 &&
            (<tr>
              <td colSpan='5'>
                <NoDataContainer>
                  No Logs Found
                </NoDataContainer>
              </td>
            </tr>)
          }
          {
            (isActivityListLoading || isUdpdateLoding) &&
            (<tr>
              <td colSpan='5'>
                <NoDataContainer>
                  <InlineLoader />
                </NoDataContainer>
              </td>
            </tr>)
          }
        </tbody>
      </Table>

      <div className='activity-player-pagination'>
        {dataInfo?.count !== 0 &&
          (
            <PaginationComponent
              page={dataInfo?.count < listInfo.pageNo ? setListToggler(1, 'page') : listInfo.pageNo}
              totalPages={totalPages}
              setPage={(value) => setListToggler(value, 'page')}
              limit={listInfo.limit}
              setLimit={(limitValue) => setListToggler(limitValue, 'limit')}
            />
          )}
        </div>
    </ActivityLogContainer>
  )
}
export default ActivityLogs