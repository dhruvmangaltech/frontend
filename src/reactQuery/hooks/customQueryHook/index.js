import { useQuery } from '@tanstack/react-query'
import {
  getPackagesListingRequest,
  getUserDocumentsRequest,
  getPackagesTypesRequest,
  getStateListing,
  getCityListing,
  getPlayerResponsible,
  getPlayerBankRequest,
  getPlayerCasinoRequest,
  getAuditLogs,
  generate2FA,
  getRewardSystemListing,
  getRewardSystemDetail,
  getVipTierListing,
  getPaymentProviderList,
  getSpinWheelConfiguration,
  getAllowedStateListing,
  getProductList,
  getStockList,
  getProductDetails,
  getLogs
} from '../../../utils/apiCalls'
import {
  GET_PACKAGES_LISTING,
  GET_REWARD_SYSTEM_LISTING,
  GET_USER_DOCUMENT,
  GET_PACKAGES_TYPES_LISTING,
  GET_STATE_LISTING,
  GET_CITY_LISTING,
  GET_PLAYER_RESPONSIBLE,
  GET_PLAYER_BANK_DETAILS,
  GET_PLAYER_CASINO_DETAILS,
  GET_PLAYER_ACTIVITY_DETAILS,
  GET_2FA_ACTIVITY_DETAILS,
  GET_REWARD_SYSTEM_DETAIL,
  GET_VIP_TIER_LISTING,
  GET_PAYMENT_PROVIDER_LISTING,
  GET_SPIN_WHEEL_CONFIGURATION,
  GET_ALLOWED_STATE_LISTING,
  GET_PRODUCT_LISTING,
  GET_PRODUCT_DETAILS
} from '../../queryKeys'

// get User Documents custom query hook
const getUserDocument = (params) => {
  return getUserDocumentsRequest(params)
}

export const useGetUserDocumentsQuery = ({ userId }) => {
  return useQuery({
    queryKey: [GET_USER_DOCUMENT, userId],
    queryFn: () => {
      return getUserDocument({ userId })
    },
    refetchOnWindowFocus: false,
  })
}

// get Packages Listing custom query hook
const getPackagesListing = (params) => {
  return getPackagesListingRequest(params)
}

export const useGetPackagesListingQuery = ({ params, enabled, getSinglePackageSuccessToggler }) => {
  return useQuery({
    queryKey: [GET_PACKAGES_LISTING, ...Object.values(params)],
    queryFn: () => {
      return getPackagesListing(params)
    },
    enabled,
    select: (data) => data?.data?.packageList || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      getSinglePackageSuccessToggler && getSinglePackageSuccessToggler(data?.rows?.[0] || {});
    }
  })
}

// get Packages Types custom query hook
const getPackagesTypesListing = (params) => {
  return getPackagesTypesRequest(params)
}

export const useGetPackagesTypesQuery = ({ params, enabled, successToggler }) => {
  return useQuery({
    queryKey: [GET_PACKAGES_TYPES_LISTING],
    queryFn: () => {
      return getPackagesTypesListing(params)
    },
    enabled,
    select: (data) => data?.data?.packageTypes || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler(data);
    }
  })
}

export const getStateListQuery = ({ params, successToggler, errorToggler, enabled }) => {
  return useQuery({
    queryKey: [GET_STATE_LISTING],
    queryFn: () => {
      return getStateListing(params)
    },
    enabled,
    select: (data) => {
      return data?.data?.data || {}
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    },
    onError: (error) => {
      errorToggler && errorToggler(error)
    }
  })
}

export const getCityListQuery = ({ params, successToggler, errorToggler, enabled }) => {
  return useQuery({
    queryKey: [GET_CITY_LISTING, params.stateId],
    queryFn: () => {
      return getCityListing(params)
    },
    enabled,
    select: (data) => {
      return data?.data?.data || {}
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    },
    onError: (error) => {
      errorToggler && errorToggler(error)
    }
  })
}

export const getAllowedStateListQuery = ({ params, successToggler, errorToggler, enabled }) => {
  const query = useQuery({
    queryKey: [GET_ALLOWED_STATE_LISTING],
    queryFn: () => {
      return getAllowedStateListing(params)
    },
    enabled,
    select: (data) => {
      return data?.data?.data || {}
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    },
    onError: (error) => {
      errorToggler && errorToggler(error)
    }
  });

  return {
    ...query,
    refetch: query.refetch  // Expose refetch method
  };
};


