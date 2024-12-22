import React from 'react';
import { Row, Table } from '@themesberg/react-bootstrap';
import useDashboardDataListing from '../hooks/useDashboardData';
import { totalTablesList,tableData } from '../constants';
import { InlineLoader } from '../../../components/Preloader';

const CustomerTable = () => {
  const {
    customerData,
    customerLoading,
    t,
  } = useDashboardDataListing();
  return (
    <>
          <React.Fragment>
            <Row className='mt-4'>
              <h5>
              {t(`headers.customerDataKeys`)} {t('headers.data')}
              </h5>
            </Row>
            <hr></hr>

            <div className='table-responsive'>
              <Table bordered striped hover size='sm' className='text-center'>
                <thead className='thead-dark'>
                  <tr>
                    <th className='text-left' style={{ width: '500px' }}>
                      {t('table.parameters')}
                    </th>
                    <th>{t('table.today')}</th>
                    <th>{t('table.yesterday')}</th>
                    <th>{t('table.monthToDate')}</th>
                    <th>{t('table.lastMonth')}</th>
                    <th>{t('table.selectedDate')}</th>
                  </tr>
                </thead>

                <tbody>
                  {customerLoading ? (
                    <tr><td colSpan={10}><InlineLoader /></td></tr>
                  ) : customerData && Object.keys(customerData)?.length ? (
                    Object.keys(customerData)?.map((data, i) => {
                      return (
                        Object.keys(totalTablesList['customerDataKeys']).includes(
                          data
                        ) && (
                          <tr key={i}>
                            <td className='text-left'>
                              {t(totalTablesList['customerDataKeys'][data])}
                            </td>
                            {tableData?.map((ele) => (
                              <td key={ele}>{customerData?.[data]?.[ele] || 0}</td>
                            ))}
                          </tr>
                        )
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} className='text-center text-danger'>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </React.Fragment>
    </>
  );
};
export default CustomerTable;
