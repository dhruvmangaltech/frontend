import React from 'react'
import { Table } from '@themesberg/react-bootstrap'
import { useTranslation } from 'react-i18next'
import { InlineLoader } from '../Preloader'
import PaginationComponent from '../Pagination'
import { tableHeaders, tableHeadersForPlayer } from './constants'
import { getDateTime } from '../../utils/dateFormatter'
import { Link } from 'react-router-dom'
import Trigger from '../OverlayTrigger'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from '../Toast'

const CasinoTransactionsList = ({  
    page,
    setLimit,
    limit,
    setPage,
    totalPages,
    loading,
    data,
    isAllUser 
}) => {
    
    const { t } = useTranslation('players')

    const AMOUNT_TYPES = {
      0 : 'GC',
      1 : 'SC',
      2 : 'GC + SC'
    }

return (
    <>
        <Table bordered striped responsive hover size='sm' className='text-center mt-4'>
        <thead className='thead-dark'>
          <tr>
            {isAllUser ? tableHeaders()?.map((h, idx) => (
              <th
                key={idx}
                style={{
                  cursor: 'pointer'
                }}
                className=''
              >
                {t(h.labelKey)}{' '}
              </th>
            )) : tableHeadersForPlayer()?.map((h, idx) => (
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
                casinoTransactionId,
                transactionId,
                User,
                gameId,
                actionType,
                amount,
                amountType,
                userId,
                currencyCode,
                status,
                createdAt,
                gc,
                sc
              }) => {
                return (
                  <tr key={casinoTransactionId}>
                    <td>{casinoTransactionId}</td>
                    <td>{transactionId}
                      {/* <Trigger message='Copy' id={`${transactionId}_copy`} />
                      <CopyToClipboard
                        text={transactionId}
                        onCopy={() => {
                          toast('Payment id copied to clipboard', 'success')
                        }}
                      >
                        <span
                        id={`${transactionId}_copy`}
                        style={{ cursor: 'pointer' }}
>
                        {transactionId}
                      </span>
                      </CopyToClipboard> */}
                    </td>
                    {isAllUser && <td><Link to={`/admin/player-details/${userId}`}>{User.email}</Link></td>}
                    <td>
                        <span>
                          {gameId?.toUpperCase()}
                        </span>

                    </td>
                    <td>{actionType}</td>
                    <td>
                       { amountType == 2 ? `${gc?.toFixed(2)} + ${sc?.toFixed(2)}` : amount?.toFixed(2)}
                    </td>
                    <td>{AMOUNT_TYPES[amountType]}</td>
                    {/* <td>{currencyCode}</td> */}
                    <td>{getDateTime(createdAt)}</td>
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
        </>
    )
}

export default CasinoTransactionsList