import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/Toast";
import { useUserStore } from "../../store/store";
import { getAdminDetails, getSiteConfig } from "../../utils/apiCalls";
import { serialize } from "object-to-formdata";
import {
  useUpdateConfigMutation,
  useUpdateDepositConfigMutation,
} from "../../reactQuery/hooks/customMutationHook";
import { AdminRoutes } from "../../routes";
import { useTranslation } from "react-i18next";

const useCashierManagement = () => {
  const { t } = useTranslation(["cashier"]);
  const navigate = useNavigate();
  const [fetchAdmin, setFetchAdmin] = useState(false);
  const [redeemConfigEditable, setRedeemConfigEditable] = useState(false);
  const [depositConfigEditable, setDepositConfigEditable] = useState(false);
  const adminDetails = useUserStore((state) => state.userDetails);
  const [details, setDetails] = useState(adminDetails);
  const [selectedTab, setSelectedTab] = useState("redeemConfiguration");
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ["siteConfig"],
    queryFn: getSiteConfig,
    onSuccess: (data) => {
      setDetails({ ...adminDetails, siteConfig: data.config });
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
        errors.map((error) => {
          if (error?.description) toast(error?.description, "error");
        });
      }
    },
    refetchOnWindowFocus: false,
    enabled: adminDetails?.roleId === 1,
    select: (res) => res?.data,
  });

  const { mutate: updateConfig, isLoading: redeemConfigLoading } =
    useUpdateConfigMutation({
      onSuccess: (res) => {
        setRedeemConfigEditable(false);
        toast(res?.data?.message, "success");
      },
    });

  const { mutate: updateDepositConfigData, isLoading: depositConfigLoading } =
    useUpdateDepositConfigMutation({
      onSuccess: (res) => {
        console.log("called 2");
        setDepositConfigEditable(false);
        toast(res?.data?.message, "success");
      },
    });

  const updateSiteConfig = ({ data }) => {
    let siteConfBody = {
      minRedeemableCoins: data?.minRedeemableCoins,
      maxRedeemableCoins: data?.maxRedeemableCoins,
      maxNonPurchaserAmount: data?.maxNonPurchaserAmount,
      maxNonPurchaserDays: data?.maxNonPurchaserDays,
      weeklyRedeemableLimit: data?.weeklyRedeemableLimit,
      maxPendingRedemptionLimit: data?.maxPendingRedemptionLimit,
    };
    if (data?.authToken?.length > 0) siteConfBody.authToken = data.authToken;
    const res = serialize(siteConfBody);
    updateConfig(res);
  };

  const updateDepositConfig = ({ data }) => {
    let updateDepositConfBody = {
      dailyDepositLimit: data?.dailyDepositLimit,
    };
    const res = serialize(updateDepositConfBody);
    console.log("called 1");
    updateDepositConfigData(res);
  };

  useQuery({
    queryKey: ["adminDetails"],
    queryFn: () => getAdminDetails({}),
    onSuccess: (res) => {
      setUserDetails(res?.data?.adminDetails);
      queryClient.invalidateQueries({ queryKey: ["siteConfig"] });
      setFetchAdmin(false);
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const { errors } = error.response.data;
        errors.map((error) => {
          if (error?.description) toast(error?.description, "error");
        });
      }
      navigate(AdminRoutes.AdminSignin);
    },
    refetchOnWindowFocus: false,
    enabled: !!fetchAdmin,
  });

  return {
    details,
    selectedTab,
    setSelectedTab,
    redeemConfigEditable,
    setRedeemConfigEditable,
    updateSiteConfig,
    updateDepositConfig,
    redeemConfigLoading,
    depositConfigLoading,
    depositConfigEditable,
    setDepositConfigEditable,
    t,
  };
};

export default useCashierManagement;
