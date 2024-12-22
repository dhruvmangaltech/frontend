import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllPopup } from '../../utils/apiCalls';
import {
  errorHandler,
  useCreatePopupMutation,
  useDeletePopup,
  useUpdatePopupMutation,
} from '../../reactQuery/hooks/customMutationHook';
import { toast } from '../../components/Toast';
import { useTranslation } from 'react-i18next';
import { serialize } from 'object-to-formdata';

const usePopupManagement = () => {
  const [type, setType] = useState('');
  const { t } = useTranslation('casino');
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [popupId, setPopupId] = useState();
  const [status, setStatus] = useState('all');

  const { data: popupList, isLoading: loading } = useQuery({
    queryKey: ['popupList', limit, page, popupId, status],
    queryFn: ({ queryKey }) => {
      const params = {
        page: queryKey[2],
        limit: queryKey[1],
        popupId: queryKey[3],
        status: queryKey[4],
      };
      return getAllPopup(params);
    },

    select: (res) => res?.data?.popups,
    refetchOnWindowFocus: false,
  });

  const handleCreateEdit = (type, data) => {
    setType(type);
    setData(data);
    setShow(true);
  };

  const { mutate: createPopup, isLoading: createLoading } =
    useCreatePopupMutation({
      onSuccess: () => {
        toast(t('popupManagement.popupCreateSuccess'), 'success');
        queryClient.invalidateQueries({ queryKey: ['popupList'] });
        setShow(false);
      },
      onError: (error) => {
        setShow(false);
        errorHandler(error);
      },
    });

  const { mutate: updatePopup, isLoading: updateLoading } =
    useUpdatePopupMutation({
      onSuccess: () => {
        toast(t('popupManagement.popupUpdateSuccess'), 'success');
        queryClient.invalidateQueries({ queryKey: ['popupList'] });
        setShow(false);
      },
      onError: (error) => {
        setShow(false);
        errorHandler(error);
      },
    });

  const createUpdate = (data) => {
    type === 'Create'
      ? createPopup(
        serialize(data)
      )
      : updatePopup(
        serialize(data)
      );
  };

  const { mutate: deletePopup } = useDeletePopup({
    onSuccess: () => {
      toast(t('popupManagement.popupDeleteSuccess'), 'success');
      queryClient.invalidateQueries({ queryKey: ['popupList'] });
      setDeleteModalShow(false);
    },
  });

  const handleDeleteModal = (id) => {
    setPopupId(id);
    setDeleteModalShow(true);
  };

  const handleDeleteYes = () => {
    deletePopup({ popupId });
  };

  return {
    t,
    loading,
    popupList,
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
  };
};

export default usePopupManagement;
