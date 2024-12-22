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
import { bannerType } from './constants.js';
import { uploadBannerSchema } from './schema.js';

const EditUploadBanner = ({
  t,
  type,
  data,
  show,
  setShow,
  createUpdate,
  loading,
  bannersList,
}) => {
  const [image, setImage] = useState(null);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            {type} {t('casinoBannerManagement.uploadBanner.title')}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={{
              mobileImage: null,
              desktopImage: null,
              isActive: data?.isActive || false,
              pageBannerId: data?.pageBannerId || '',
              visibility: data?.pageBannerId
                ? data?.visibility === 0
                  ? '0'
                  : (data?.visibility === 1 ? '1' : '2')
                : '',
              pageName : data?.pageName || '' ,
              textOne: data?.textOne || '',
              textTwo: data?.textTwo || '',
              textThree: data?.textThree || '',
              btnText: data?.btnText || '',
              btnRedirection: data?.btnRedirection || '',
              name: data?.name || ''
            }}
            validationSchema={uploadBannerSchema(type, t)}
            onSubmit={(formValues) => {
              const data = {
                isActive: formValues.isActive,
                visibility: formValues.visibility,
                pageName: formValues.pageName,
                textOne: formValues.textOne,
                textTwo: formValues.textTwo,
                textThree: formValues.textThree,
                btnText: formValues.btnText,
                btnRedirection: formValues.btnRedirection,
                name: formValues.name
              };
              if (formValues.mobileImage)
                data.mobileImage = formValues.mobileImage;
              if (formValues.desktopImage)
                data.desktopImage = formValues.desktopImage;
              if (formValues.pageBannerId)
                data.pageBannerId = formValues.pageBannerId;
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
                      {t('casinoBannerManagement.inputField.visibility.label')}{' '}
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
                          'casinoBannerManagement.constant.selectBannerVisibility'
                        )}
                        ---
                      </option>
                      <option value='0'>
                        {t('casinoBannerManagement.constant.beforeLogin')}
                      </option>
                      <option value='1'>
                        {t('casinoBannerManagement.constant.afterLogin')}
                      </option>
                      <option value='2'>
                        {t('casinoBannerManagement.constant.both')}
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
                      {t('casinoBannerManagement.inputField.name.label')}
                      <span className='text-danger'>*</span>
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='name'
                      placeholder={t(
                        'casinoBannerManagement.inputField.name.placeholder'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('casinoBannerManagement.inputField.pageName.label')}{' '}
                      <span className='text-danger'>*</span>
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Select
                      type='select'
                      name='pageName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pageName}
                    >
                      <option value='' disabled>
                        ---
                        {t(
                          'casinoBannerManagement.constant.selectPageName'
                        )}
                        ---
                      </option>
                      <option value='lobbySlider'>
                        {t('casinoBannerManagement.constant.lobbySlider')}
                      </option>
                      <option value='lobbyPage'>
                        {t('casinoBannerManagement.constant.lobbyPage')}
                      </option>
                      <option value='promotionPage'>
                        {t('casinoBannerManagement.constant.promotionPage')}
                      </option>
                      <option value='rewardPage'>
                        {t('casinoBannerManagement.constant.rewardPage')}
                      </option>
                      <option value='sweeperScratchersPage'>
                        {t('casinoBannerManagement.constant.sweeperScratchersPage')}
                      </option>
                      <option value='storePage'>
                        {t('casinoBannerManagement.constant.storePage')}
                      </option>
                    </BForm.Select>
                    <ErrorMessage
                      component='div'
                      name='visibility'
                      className='text-danger'
                    />
                  </Col>
                </Row>
                {/* <Row className='mt-3'>
                  <Col className='d-flex align-items-center'>
                    <Col>
                      <BForm.Label>{'Name'}
                        <span className='text-danger'> *</span>
                      </BForm.Label>
                    </Col>

                    <Col xs={9}>
                      <BForm.Control
                        type='text'
                        name='name'
                         placeholder={t('casinoBannerManagement.inputField.name.placeholder')}
                        onChange={handleChange}
                         value={values.name}
                        onBlur={handleBlur}
                      />

                      <ErrorMessage
                        component='div'
                        name='name'
                        className='text-danger'
                      />
                    </Col>
                  </Col>
                </Row> */}
                <Row className='mt-3'>
                  <Col className='d-flex'>
                    <BForm.Label>
                      {t('casinoBannerManagement.inputField.textOne.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='textOne'
                      placeholder={t(
                        'casinoBannerManagement.inputField.textOne.placeholder'
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
                      {t('casinoBannerManagement.inputField.textTwo.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='textTwo'
                      placeholder={t(
                        'casinoBannerManagement.inputField.textTwo.placeholder'
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
                      {t('casinoBannerManagement.inputField.textThree.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='textThree'
                      placeholder={t(
                        'casinoBannerManagement.inputField.textThree.placeholder'
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
                      {t('casinoBannerManagement.inputField.btnText.label')}
                    </BForm.Label>
                  </Col>

                  <Col xs={9}>
                    <BForm.Control
                      type='text'
                      name='btnText'
                      placeholder={t(
                        'casinoBannerManagement.inputField.btnText.placeholder'
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
                        'casinoBannerManagement.inputField.btnRedirection.label'
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
                        {t('casinoBannerManagement.constant.none')}
                      </option>
                      {/* {data?.visibility !== 1 && ( */}
                        <option value='store'>
                          {t('casinoBannerManagement.constant.store')}
                        </option>
                      {/* )} */}
                      <option value='reward'>
                        {t('casinoBannerManagement.constant.reward')}
                      </option>
                      <option value='promotionsPage'>
                        {t('casinoBannerManagement.constant.promotionsPage')}
                      </option>
                      <option value='sweeperScratchers'>
                        {t('casinoBannerManagement.constant.sweeperScratchers')}
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

                {/* <Row className='mt-3'>
                  <Col className='d-flex'>
                    <Col>
                      <BForm.Label>{t('casinoBannerManagement.inputField.type.label')}
                        <span className='text-danger'> *</span>
                      </BForm.Label>
                    </Col>

                    <Col xs={9}>
                       
                      <BForm.Select
                        disabled={type !== 'Create'}
                        type='select'
                        name='bannerType'
                        value={values?.bannerType}
                        size='sm'
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option key='' value=''>{t('casinoBannerManagement.inputField.type.option')}</option>

                        {type !== 'Create' ? bannerType?.map(({ label, value }, i) => {
                          return (
                            <option key={i} value={value}>{t(label)}</option>
                          )
                        }) : bannerType.filter(val => !Object.keys(bannersList).includes(val.value))?.map(({ label, value }, i) => {
                          return (
                            <option key={i} value={value}>{t(label)}</option>
                          )
                        }) }
                      </BForm.Select>

                      <ErrorMessage
                        component='div'
                        name='bannerType'
                        className='text-danger'
                      />
                    </Col>
                  </Col>
                </Row> */}

                <Row className='mt-3'>
                  <Col>
                    <Row>
                      <Col className='d-flex align-items-center'>
                        <Col>
                          <BForm.Label>
                            {t(
                              'casinoBannerManagement.inputField.mobileImage.label'
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
                              'casinoBannerManagement.inputField.desktopImage.label'
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
                    {t('casinoBannerManagement.uploadBanner.cancel')}
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
                    {t('casinoBannerManagement.uploadBanner.submit')}
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

export default EditUploadBanner;
