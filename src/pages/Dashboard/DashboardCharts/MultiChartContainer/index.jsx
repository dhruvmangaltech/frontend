import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserAlt,
  faAward,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';

const filterData = (data, label) => data.filter((row) => row.label === label);

const DashboardBox = ({ icon, label, data, boxClass }) => (
  <div className={`dashboard-box ${boxClass}`}>
    <div className='new-icon'>
      <FontAwesomeIcon icon={icon} />
    </div>
    <label>{label}</label>
    <div className='live-report-data'>{data}</div>
  </div>
);

const MultiChartContainer = ({ data }) => {

  return (
    <>
      <div className='dashboard-boxes-container'>
        <DashboardBox
          icon={faUserAlt}
          label='Today SC Staked'
          data={data?.DASHBOARD_REPORT?.scStakedTodayCount}
          boxClass='sc-stack'
        />
        <DashboardBox
          icon={faAward}
          label='Today SC wins'
          data={data?.DASHBOARD_REPORT?.scWinTodayCount}
          boxClass='sc-win'
        />
        <DashboardBox
          icon={faUserAlt}
          label='Today GGR SC'
          data={data?.DASHBOARD_REPORT?.scGgr}
          boxClass='scr-sc'
        />
        <DashboardBox
          icon={faDollarSign}
          label='SC Awarded Total'
          data={data?.DASHBOARD_REPORT?.scAwardedTotalSumForToday}
          boxClass='usc-balance'
        />
        <DashboardBox
          icon={faDollarSign}
          label='GC Awarded Total'
          data={data?.DASHBOARD_REPORT?.gcAwardedTotalSumForToday}
          boxClass='rsc-balance'
        />
      </div>
    </>
  );
};

export default MultiChartContainer;