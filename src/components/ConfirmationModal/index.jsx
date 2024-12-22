import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, Form as BForm } from '@themesberg/react-bootstrap'
import './modalStyle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import Trigger from '../OverlayTrigger'
import { toast } from '../Toast'
import CopyToClipboard from 'react-copy-to-clipboard'
import Datetime from 'react-datetime'
import { useQuery } from '@tanstack/react-query'
import { getGallery } from '../../utils/apiCalls'
import { useTranslation } from 'react-i18next'
import { formatDateYMD } from '../../utils/dateFormatter'
import { Formik, Form, ErrorMessage } from 'formik'
import { SimpleEditFormContainer } from '../../pages/PlayerDetails/style'
import { documentApproveSchema } from '../../pages/PlayerDetails/components/EditInfo/schema'
import { SpinnerLoader } from "../Preloader";
import pdfImage from '../../assets/img/pages/pdfimage.png'
import { DocStatus } from '../UserDocsList/constants'
import axios from "axios";

export const ConfirmationModal = ({ show, setShow, handleYes, active, bonus, isBonus = false }) => {
  const { t } = useTranslation(['translation'])
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.areYouSure')}</Modal.Title>
      </Modal.Header>

      {!isBonus ? <Modal.Body>{t('confirmationModal.toggleStatus')} {active ? 'Active' : 'In-Active'}</Modal.Body> : <Modal.Body>{t('confirmationModal.toggleStatus')} {active ? 'Active' : 'In-Active'} {bonus.bonusType === 'daily bonus' ? 'all the daily bonuses' : bonus.bonusType === 'monthly bonus' && 'all the monthly bonuses'}?</Modal.Body>}

      <Modal.Footer>
        <Button variant='secondary' onClick={handleYes}>
          {t('confirmationModal.yes')}
        </Button>

        <Button variant='primary' onClick={() => setShow(false)}>
          {t('confirmationModal.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const DeleteConfirmationModal = ({
  deleteModalShow,
  setDeleteModalShow,
  handleDeleteYes
}) => {

  const { t } = useTranslation(['translation'])
  return (
    <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.areYouSure')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('confirmationModal.deleteMessage')}</Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleDeleteYes}>
          {t('confirmationModal.yes')}
        </Button>

        <Button variant='primary' onClick={() => setDeleteModalShow(false)}>
          {t('confirmationModal.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ApproveRejectModal = ({
  show,
  setShow,
  handleYes,
  status,
  imageUrl,
  docStatus
}) => {

  const { t } = useTranslation(['translation'])

  const [docUrl, setDocUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "X-AUTH-CLIENT": process.env.REACT_APP_X_AUTH_CLIENT,
          "X-HMAC-SIGNATURE": imageUrl?.signature,
        };
        const response = await axios.get(imageUrl?.documentUrl, {
          headers: headers,
          responseType: "blob",
        });
        let urlCreator = window.URL || window.webkitURL;
        let fileUrl = urlCreator.createObjectURL(response.data);
        setDocUrl(fileUrl);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    imageUrl?.signature ? fetchData() : setLoading(false);
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Player Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SimpleEditFormContainer>
          <Row className='mt-3 d-block'>
            {loading ? (
              <div style={{ marginLeft: "80px" }}>
                <SpinnerLoader />
              </div>
            ) : (
              <Col>
                {getUrlExtension(imageUrl?.documentUrl) === "pdf" ? (
                  <img
                    src={pdfImage}
                    onClick={() => window.open(imageUrl?.documentUrl)}
                    style={{ border: "1px solid grey", borderRadius: "12px" }}
                    className='mb-2 w-50 mx-auto d-block'
                  />
                ) : (
                  <img
                    src={imageUrl?.signature ? docUrl : imageUrl?.documentUrl}
                    width='200'
                    height='150'
                    alt={imageUrl?.signature ? docUrl : imageUrl?.documentUrl}
                    onClick={() => window.open(imageUrl?.signature ? docUrl : imageUrl?.documentUrl)}
                    style={{ border: "1px solid grey", borderRadius: "12px" }}
                    className='mb-2 w-50 mx-auto d-block'
                  />
                )}
              </Col>
            )}
          </Row>
          {(docStatus == 1 || docStatus == 2) ? <div className='fw-bold'>Status: {DocStatus?.[docStatus]}
          </div> : <Formik
            initialValues={{
              reason: '',
              expiryDate: '',
              status: ''
            }}
            validationSchema={documentApproveSchema()}
            onSubmit={(formValues, { resetForm }) => {
              if (status === 'approved') {
                handleYes(formValues.reason, '', formValues.expiryDate, formValues.status);
              }
              resetForm();
            }}
          >
            {({ values, setFieldValue, errors, handleChange, handleBlur, handleSubmit }) => (
              <Form>
                {/* <Row className='mt-3'>
                  <Col key={1} className='mt-2 text-center' xs={6}>
                    {loading ? (
                      <div style={{ marginLeft: "80px" }}>
                        <SpinnerLoader />
                      </div>
                    ) : (
                      <Col>
                        {getUrlExtension(imageUrl?.documentUrl) === "pdf" ? (
                          <img
                            src={pdfImage}
                            onClick={() => window.open(imageUrl?.documentUrl)}
                            style={{ border: "1px solid grey", borderRadius: "12px" }}
                            className='mb-2'
                          />
                        ) : (
                          <img
                            src={imageUrl?.signature ? docUrl : imageUrl?.documentUrl}
                            width='200'
                            height='150'
                            alt={imageUrl?.signature ? docUrl : imageUrl?.documentUrl}
                            onClick={() => window.open(imageUrl?.signature ? docUrl : imageUrl?.documentUrl)}
                            style={{ border: "1px solid grey", borderRadius: "12px" }}
                            className='mb-2'
                          />
                        )}
                      </Col>
                    )}
                  </Col>
                </Row> */}
                {/* <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      Document Expiry Date <span className='text-danger'>*</span>
                    </BForm.Label>
                    <Datetime
                      inputProps={
                        {
                          placeholder: 'YYYY-MM-DD',
                        }
                      }
                      dateFormat='YYYY-MM-DD'
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue('expiryDate', formatDateYMD(e._d))
                      }}
                      value={values.expiryDate}
                      isValidDate={(e) => {
                        return e._d > new Date() || formatDateYMD(e._d) === formatDateYMD(new Date())
                      }}
                      timeFormat={false}
                    />
                    <ErrorMessage
                      component='div'
                      name='expiryDate'
                      className='text-danger'
                    />
                  </Col>
                </Row> */}
                {/* <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      Status <span className='text-danger'>*</span>
                    </BForm.Label>
                    <div>
                      <BForm.Check
                        type='radio'
                        inline
                        label='Approved'
                        name='status'
                        value='approved'
                        checked={values.status === 'approved'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <BForm.Check
                        type='radio'
                        inline
                        label='Rejected'
                        name='status'
                        value='rejected'
                        checked={values.status === 'rejected'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <BForm.Check
                        type='radio'
                        inline
                        label='Hold'
                        name='status'
                        value='hold'
                        checked={values.status === 'hold'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <ErrorMessage
                      component='div'
                      name='status'
                      className='text-danger'
                    />
                  </Col>

                </Row> */}
                {/* <Row className='mt-3'>
                  <Col>
                    <BForm.Label>
                      Remarks
                      <span className='text-danger'> *</span>
                    </BForm.Label>

                    <BForm.Control
                      type='text'
                      as='textarea'
                      rows='3'
                      name='reason'
                      value={values.reason}
                      placeholder={'Enter Reason'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ErrorMessage
                      component='div'
                      name='reason'
                      className='text-danger'
                    />
                  </Col>
                </Row> */}
                {/* <Modal.Footer>
                  <Button
                    variant='secondary'
                    onClick={handleSubmit}
                  >
                    {t('confirmationModal.yes')}
                  </Button>

                  <Button variant='primary' onClick={() => setShow(false)}>
                    {t('confirmationModal.no')}
                  </Button>
                </Modal.Footer> */}

              </Form>
            )}
          </Formik>}
        </SimpleEditFormContainer>
      </Modal.Body>
    </Modal>
  )
}

export const GalleryModal = ({
  galleryModal,
  setGalleryModal
}) => {
  const { data: gallery } = useQuery({
    queryKey: ['gallery'],
    queryFn: () => getGallery(),
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.gallery
  })
  const { t } = useTranslation(['translation'])

  return (
    <Modal show={galleryModal} onHide={() => setGalleryModal(false)} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.galleryTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className='text-center align-items-center'>
          {gallery?.length > 0
            ? gallery?.map((img, index) => {
              return (
                <Col key={index} md={3} className='imagecontainer'>
                  <CopyToClipboard
                    text={img?.imageUrl}
                    onCopy={() => {
                      setGalleryModal(false)
                      toast(t('confirmationModal.copiedToClipboardToast'), 'success')
                    }}
                  >
                    <img
                      src={img?.imageUrl}
                      width='200'
                      height='150'
                      style={{ border: '2px solid aliceblue', borderRadius: '12px', cursor: 'pointer' }}
                      className='mb-2'
                    />
                  </CopyToClipboard>
                  <div className='text'>{img?.name}</div>
                  <Trigger message={t('confirmationModal.copyUrl')} id={img?.name} />
                  <CopyToClipboard
                    text={img?.imageUrl}
                    onCopy={() => {
                      setGalleryModal(false)
                      toast(t('confirmationModal.copiedToClipboardToast'), 'success')
                    }}
                  >
                    <Button
                      id={img?.name}
                      className='copy d-flex align-items-center'
                      variant='light'
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </Button>
                  </CopyToClipboard>
                </Col>
              )
            })
            : <h4 className='text-danger'>{t('confirmationModal.galleryNoImage')}</h4>}
        </Row>
      </Modal.Body>

    </Modal>
  )
}

export const ResetConfirmationModal = ({
  show,
  setShow,
  handleYes,
  data
}) => {
  const { t } = useTranslation(['translation'])
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.areYouSure')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('confirmationModal.resetMessage')} {data}?</Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => {
          handleYes(data)
          setShow(false)
        }
        }>
          {t('confirmationModal.yes')}
        </Button>

        <Button variant='primary' onClick={() => setShow(false)}>
          {t('confirmationModal.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const RemoveConfirmationModal = ({
  show,
  setShow,
  handleYes,
  removeLimit
}) => {
  const { t } = useTranslation(['translation'])
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.areYouSure')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('confirmationModal.removeLimitsMessage')} {removeLimit?.label.toLowerCase()}?</Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => {
          handleYes(removeLimit)
          setShow(false)
        }
        }>
          {t('confirmationModal.yes')}
        </Button>

        <Button variant='primary' onClick={() => setShow(false)}>
          {t('confirmationModal.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ApproveRedeemConfirmation = ({
  show,
  setShow,
  handleYes,
  redeemRequest,
  type
}) => {
  const { t } = useTranslation(['translation'])
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('confirmationModal.areYouSure')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <p className='text-success'>Successful {redeemRequest?.paymentProvider} Transactions (last 2 days): {redeemRequest?.successCount}</p>
        <p className='text-danger'>Failed {redeemRequest?.paymentProvider} Transactions (last 2 days): {redeemRequest?.failedCount}</p>
        <p>{type === 'approved' ? t('confirmationModal.approveMessage') : t('confirmationModal.cancelMessage')}?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => {
          handleYes()
          setShow(false)
        }
        }>
          {t('confirmationModal.yes')}
        </Button>

        <Button variant='primary' onClick={() => setShow(false)}>
          {t('confirmationModal.no')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
