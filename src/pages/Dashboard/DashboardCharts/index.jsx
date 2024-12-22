import React, { useEffect } from 'react';
import './dashboardChart.scss';
import CustomerDataChart from './CustomerDataChart';
import LoginDataChart from './LoginDataChart';
import { originalObject } from '../constants';
import { prepareGroupedObject } from './utils';
import MultiChartContainer from './MultiChartContainer';
import { Row, Card, Col, Table } from '@themesberg/react-bootstrap';
const DashboardCharts = ({customerData, loginData,economyData,transactionData, data}) => {
  Object.keys(originalObject).forEach((section) => {
    originalObject[section].TODAY = Math.floor(Math.random() * 50);
    originalObject[section].YESTERDAY = Math.floor(Math.random() * 50);
    originalObject[section].MONTH_TO_DATE = Math.floor(Math.random() * 50) + 1;
    originalObject[section].LAST_MONTH = Math.floor(Math.random() * 50);
    originalObject[section].CUSTOM = Math.floor(Math.random() * 50) + 1;
  });

  const dashboardData = prepareGroupedObject(originalObject,customerData,loginData,transactionData,economyData);
  return (
    <>
      <div className='customer-chart-container w-100'>
        <Row className='w-100'>
          <Col lg={7} sm={12} className='d-flex justify-center'>
            <MultiChartContainer
             data={data}
            />
          </Col>
          <Col lg={5} sm={12}>
            <LoginDataChart loginData={dashboardData.Login_Data} />
          </Col>
        </Row>
      </div>
      {/* <CustomerDataChart customerData={dashboardData.Customers_Data} /> */}
    </>
  );
};

export default React.memo(DashboardCharts);
