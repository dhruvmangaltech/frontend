import React, { useState } from 'react';
import { Row, Table, Accordion } from '@themesberg/react-bootstrap';
import useDashboardDataListing from '../hooks/useDashboardData';
import { totalTablesList, tableData } from '../constants';
import { InlineLoader } from '../../../components/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const EconomyTable = ({accordionOpen, setAccordionOpen}) => {
  const {
    economyData,
    economyLoading,
    t,
  } = useDashboardDataListing();


  return (
    <>
      <React.Fragment>
        <Row className='mt-4' onClick={() => setAccordionOpen(!accordionOpen)} style={{ cursor: 'pointer' }}>
          <h5 className='accordian-heading'>
           <span>{t(`headers.coinEcoDataKeys`)} {t('headers.data')}</span> 
            <span>{accordionOpen ? <FontAwesomeIcon icon={faChevronDown} /> :<FontAwesomeIcon icon={faChevronRight} />} </span>
          </h5>
        </Row>

        <Accordion activeKey={accordionOpen ? '0' : ''}>
          <Accordion.Item eventKey="0">
            <Accordion.Body>
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
                    {economyLoading ? (
                      <tr><td colSpan={10}><InlineLoader /></td></tr>
                    ) : economyData && Object.keys(economyData)?.length ? (
                      Object.keys(economyData)?.map((data, i) => {
                        return (
                          Object.keys(totalTablesList['coinEcoDataKeys']).includes(data) && (
                            <tr key={i}>
                              <td className='text-left'>
                                {t(totalTablesList['coinEcoDataKeys'][data])}
                              </td>
                              {tableData?.map((ele) => (
                                <td key={ele}>{economyData?.[data]?.[ele] || 0}</td>
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </React.Fragment>
    </>
  );
};
export default EconomyTable;
