import {
  Button,
  Col,
  Modal,
  Row,
  Form as BForm,
  Spinner,
} from '@themesberg/react-bootstrap';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { uploadPopupSchema } from './schema.js';

const EditUploadPopup = ({
  t,
  type,
  data,
  show,
  setShow,
  createUpdate,
  loading,
  popupList,
}) => {
  const [image, setImage] = useState(null);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            {type} {t('popupManagement.uploadPopup.title')}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={{
              mobileImage: null,
              desktopImage: null,
              isActive: data?.isActive || false,
              popupId: data?.popupId || '',
              visibility: data?.popupId
                ? data?.visibility === 0
                  ? '0'
                  : (data?.visibility === 1 ? '1' : '2')
                : '',
              popupName: data?.popupName || '',
              textOne: data?.textOne || '',
              textTwo: data?.textTwo || '',
              textThree: data?.textThree || '',
              btnText: data?.btnText || '',
              btnRedirection: data?.btnRedirection || '',
              popName: data?.popName || ''
            }}
            validationSchema={uploadPopupSchema(type, t)}
            onSubmit={(formValues) => {
              const data = {
                isActive: formValues.isActive,
                visibility: formValues.visibility,
                popupName: formValues.popupName,
                textOne: formValues.textOne,
                textTwo: formValues.textTwo,
                textThree: formValues.textThree,
                btnText: formValues.btnText,
                btnRedirection: formValues.btnRedirection,
                popName: formValues.popName
              };
              if (formValues.mobileImage)
                data.mobileImage = formValues.mobileImage;
              if (formValues.desktopImage)
                data.desktopImage = formValues.desktopImage;
              if (formValues.popupId)
                data.popupId = formValues.popupId;
              createUpdate(data);
            }}
          >
            {({
              values,
              errors,
              handleSubmit,
              handleBlur,
              setFieldValue,
              handleChange,
            }) => (
              <Form>
                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.visibility.label')}{' '}
                      <span className='text-danger'>*</span>
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Select
                      type='select'
                      name='visibility'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.visibility}
                    >
                      <option value='' disabled>
                        ---
                        {t(
                          'popupManagement.constant.selectPopupVisibility'
                        )}
                        ---
                      </option>
                      <option value='0'>
                        {t('popupManagement.constant.beforeLogin')}
                      </option>
                      <option value='1'>
                        {t('popupManagement.constant.afterLogin')}
                      </option>
                      <option value='2'>
                        {t('popupManagement.constant.both')}
                      </option>
                    </BForm.Select>
                    <ErrorMessage
                      component='div'
                      name='visibility'
                      className='text-danger'
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.name.label')}
                      <span className='text-danger'>*</span>
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      disabled
                      name='popName'
                      placeholder={t(
                        'popupManagement.inputField.name.placeholder'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.popName}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.pageName.label')}{' '}
                      <span className='text-danger'>*</span>
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Select
                      type='select'
                      disabled
                      name='popupName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.popupName}
                    >
                      <option value='' disabled>
                        ---
                        {t(
                          'popupManagement.constant.selectPageName'
                        )}
                        ---
                      </option>
                      <option value='lobbyPage'>
                        {t('popupManagement.constant.lobbyPage')}
                      </option>
                      <option value='promotionPage'>
                        {t('popupManagement.constant.promotionPage')}
                      </option>
                      <option value='rewardPage'>
                        {t('popupManagement.constant.rewardPage')}
                      </option>
                      <option value='sweeperScratchersPage'>
                        {t('popupManagement.constant.sweeperScratchersPage')}
                      </option>
                      <option value='storePage'>
                        {t('popupManagement.constant.storePage')}
                      </option>
                    </BForm.Select>
                    <ErrorMessage
                      component='div'
                      name='popupName'
                      className='text-danger'
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.textOne.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='textOne'
                      placeholder={t(
                        'popupManagement.inputField.textOne.placeholder'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.textOne}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.textTwo.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='textTwo'
                      placeholder={t(
                        'popupManagement.inputField.textTwo.placeholder'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.textTwo}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.textThree.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='textThree'
                      placeholder={t(
                        'popupManagement.inputField.textThree.placeholder'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.textThree}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('popupManagement.inputField.btnText.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='btnText'
                      placeholder={t(
                        'popupManagement.inputField.btnText.placeholder'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.btnText}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t(
                        'popupManagement.inputField.btnRedirection.label'
                      )}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Select
                      ype='text'
                      name='btnRedirection'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.btnRedirection}
                    >
                      <option value=''>
                        {t('popupManagement.constant.none')}
                      </option>
                      {/* {data?.visibility !== 1 && ( */}
                      <option value='store'>
                        {t('popupManagement.constant.store')}
                      </option>
                      {/* )} */}
                      <option value='reward'>
                        {t('popupManagement.constant.reward')}
                      </option>
                      <option value='promotionsPage'>
                        {t('popupManagement.constant.promotionsPage')}
                      </option>
                      <option value='sweeperScratchers'>
                        {t('popupManagement.constant.sweeperScratchers')}
                      </option>
                    </BForm.Select>
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('casinoSubCategory.inputField.active.label')}{' '}
                      <span className='text-danger'>*</span>
                    </BForm.Label>

                    <BForm.Check
                      type='checkbox'
                      className='mx-auto'
                      name='isActive'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.isActive}
                      defaultChecked={values.isActive}
                    />
                  </Col>
                </Row>


                <Row className='mt-3'>
                  <Col>
                    <Row>
                      <Col className='d-flex align-items-center'>
                        <Col>
                          <BForm.Label>
                            {t(
                              'popupManagement.inputField.mobileImage.label'
                            )}
                            <span className='text-danger'> *</span>
                          </BForm.Label>
                        </Col>

                        <Col xs={9}>
                          <BForm.Control
                            type='file'
                            name='mobileImage'
                            onChange={(event) => {
                              setImage(event?.target?.files[0]);
                              setFieldValue(
                                'mobileImage',
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={handleBlur}
                          />

                          <ErrorMessage
                            component='div'
                            name='mobileImage'
                            className='text-danger'
                          />
                        </Col>
                      </Col>
                    </Row>
                    {!errors?.mobileImage &&
                      (type === 'Create' ? (
                        values?.mobileImage && (
                          <Row className='text-center'>
                            <Col>
                              <img
                                alt='not found'
                                className='mt-2'
                                style={{
                                  maxWidth: '100px',
                                  maxHeight: '100px',
                                }}
                                src={
                                  values?.mobileImage &&
                                  URL.createObjectURL(values?.mobileImage)
                                }
                              />
                            </Col>
                          </Row>
                        )
                      ) : (
                        <Row className='text-center'>
                          <Col>
                            <img
                              alt='not found'
                              className='mt-2'
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                              src={
                                values?.mobileImage
                                  ? URL.createObjectURL(values?.mobileImage)
                                  : data?.mobileImageUrl
                              }
                            />
                          </Col>
                        </Row>
                      ))}
                  </Col>

                  <Col>
                    <Row>
                      <Col className='d-flex align-items-center'>
                        <Col>
                          <BForm.Label>
                            {t(
                              'popupManagement.inputField.desktopImage.label'
                            )}
                            <span className='text-danger'> *</span>
                          </BForm.Label>
                        </Col>

                        <Col xs={9}>
                          <BForm.Control
                            type='file'
                            name='desktopImage'
                            onChange={(event) => {
                              setImage(event?.target?.files[0]);
                              setFieldValue(
                                'desktopImage',
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={handleBlur}
                          />

                          <ErrorMessage
                            component='div'
                            name='desktopImage'
                            className='text-danger'
                          />
                        </Col>
                      </Col>
                    </Row>
                    {!errors?.desktopImage &&
                      (type === 'Create' ? (
                        values?.desktopImage && (
                          <Row className='text-center'>
                            <Col>
                              <img
                                alt='not found'
                                className='mt-2'
                                style={{
                                  maxWidth: '100px',
                                  maxHeight: '100px',
                                }}
                                src={
                                  values?.desktopImage &&
                                  URL.createObjectURL(values?.desktopImage)
                                }
                              />
                            </Col>
                          </Row>
                        )
                      ) : (
                        <Row className='text-center'>
                          <Col>
                            <img
                              alt='not found'
                              className='mt-2'
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                              src={
                                values?.desktopImage
                                  ? URL.createObjectURL(values?.desktopImage)
                                  : data?.desktopImageUrl
                              }
                            />
                          </Col>
                        </Row>
                      ))}
                  </Col>
                </Row>

                <div className='mt-4 d-flex justify-content-between align-items-center'>
                  <Button variant='warning' onClick={() => setShow(false)}>
                    {t('popupManagement.uploadPopup.cancel')}
                  </Button>
                  <Button
                    variant='success'
                    onClick={() => {
                      handleSubmit();
                      setImage(null);
                    }}
                    className='ml-2'
                  // disabled={image}
                  >
                    {t('popupManagement.uploadPopup.submit')}
                    {loading && (
                      <Spinner
                        style={{ marginLeft: '4px' }}
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditUploadPopup;
