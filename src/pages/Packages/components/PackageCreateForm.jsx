import React, { useEffect, useState } from 'react';
import {
  Button,
  Form as BForm,
  Row,
  Col,
  Spinner,
} from '@themesberg/react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Form, ErrorMessage } from 'formik';
import Datetime from 'react-datetime';
import { AdminRoutes } from '../../../routes';
import { formatDateYMD, formatDateMDY } from '../../../utils/dateFormatter';
import Trigger from '../../../components/OverlayTrigger';
import ReactCreatable from '../../../components/ReactSelectField/ReactCreatable';
// import { ColorPicker } from 'react-color-palette';
// import ColorPickerForm from './colorPiker';
import { SketchPicker } from 'react-color';

const PackageCreateForm = ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  loading,
  navigate,
  setFieldValue,
  packageData,
  isEdit = false,
  typeOptions,
  typeValue,
  setTypeValue,
  isSelectLoading,
  handleCreateOption,
}) => {
  const { t } = useTranslation(['packages']);

  return (
    <>
      <Form>
        <Row>
          <Col>
            <BForm.Label>
              {t('createPackage.inputFields.amountField.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='amount'
              min='0'
              placeholder={t(
                'createPackage.inputFields.amountField.placeholder'
              )}
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='amount'
              className='text-danger'
            />
          </Col>

          <Col>
            <BForm.Label>
              {/* {t('createPackage.inputFields.amountField.label')} */}
              Previous Amount
            </BForm.Label>

            <BForm.Control
              type='number'
              name='previousAmount'
              min='0'
              placeholder={t(
                // 'createPackage.inputFields.amountField.placeholder'
                'Previous Amount'
              )}
              value={values.previousAmount}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='previousAmount'
              className='text-danger'
            />
          </Col>

          <Col>
            <BForm.Label>
              {t('createPackage.inputFields.gcField.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='gcCoin'
              min='0'
              placeholder={t('createPackage.inputFields.gcField.placeholder')}
              value={values.gcCoin}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='gcCoin'
              className='text-danger'
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col md={6} sm={12}>
            <BForm.Label>
              {t('createPackage.inputFields.scField.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='scCoin'
              min='0'
              placeholder={t('createPackage.inputFields.scField.placeholder')}
              value={values.scCoin}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='scCoin'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <Row>
              <Col md={3} sm={6} className='mt-3'>
                <BForm.Label>
                  {t('createPackage.inputFields.active')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Check
                  type='switch'
                  name='isActive'
                  // placeholder='Enter Ac'
                  checked={values.isActive}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isEdit}
                />

                <ErrorMessage
                  component='div'
                  name='isActive'
                  className='text-danger'
                />
              </Col>

              {/* <Col md={3} sm={6} className='mt-3'>
            <BForm.Label>
            {t('createPackage.inputFields.hot')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Check
              type='switch'
              name='hot'
              // placeholder='Enter User Name'
              checked={values.hot}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <ErrorMessage
              component='div'
              name='hot'
              className='text-danger'
            />
          </Col> */}
              <Col md={3} sm={6} className='mt-3'>
                <BForm.Label>
                  {/* {t('createPackage.inputFields.hot')} */}Show Package Type
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Check
                  // type='switch'
                  // name='showPackageType'
                  // // placeholder='Enter Ac'
                  // checked={values.showPackageType}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // // disabled={isEdit}

                  type='switch'
                  name='showPackageType'
                  // placeholder='Enter Ac'
                  checked={values.showPackageType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={isEdit}
                />

                <ErrorMessage
                  component='div'
                  name='showPackageType'
                  className='text-danger'
                />
              </Col>

              <Col md={3} sm={6} className='mt-3'>
                <BForm.Label>
                  {t('createPackage.inputFields.visibleInStore')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Check
                  type='switch'
                  name='isVisibleInStore'
                  // placeholder='Enter User Name'
                  checked={values.isVisibleInStore}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  component='div'
                  name='isVisibleInStore'
                  className='text-danger'
                />
              </Col>
              {/* <Col md={3} sm={6} className='mt-3'>
                <BForm.Label>
                  {t('createPackage.inputFields.firstPurchaseApplicable')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Check
                  type='switch'
                  name='firstPurchaseApplicable'
                  // placeholder='Enter User Name'
                  checked={values.firstPurchaseApplicable}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  component='div'
                  name='firstPurchaseApplicable'
                  className='text-danger'
                />
              </Col> */}
            </Row>
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>
              {t('createPackage.inputFields.type.label')}{' '}
              {/* <span className='text-danger'>*</span> */}
            </BForm.Label>
            <ReactCreatable
              options={typeOptions}
              value={typeValue}
              setValue={(dataValue) => {
                setFieldValue('packageType', dataValue?.value || '');
                setTypeValue(dataValue);
              }}
              isLoading={isSelectLoading}
              handleCreateOption={(optionValue) => {
                setFieldValue('packageType', optionValue);
                handleCreateOption(optionValue);
              }}
            />
            <ErrorMessage
              component='div'
              name='packageType'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>
              {t('createPackage.inputFields.validTill')}{' '}
              <span className='text-danger'>*</span>
            </BForm.Label>
            <Datetime
              inputProps={{
                placeholder: 'MM/DD/YYYY',
                // disabled: details
              }}
              dateFormat='MM/DD/YYYY'
              onChange={(e) => {
                setFieldValue('validTill', formatDateMDY(e._d));
              }}
              value={values.validTill}
              isValidDate={(e) => {
                return (
                  e._d > new Date() ||
                  formatDateYMD(e._d) === formatDateYMD(new Date())
                );
              }}
              timeFormat={false}
            />
            <ErrorMessage
              component='div'
              name='validTill'
              className='text-danger'
            />
          </Col>

          <Col md={6} sm={12} className='mt-3 d-grid'>
            <BForm.Label>
              {t('createPackage.inputFields.thumbnail.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Text>
              <Trigger
                message={t('createPackage.inputFields.thumbnail.message')}
                id={'mes'}
              />
              <input
                id={'mes'}
                title=' '
                name='image'
                type='file'
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
              />
              {values?.image && (
                <img
                  alt='not found'
                  width='100px'
                  src={URL.createObjectURL(values.image)}
                />
              )}
              {!values?.image && packageData?.imageUrl && (
                <img alt='not found' width='60px' src={packageData.imageUrl} />
              )}
            </BForm.Text>

            <ErrorMessage
              component='div'
              name='image'
              className='text-danger'
            />
          </Col>
        </Row>

        <div className='mt-4 d-flex justify-content-between align-items-center'>
          <Button
            variant='warning'
            onClick={() => navigate(AdminRoutes.Packages)}
          >
            {t('createPackage.cancelButton')}
          </Button>

          <Button
            variant='success'
            onClick={() => {
              !loading && handleSubmit();
            }}
            className='ml-2'
            disabled={loading}
          >
            {t('createPackage.submitButton')}
            {loading && (
              <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            )}
          </Button>
        </div>
        {/* <ColorPickerForm /> */}
      </Form>
    </>
  );
};

export default PackageCreateForm;
