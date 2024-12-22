import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCasinoAggregators } from "../../../utils/apiCalls";
import {
  errorHandler,
  useUpdateAggregatorsStatusMutation,
} from "../../../reactQuery/hooks/customMutationHook";
import { toast } from "../../../components/Toast";
import { serialize } from "object-to-formdata";

// import { useDispatch, useSelector } from 'react-redux'
// import { createSuperAdminAggregatorStart, getSuperAdminAggregatorsStart, updateSuperAdminAggregatorStatusStart } from '../../../store/redux-slices/superAdminCasinoManagement'

const useAggregatorListing = () => {
  // const dispatch = useDispatch()
  const { t } = useTranslation(["casino"]);
  const [limit, setLimit] = useState(15);
  const [orderBy, setOrderBy] = useState("masterGameAggregatorId");
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [id, setId] = useState();
  const [status, setStatus] = useState();
  const [statusShow, setStatusShow] = useState(false);
  const [show, setShow] = useState(false);
  // const { loading, aggregators } = useSelector((state) => state.superAdminCasino)
  const [loading] = useState(false);
  const [name, setName] = useState();
  const queryClient = useQueryClient();

  const { data: aggregators, refetch } = useQuery({
    queryKey: ["AggregatorsList", limit, page, orderBy, sort],
    queryFn: ({ queryKey }) => {
      const params = {
        pageNo: queryKey[2],
        limit: queryKey[1],
        orderBy: queryKey[3],
        sort: queryKey[4],
      };
      return getCasinoAggregators(params);
    },
    select: (res) => res?.data?.casinoAggregator,
    refetchOnWindowFocus: false,
  });

  const totalPages = Math.ceil(aggregators?.count / limit);

  const handleStatusShow = (id, status, myName) => {
    setId(id);
    setStatus(!status);
    setStatusShow(true);
    setName(myName);
  };

  console.log("status", status);

  const { mutate: updateStatus } = useUpdateAggregatorsStatusMutation({
    onSuccess: ({ data }) => {
      refetch();

      if (data.message) toast(data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["aggregatorList"] });
      setStatusShow(false);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleYes = () => {
    updateStatus({
      // code: 'AGGREGATOR',
      aggregatorId: id,
      isActive: status,
    });
    // dispatch(
    //   updateSuperAdminAggregatorStatusStart({
    //     data: {
    //       code: 'AGGREGATOR',
    //       gameAggregatorId: id,
    //       status
    //     },
    //     limit,
    //     pageNo: page
    //   })
    // )
    setTimeout(() => {
      setStatusShow(false);
    }, 500);
  };

  // useEffect(() => {
  //   // dispatch(getSuperAdminAggregatorsStart({ limit, pageNo: page }))
  // }, [limit, page])

  // const createAggregator = (data) =>
  //   {
  //     // dispatch(createSuperAdminAggregatorStart({ data, limit, pageNo: page }))
  //   }

  return {
    t,
    aggregators,
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    handleStatusShow,
    handleYes,
    statusShow,
    setStatusShow,
    show,
    handleClose,
    handleShow,
    loading,
    status,
    name,
  };
};

export default useAggregatorListing;
