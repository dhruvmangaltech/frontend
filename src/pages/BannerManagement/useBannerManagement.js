import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllBanners } from '../../utils/apiCalls';
import {
  errorHandler,
  useCreateBannerMutation,
  useDeleteBanner,
  useUpdateBannerMutation,
} from '../../reactQuery/hooks/customMutationHook';
import { toast } from '../../components/Toast';
import { useTranslation } from 'react-i18next';
import { serialize } from 'object-to-formdata';

const useBannerManagement = () => {
  const [type, setType] = useState('');
  const { t } = useTranslation('casino');
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [bannerType, setBannerType] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageBannerId, setPageBannerId] = useState();
  const [status, setStatus] = useState('all');

  const { data: bannersList, isLoading: loading } = useQuery({
    queryKey: ['bannersList', limit, page, pageBannerId, status],
    queryFn: ({ queryKey }) => {
      const params = {
        page: queryKey[2],
        limit: queryKey[1],
        pageBannerId: queryKey[3],
        status: queryKey[4],
      };
      return getAllBanners(params);
    },

    select: (res) => res?.data?.banners,
    refetchOnWindowFocus: false,
  });

  const handleCreateEdit = (type, data) => {
    setType(type);
    setData(data);
    setShow(true);
  };

  const { mutate: createBanner, isLoading: createLoading } =
    useCreateBannerMutation({
      onSuccess: () => {
        toast(t('casinoBannerManagement.bannerCreateSuccess'), 'success');
        queryClient.invalidateQueries({ queryKey: ['bannersList'] });
        setShow(false);
      },
      onError: (error) => {
        setShow(false);
        errorHandler(error);
      },
    });

  const { mutate: updateBanner, isLoading: updateLoading } =
    useUpdateBannerMutation({
      onSuccess: () => {
        toast(t('casinoBannerManagement.bannerUpdateSuccess'), 'success');
        queryClient.invalidateQueries({ queryKey: ['bannersList'] });
        setShow(false);
      },
      onError: (error) => {
        setShow(false);
        errorHandler(error);
      },
    });

  const createUpdate = (data) => {
    type === 'Create'
      ? createBanner(
        serialize(data)
      )
      : updateBanner(
        serialize(data)
      );
  };

  const { mutate: deleteBanner } = useDeleteBanner({
    onSuccess: () => {
      toast(t('casinoBannerManagement.bannerDeleteSuccess'), 'success');
      queryClient.invalidateQueries({ queryKey: ['bannersList'] });
      setDeleteModalShow(false);
    },
  });

  const handleDeleteModal = (id) => {
    setPageBannerId(id);
    setDeleteModalShow(true);
  };

  const handleDeleteYes = () => {
    deleteBanner({ pageBannerId });
  };

  return {
    t,
    loading,
    bannersList,
    submitLoading: createLoading || updateLoading,
    handleCreateEdit,
    type,
    data,
    setShow,
    show,
    createUpdate,
    handleDeleteModal,
    handleDeleteYes,
    deleteModalShow,
    setDeleteModalShow,
    //setPage,setLimit,limit,page
  };
};

export default useBannerManagement;
