import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  Button,
  Col,
  Row,
  Table,
} from '@themesberg/react-bootstrap';
import React from 'react';
import Preloader from '../../components/Preloader';
import Trigger from '../../components/OverlayTrigger';
import { DeleteConfirmationModal } from '../../components/ConfirmationModal';
import useCheckPermission from '../../utils/checkPermission';
import usePopupManagement from './usePopupManagement';
import EditUploadPopup from './EditUploadPopup';

const PopupManagement = () => {
  const {
    t,
    popupId,
    loading,
    handleCreateEdit,
    type,
    data,
    setShow,
    show,
    createUpdate,
    popupList,
    submitLoading,
    handleDeleteModal,
    handleDeleteYes,
    deleteModalShow,
    setDeleteModalShow,
  } = usePopupManagement();

  const { isHidden } = useCheckPermission();

  if (loading) return <Preloader />;
  return (
    <>
      <>
      <Row className='mb-2'>
          <Col>
            <h3>{t('popupManagement.title')}</h3>
          </Col>

          <Col>
            <div className='d-flex justify-content-end'>
              <Button
                variant='success'
                size='sm'
                onClick={() => handleCreateEdit('Create', {})}
              >
                {t('popupManagement.uploadButton')}
              </Button>
            </div>
          </Col>
        </Row>
              <Table
                bordered
                striped
                responsive
                hover
                size='sm'
                className='text-center mt-2'
              >
                <thead className='thead-dark'>
                  <tr>
                    {[
                      t('popupManagement.headers.id'),
                      t('popupManagement.headers.name'),
                      t('popupManagement.headers.visibility'),
                      t('popupManagement.headers.popupMobile'),
                      t('popupManagement.headers.popupDesktop'),
                      t('popupManagement.headers.popupName'),
                      t('popupManagement.headers.action'),
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {popupList &&
                    popupList?.rows?.map((item) => {
                      return (
                        <tr key={item.popupId}>
                          <td>{item.popupId}</td>
                          <td>{item.popName}</td>
                          <td>
                            {item.visibility === 1 ? t('popupManagement.constant.afterLogin')
                              : (item.visibility === 0 ? t('popupManagement.constant.beforeLogin') :
                                t('popupManagement.constant.both')
                              )
                            }
                          </td>
                          <td>
                            <span
                              style={{
                                cursor: 'pointer',
                              }}
                              className='text-link'
                              onClick={() => window.open(item.mobileImageUrl)}
                            >
                              {t('popupManagement.popupPreview')}
                            </span>
                          </td>

                          <td>
                            <span
                              style={{
                                cursor: 'pointer',
                              }}
                              className='text-link'
                              onClick={() => window.open(item.desktopImageUrl)}
                            >
                              {t('popupManagement.popupPreview')}
                            </span>
                          </td>
                          <td>{t(`popupManagement.constant.${item.popupName}`)}</td>
                          <td>
                            <Trigger
                              message={t(
                                'popupManagement.updateMessage'
                              )}
                              id={item.popupId + 'warn'}
                            />
                            <Button
                              id={item.popupId + 'warn'}
                              size='sm'
                              variant='warning'
                              onClick={() => {
                                handleCreateEdit('Update', item);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Trigger
                              message={t('popupManagement.delete')}
                              id={item.popupId + 'delete'}
                            />
                            <Button
                              id={item.popupId + 'delete'}
                              className='m-1'
                              size='sm'
                              variant='danger'
                              // hidden={isHidden({
                              //   module: { key: 'Bonus', value: 'D' },
                              // })}
                              onClick={() =>
                                handleDeleteModal(item.popupId)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}

                  {(!popupList || popupList?.count === 0) && (
                    <tr>
                      <td colSpan={12} className='text-danger text-center'>
                        {t('popupManagement.noDataFound')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
         
      </>
      {deleteModalShow && (
        <DeleteConfirmationModal
          deleteModalShow={deleteModalShow}
          setDeleteModalShow={setDeleteModalShow}
          handleDeleteYes={handleDeleteYes}
        />
      )}
      <EditUploadPopup
        popupList={popupList}
        popupId={popupId}
        t={t}
        type={type}
        data={data}
        show={show}
        setShow={setShow}
        loading={submitLoading}
        createUpdate={createUpdate}
      />
    </>
  );
};

export default PopupManagement;
