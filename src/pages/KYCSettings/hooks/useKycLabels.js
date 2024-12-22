import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  getKycCheck,
  getKycLabels,
  getPendingKycList,
} from "../../../utils/apiCalls";
import {
  errorHandler,
  useCreateKycLabelMutation,
  useUpdateKycCheck,
  useUpdateKycLabelMutation,
} from "../../../reactQuery/hooks/customMutationHook";

const useKycLabels = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["kycSettings"]);
  const [selectedTab, setSelectedTab] = useState("kycLabels");
  const [orderBy, setOrderBy] = useState("adminUserId");
  const [sort, setSort] = useState("desc");
  const [over, setOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [selectedKycLabel, setSelectedKycLabel] = useState(null);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);

  const handleClose = () => setShowModal(false);

  const selected = (h) => orderBy === h.value;

  const handleShowModal = (type) => {
    setType(type);
    setShowModal(true);
  };

  const handleUpdateStatus = (documentLabelId, isActive) => {
    updateKycLabel({ documentLabelId, isActive: !isActive });
  };

  const {
    isLoading: loading,
    data: kycLabels,
    refetch: refetchKycLabels,
  } = useQuery({
    queryKey: ["kycLabels"],
    queryFn: ({ queryKey }) => {
      return getKycLabels();
    },
    select: (res) => res?.data,
    enabled: selectedTab === "kycLabels",
    refetchOnWindowFocus: false,
  });

  const { mutate: createKycLabel } = useCreateKycLabelMutation({
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["kycLabels"] });
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: updateKycLabel } = useUpdateKycLabelMutation({
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["kycLabels"] });
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const handleSubmitKycLabel = (type, data) => {
    if (type === "Create") {
      createKycLabel(data);
    }
    if (type === "Update") {
      updateKycLabel(data);
    }
    handleClose();
    setType("");
    setSelectedKycLabel(null);
  };

  const {
    isLoading: pendingKycListLoading,
    data: pendingKycList,
    refetch: refetchPendingKycList,
  } = useQuery({
    queryKey: ["pendingKycList", "page", "limit"],
    queryFn: ({ queryKey }) => {
      const params = {
        pageNo: 1,
        limit: 10,
      };
      return getPendingKycList(params);
    },
    select: (res) => res?.data?.getPendingList,
    enabled: selectedTab === "requestedKycs",
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: kycCheckLoading,
    data: kycCheck,
    refetch: refetchKycCheck,
  } = useQuery({
    queryKey: ["kycCheck", "page", "limit"],
    queryFn: ({ queryKey }) => {
      return getKycCheck();
    },
    select: (res) => res?.data?.checks,
    enabled: selectedTab === "kycFlows",
    refetchOnWindowFocus: false,
  });

  const { mutate: updateKycCheck } = useUpdateKycCheck({
    onSuccess: () => queryClient.invalidateQueries(["kycCheck"]),
    onError: errorHandler,
  });

  const handleUpdateKycFLow = (value) => {
    const params = { [value.key]: value.value };
    updateKycCheck(params);
  };

  return {
    t,
    selectedTab,
    setSelectedTab,
    setOver,
    over,
    setSort,
    sort,
    setOrderBy,
    selected,
    showModal,
    setShowModal,
    handleShowModal,
    handleClose,
    type,
    kycLabels,
    loading,
    updateKycLabel,
    handleSubmitKycLabel,
    selectedKycLabel,
    setSelectedKycLabel,
    pendingKycList,
    handleUpdateStatus,
    refetchPendingKycList,
    refetchKycLabels,
    limit,
    page,
    setLimit,
    setPage,
    handleUpdateKycFLow,
    kycCheck,
    refetchKycCheck,
    updateKycCheck,
  };
};

export default useKycLabels;
