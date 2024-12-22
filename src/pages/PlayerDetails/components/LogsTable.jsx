import { Table } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import moment from 'moment-timezone'
import { logsTableHeaders } from "../constants";
import {
  getDateTime,
  formatDateYMD,
  convertUtcToCet,
} from "../../../utils/dateFormatter";
import { InlineLoader } from "../../../components/Preloader";
import PaginationComponent from "../../../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getSessionLogs } from "../../../utils/apiCalls";
import { useParams } from "react-router-dom";
import { commonDateTimeFormat } from "../../../utils/helper";

const LogsTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [startDate, setStartDate] = useState(formatDateYMD(new Date(2020)));
  const [endDate, setEndDate] = useState(formatDateYMD(new Date()));
  const { userId } = useParams();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["logsList", limit, page, startDate, endDate],
    queryFn: ({ queryKey }) => {
      const params = {
        pageNo: queryKey[2],
        limit: queryKey[1],
        startDate: queryKey[3],
        endDate: queryKey[4],
        userId,
      };
      return getSessionLogs(params);
    },
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.sessionLogs,
  });

  const totalPages = Math.ceil(data?.count / limit);

  console.log(getDateTime("2023-11-14T12:56:32.881Z"),"getDateTime")
  console.log(moment("2023-11-14T12:56:32.881Z").format(commonDateTimeFormat.dateWithTime),"common")


  return (
    <>
      <Table
        bordered
        striped
        responsive
        hover
        size='sm'
        className='text-center'
      >
        <thead className='thead-dark'>
          <tr>
            {logsTableHeaders?.map((h, idx) => (
              <th key={idx} className=''>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data &&
            data?.rows?.map(({ activityType, ipAddress, createdAt }, index) => {
              return (
                <tr key={index}>
                  <td className='text-left'>{getDateTime(createdAt)}</td>
                  <td className='text-left'>{convertUtcToCet(createdAt)}</td>
                  <td className='text-capitalize text-left'>{activityType}</td>
                  <td>{ipAddress}</td>
                </tr>
              );
            })}

          {data?.count === 0 && (
            <tr>
              <td colSpan={9} className='text-danger text-center'>
              No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {loading && <InlineLoader />}
      {data?.count !== 0 && (
        <PaginationComponent
          page={data?.count < page ? setPage(1) : page}
          totalPages={totalPages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </>
  );
};

export default LogsTable;