export const getPlayerResponsibleQuery = ({ params, successToggler, errorToggler, enabled }) => {
  return useQuery({
    queryKey: [GET_PLAYER_RESPONSIBLE, params.userId],
    queryFn: () => {
      return getPlayerResponsible(params)
    },
    enabled,
    select: (data) => {
      return data?.data || {}
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    },
    onError: (error) => {
      console.log('error', error)
      errorToggler && errorToggler(error)
    }
  })
}

export const useGetPlayerBankQuery = ({ params, successToggler }) => {
  return useQuery({
    queryKey: [GET_PLAYER_BANK_DETAILS],
    queryFn: () => {
      return getPlayerBankRequest(params)
    },
    select: (data) => {
      return data?.data?.bankDetails || {}
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    }
  })
}

export const useGetPlayerCasinoQuery = ({ params, successToggler }) => {
  return useQuery({
    queryKey: [GET_PLAYER_CASINO_DETAILS],
    queryFn: () => {
      return getPlayerCasinoRequest(params)
    },
    select: (data) => {
      return data?.data?.userCasinoDetail || {}
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    }
  })
}

export const usePlayerActivityQuery = ({ params, successToggler }) => {
  return useQuery({
    queryKey: [GET_PLAYER_ACTIVITY_DETAILS, params.limit, params.pageNo],
    queryFn: () => {
      return getAuditLogs(params)
    },
    enabled: true,
    select: (data) => {
      return data?.data?.activityLogs || []
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    }
  })
}

export const useGenerate2FAQuery = ({ params, enabled, successToggler }) => {
  return useQuery({
    queryKey: [GET_2FA_ACTIVITY_DETAILS],
    queryFn: () => {
      return generate2FA(params)
    },
    enabled: !!enabled,
    select: (data) => {
      return data?.data?.result || []
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      successToggler && successToggler(data)
    }
  })
}

// get Reward System Listing custom query hook
const getRewardSystemListings = (params) => {
  return getRewardSystemListing(params)
}

export const useGetRewardSystemListingQuery = ({ params, enabled, getSingleRwardSystemSuccessToggler }) => {
  return useQuery({
    queryKey: [GET_REWARD_SYSTEM_LISTING, ...Object.values(params)],
    queryFn: () => {
      return getRewardSystemListings(params)
    },
    enabled,
    select: (data) => data?.data?.vipTiers || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      getSingleRwardSystemSuccessToggler && getSingleRwardSystemSuccessToggler(data?.rows?.[0] || {});
    }
  })
}

// get Vip Tier Listing custom query hook

export const useGetVipTierListingQuery = () => {
  return useQuery({
    queryKey: [GET_VIP_TIER_LISTING],
    queryFn: () => {
      return getVipTierListing()
    },
    select: (data) => data?.data?.vipTierDetail || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

// get Reward System Detail custom query hook
const getRewardSystemDetails = (params) => {
  return getRewardSystemDetail(params)
}

export const useGetRewardSystemDetailQuery = ({ params, enabled}) => {
  return useQuery({
    queryKey: [GET_REWARD_SYSTEM_LISTING],
    queryFn: () => {
      return getRewardSystemDetails(params)
    },
    enabled,
    select: (data) => data?.data?.getVipTierDetails || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useGetPaymentProviderListingQuery = () => {
  return useQuery({
    queryKey: [GET_PAYMENT_PROVIDER_LISTING],
    queryFn: () => {
      return getPaymentProviderList()
    },
    select: (data) => data?.data?.paymentProviders || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useGetSpinWheel = () => {
  return useQuery({
    queryKey: [GET_SPIN_WHEEL_CONFIGURATION],
    queryFn: () => {
      return getSpinWheelConfiguration()
    },
    select: (data) => data?.data?.wheelConfiguration || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useGetProductsListing = ({params}) => {
  return useQuery({
    queryKey: [GET_PRODUCT_LISTING],
    queryFn: () => {
      return getProductList(params)
    },
    select: (data) => data?.data?.productList || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useGetStockListing = () => {
  return useQuery({
    queryKey: [GET_STATE_LISTING],
    queryFn: () => {
      return getStockList()
    },
    select: (data) => data?.data?.stockList || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useGetProductDetails = (params) => {
  return useQuery({
    queryKey: [GET_PRODUCT_DETAILS, Object.values(params)],
    queryFn: () => {
      return getProductDetails(params)
    },
    select: (data) => data?.data?.product || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useStockLogs = (params, permission) => {
  return useQuery({
    queryKey: [GET_PRODUCT_DETAILS],
    queryFn: () => {
      return getLogs(params, Object.values(params))
    },
    enabled: permission,
    select: (data) => data?.data?.stockLogsList || {},
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}



