import React from 'react'
import { playerTypeOptions } from './constants';
import {
  Row,
  Col,
  Form,
  Button
} from '@themesberg/react-bootstrap';
import { formatDateYMD } from '../../utils/dateFormatter';

const DashBoardFilters = ({
  setPlayerType,
  playerType,
  startDate,
  setEndDate,
  endDate,
  setStartDate,
  t,
  reportRefetch,customerRefetch,transactionRefetch,economyRefetch,
  economicDataAccordionOpen,
  transactionDataAccordianOpen
}) => {

  const handleSearch = () =>{
    reportRefetch();
    customerRefetch();
    transactionDataAccordianOpen && transactionRefetch();
    economicDataAccordionOpen && economyRefetch();
  }


  return (
    <Row>
      <Col className='col-lg-3 col-sm-6 col-12'>
        <Form.Label>{t('filter.playerType.title')}</Form.Label>

        <Form.Select
          
          value={playerType}
          onChange={(event) => {
            setPlayerType(event.target.value);
          }}
        >
          {playerTypeOptions?.map(({ labelKey, value }) => {
            return (
              <option key={value} value={value}>
                {t(labelKey)}
              </option>
            );
          })}
        </Form.Select>
      </Col>

      <Col className='col-lg-3 col-sm-6 col-12 mt-2 mt-sm-0'>
        <Form.Label>{t('filter.date.startDate')}</Form.Label>

        <Form.Control
          type='date'
          value={startDate}
          max={endDate}
          onChange={(event) => {
            setStartDate(event.target.value);
          }}
        />
      </Col>

      <Col className='col-lg-3 col-sm-6 col-12 mt-2 mt-sm-0'>
        <Form.Label>{t('filter.date.endDate')}</Form.Label>

        <Form.Control
          type='date'
          value={endDate}
          max={formatDateYMD(new Date())}
          onChange={(event) => {
            setEndDate(event.target.value);
          }}
        />
      </Col>

      <Col className='col-lg-3 col-sm-6 col-12 d-flex align-items-end mt-3 mt-sm-0'>
        <Button variant='outline-secondary' onClick={handleSearch}>
          Search
        </Button>
      </Col>
    </Row>
  )
}

export default DashBoardFilters