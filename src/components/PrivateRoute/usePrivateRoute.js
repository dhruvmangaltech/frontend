import { useNavigate } from "react-router-dom";
import { getLoginToken } from "../../utils/storageUtils";
import { AdminRoutes } from "../../routes";
import { useRedeemNotification, useUserStore } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getAdminDetails, getRedeemNotification } from "../../utils/apiCalls";
import { toast } from "../Toast";

const usePrivateRoute = () => {
  const { userDetails, permissions } = useUserStore((state) => state);
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const setRedeemNotification = useRedeemNotification(
    (state) => state.setRedeemNotification
  );

  const navigate = useNavigate();
  const { isInitialLoading: loading } = useQuery({
    queryKey: ["adminDetails"],
    queryFn: () => getAdminDetails({}),
    onSuccess: (res) => {
      setUserDetails(res?.data?.adminDetails);
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
    enabled: !!getLoginToken() && !userDetails,
  });

  const { data: redeemNotification } = useQuery({
    queryKey: ["redeemNotification"],
    queryFn: () => getRedeemNotification(),
    onSuccess: (res) => {
      setRedeemNotification(res.redeemNotification);
    },
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  return {
    userDetails,
    permissions,
    loading,
    redeemNotification,
  };
};

export default usePrivateRoute;
