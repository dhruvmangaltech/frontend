import React from 'react';
import { Row, Table } from '@themesberg/react-bootstrap';
import useDashboardDataListing from '../hooks/useDashboardData';
import { totalTablesList,tableData } from '../constants';
import { InlineLoader } from '../../../components/Preloader';

const LoginDataTable = () => {
  const {
    reportData,
    reportLoading,
    t,
  } = useDashboardDataListing();
  return (
    <>
          <React.Fragment>
            <Row className='mt-4'>
              <h5>
              {t(`headers.loginData`)} {t('headers.data')}
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
                  {reportLoading ? (
                    <tr><td colSpan={10}><InlineLoader /></td></tr>
                  ) : reportData && Object.keys(reportData)?.length ? (
                    Object.keys(reportData)?.map((data, i) => {
                      return (
                        Object.keys(totalTablesList['loginData']).includes(
                          data
                        ) && (
                          <tr key={i}>
                            <td className='text-left'>
                              {t(totalTablesList['loginData'][data])}
                            </td>
                            {tableData?.map((ele) => (
                              <td key={ele}>{reportData?.[data]?.[ele] || 0}</td>
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
export default LoginDataTable;
