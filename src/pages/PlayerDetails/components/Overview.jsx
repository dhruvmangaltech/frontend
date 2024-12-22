import { Card, Col, Row, Table } from '@themesberg/react-bootstrap'
import React, { useState } from 'react'
import ResponsibleGaming from '../../../components/ResponsibleGaming'
import { OverviewContainer } from '../style'
import '../playerdetails.scss'
import { formatDateYMD, getDateDaysAgo } from '../../../utils/dateFormatter'
import { useGetPlayerCasinoQuery } from '../../../reactQuery/hooks/customQueryHook'

const Overview = ({ basicInfo, userLimits, user, getUserDetails, t, alertInfo }) => {
  const { userWallet } = user
  const [state, setState] = useState({
    startDate: getDateDaysAgo(10),
    endDate: new Date(),
    key: 'selection'
  })
  function formatNumber(coin) {
    if (typeof coin !== 'number') {
      return coin
    }
    const formattedNumber = coin.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formattedNumber
  }
  const {
    data: casinoSearchData,
  } = useGetPlayerCasinoQuery({
    params:
    {
      userId: user.userId
      // startDate: formatDateYMD(state.startDate),
      // endDate: formatDateYMD(state.endDate)
    },
  })
  const convToStr = (value) => {
    if(typeof value === 'number') {
         return value.toFixed(2).toString()
    }
    else 
        return Number(value).toFixed(2).toString()
   }
  return (
    <OverviewContainer>
      <Row>
        <Col className='col-padding'>
          <Card className='card-overview my-3 mb-3'>
            <Row className='div-overview'>
              {basicInfo?.map(({ label, value, subValue }) => {
                return (
                  <Col xs={12} md={6} lg={3} key={label}>
                    <div className='d-flex justify-content-between m-1 player-basic-info align-items-center'>
                      <h6 className='mb-0 me-2'>{label}</h6>
                      <span className={`${subValue} text-break`}>{value || 'NA'}</span>
                    </div>
                  </Col>
                )
              })}
              {/* <Col xs={4}>
                <div className='d-flex justify-content-between m-1'>
                  <h6>RG</h6>
                  <span>{checkStatus()}</span>
                </div>
              </Col> */}
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered striped responsive hover size='sm' className='text-center mt-4'>
            <thead className='thead-dark'>
              <tr>
                <th>GC Balance</th>
                <th>Redeemable SC Balance</th>
                <th>Remaining Purchased SC</th>
                <th>Remaining Bonus SC</th>
                <th>Total SC</th>
                <th>Total Purchase amount</th>
                <th>Total redemption amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userWallet?.gcCoin}</td>
                <td>{formatNumber(userWallet?.scCoin.wsc)}</td>
                <td>{formatNumber(userWallet?.scCoin.psc)}</td>
                <td>{formatNumber(userWallet?.scCoin.bsc)}</td>
                <td>{formatNumber(userWallet?.totalScCoin)}</td>
                <td>{casinoSearchData?.totalPurchaseAmount ? convToStr(casinoSearchData?.totalPurchaseAmount) : '-'}</td>
                <td>{casinoSearchData?.approvedRedemptionTotal ? convToStr(casinoSearchData?.approvedRedemptionTotal) : '-'}</td>
                {/* <td>-</td> */}
              </tr>
            </tbody>
          </Table>
        </Col>
        {/* <Col>
          <ResponsibleGaming
            userLimits={userLimits}
            user={user}
            currencyCode={user?.currencyCode}
            getUserDetails={getUserDetails}
          />
        </Col> */}
      </Row>
    </OverviewContainer>
  )
}

export default Overview
