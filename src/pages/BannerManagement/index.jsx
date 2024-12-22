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
import EditUploadBanner from './EditUploadBanner';
import useBannerManagement from './useBannerManagement';
import Trigger from '../../components/OverlayTrigger';
import { bannerType } from './constants';
import { DeleteConfirmationModal } from '../../components/ConfirmationModal';
import useCheckPermission from '../../utils/checkPermission';
import PaginationComponent from '../../components/Pagination';

const BannerManagement = () => {
  const {
    t,
    pageBannerId,
    loading,
    handleCreateEdit,
    type,
    data,
    setShow,
    show,
    createUpdate,
    bannersList,
    submitLoading,
    handleDeleteModal,
    handleDeleteYes,
    deleteModalShow,
    setDeleteModalShow,
    //setPage,setLimit,limit,page
  } = useBannerManagement();

  const { isHidden } = useCheckPermission();

  if (loading) return <Preloader />;
  return (
    <>
      <>
      <Row className='mb-2'>
          <Col>
            <h3>{t('casinoBannerManagement.title')}</h3>
          </Col>

          <Col>
            <div className='d-flex justify-content-end'>
              <Button
                variant='success'
                size='sm'
                onClick={() => handleCreateEdit('Create', {})}
              >
                {t('casinoBannerManagement.uploadButton')}
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
                      t('casinoBannerManagement.headers.id'),
                      t('casinoBannerManagement.headers.name'),
                      t('casinoBannerManagement.headers.visibility'),
                      t('casinoBannerManagement.headers.bannerMobile'),
                      t('casinoBannerManagement.headers.bannerDesktop'),
                      t('casinoBannerManagement.headers.pageName'),
                      t('casinoBannerManagement.headers.action'),
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {bannersList &&
                    bannersList?.rows?.map((item) => {
                      return (
                        <tr key={item.pageBannerId}>
                          <td>{item.pageBannerId}</td>
                          <td>{item?.name}</td>
                          <td>
                            {item.visibility === 1 ? t('casinoBannerManagement.constant.afterLogin')
                              : (item.visibility === 0 ? t('casinoBannerManagement.constant.beforeLogin') :
                                t('casinoBannerManagement.constant.both')
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
                              {t('casinoBannerManagement.bannerPreview')}
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
                              {t('casinoBannerManagement.bannerPreview')}
                            </span>
                          </td>
                          <td>{t(`casinoBannerManagement.constant.${item.pageName}`)}</td>
                          <td>
                            <Trigger
                              message={t(
                                'casinoBannerManagement.updateMessage'
                              )}
                              id={item.pageBannerId + 'warn'}
                            />
                            <Button
                              id={item.pageBannerId + 'warn'}
                              size='sm'
                              variant='warning'
                              onClick={() => {
                                handleCreateEdit('Update', item);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Trigger
                              message={t('casinoBannerManagement.delete')}
                              id={item.pageBannerId + 'delete'}
                            />
                            <Button
                              id={item.pageBannerId + 'delete'}
                              className='m-1'
                              size='sm'
                              variant='danger'
                              // hidden={isHidden({
                              //   module: { key: 'Bonus', value: 'D' },
                              // })}
                              onClick={() =>
                                handleDeleteModal(item.pageBannerId)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}

                  {(!bannersList || bannersList?.count === 0) && (
                    <tr>
                      <td colSpan={4} className='text-danger text-center'>
                        {t('casinoBannerManagement.noDataFound')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* {bannersList?.count !== 0 &&
                (
                  <PaginationComponent
                    page={bannersList?.count < page ? setPage(1) : page}
                    totalPages={Math.ceil(bannersList?.count / limit)}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                  />

                )} */}
      </>
      {deleteModalShow && (
        <DeleteConfirmationModal
          deleteModalShow={deleteModalShow}
          setDeleteModalShow={setDeleteModalShow}
          handleDeleteYes={handleDeleteYes}
        />
      )}
      <EditUploadBanner
        bannersList={bannersList}
        pageBannerId={pageBannerId}
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

export default BannerManagement;
