import React from 'react';
import {
  Button,
  Form as BForm,
  Row,
  Col,
  Spinner,
} from '@themesberg/react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Form, ErrorMessage } from 'formik';
import { AdminRoutes } from '../../../routes';
import Trigger from '../../../components/OverlayTrigger'

const RewardSystemCreateForm = ({rewardSystemData,values,handleChange,handleSubmit,handleBlur,loading,navigate,setFieldValue,isEdit = false,}) => {
  const { t } = useTranslation(['rewardSystem']);
   
  return (
    <>
      <Form>
        <Row>
          <Col>
            <BForm.Label>
              {t('createRewardSystem.inputFields.vipTier.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='string'
              name='vipTier'
              min='0'
              placeholder={t(
                'createRewardSystem.inputFields.vipTier.placeholder'
              )}
              value={values.vipTier}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='vipTier'
              className='text-danger'
            />
          </Col>

          <Col>
            <BForm.Label>
              {t('createRewardSystem.inputFields.scRequiredPlay.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='scRequiredPlay'
              min='0'
              placeholder={t('createRewardSystem.inputFields.scRequiredPlay.placeholder')}
              value={values.scRequiredPlay}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='scRequiredPlay'
              className='text-danger'
            />
          </Col>

          <Col>
            <BForm.Label>
              {t('createRewardSystem.inputFields.scRequiredMonth.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='scRequiredMonth'
              min='0'
              placeholder={t('createRewardSystem.inputFields.scRequiredMonth.placeholder')}
              value={values.scRequiredMonth}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='scRequiredMonth'
              className='text-danger'
            />
          </Col>


          <Col>
            <BForm.Label>
              {t('createRewardSystem.inputFields.gcRequiredPurchase.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='gcRequiredPurchase'
              min='0'
              placeholder={t('createRewardSystem.inputFields.gcRequiredPurchase.placeholder')}
              value={values.gcRequiredPurchase}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='gcRequiredPurchase'
              className='text-danger'
            />
          </Col>
          <Col>
            <BForm.Label>
              {t('createRewardSystem.inputFields.gcRequiredMonth.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='gcRequiredMonth'
              min='0'
              placeholder={t('createRewardSystem.inputFields.gcRequiredMonth.placeholder')}
              value={values.gcRequiredMonth}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='gcRequiredMonth'
              className='text-danger'
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col md={6} sm={12}>
            <BForm.Label>
              {t('createRewardSystem.inputFields.bonusSc.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='bonusSc'
              min='0'
              placeholder={t('createRewardSystem.inputFields.bonusSc.placeholder')}
              value={values.bonusSc}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='bonusSc'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12}>
            <BForm.Label>
              {t('createRewardSystem.inputFields.bonusGc.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='bonusGc'
              min='0'
              placeholder={t('createRewardSystem.inputFields.bonusGc.placeholder')}
              value={values.bonusGc}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='bonusGc'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>
              {t('createRewardSystem.inputFields.boost.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='boost'
              min='1'
              max='100'
              placeholder={t('createRewardSystem.inputFields.boost.placeholder')}
              value={values.boost}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='boost'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>
              {t('createRewardSystem.inputFields.rakeback.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='rakeback'
              min='1'
              max='100'
              placeholder={t('createRewardSystem.inputFields.rakeback.placeholder')}
              value={values.rakeback}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='rakeback'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>
              {t('createRewardSystem.inputFields.gradualLoss.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='gradualLoss'
              min='0'
              placeholder={t('createRewardSystem.inputFields.gradualLoss.placeholder')}
              value={values.gradualLoss}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='gradualLoss'
              className='text-danger'
            />
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <BForm.Label>
              {t('createRewardSystem.inputFields.level.label')}
              <span className='text-danger'> *</span>
            </BForm.Label>

            <BForm.Control
              type='number'
              name='level'
              min='0'
              placeholder={t('createRewardSystem.inputFields.level.placeholder')}
              value={values.level}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isEdit}
            />

            <ErrorMessage
              component='div'
              name='level'
              className='text-danger'
            />
          </Col>
          <Col className='d-grid'>
            <Row className='mt-3'>
              <BForm.Label>{t('createRewardSystem.inputFields.icon.label')}</BForm.Label>
              <BForm.Text>
              <Trigger message={t('createRewardSystem.inputFields.icon.message')} id={'mes'} />
                <input
                  id={'mes'}
                  title=' '
                  name='icon'
                  type='file'
                  onChange={(event) => {
                    setFieldValue(
                    'icon',
                    event.currentTarget.files[0]
                    )
                  }}
                  />
                  {values?.icon && (
                    <img
                      alt='not found'
                      width='60px'
                      src={URL.createObjectURL(values.icon)}
                    />
                  )}
                   {!values?.icon && rewardSystemData?.icon && (
                <img alt='not found' width='60px' src={rewardSystemData.icon} />
              )}
                  {/* {!values?.thumbnail && selectedSubCategory?.imageUrl && (
                    <img
                      alt='not found'
                      width='60px'
                      src={selectedSubCategory.imageUrl}
                    />
                  )} */}
                </BForm.Text>

                <ErrorMessage
                  component='div'
                  name='icon'
                  className='text-danger'
                />
              </Row>
          </Col>
          <Col md={6} sm={12} className='mt-3'>
            <Row>
              {/* <Col md={3} sm={6} className='mt-3'>
                <BForm.Label>
                  {t('createRewardSystem.inputFields.active')}
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
              </Col> */}
              <Col md={3} sm={6} className='mt-3'>
                <BForm.Label>
                  {t('createRewardSystem.inputFields.liveSupport')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Check
                  type='switch'
                  name='isLiveSupport'
                  checked={values.isLiveSupport}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isEdit}
                />

                <ErrorMessage
                  component='div'
                  name='isLiveSupport'
                  className='text-danger'
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <div className='mt-4 d-flex justify-content-between align-items-center'>
          <Button
            variant='warning'
            onClick={() => navigate(AdminRoutes.RewardSystem)}
          >
            {t('createRewardSystem.cancelButton')}
          </Button>

          <Button
            variant='success'
            onClick={() => {
              handleSubmit();
            }}
            className='ml-2'
          >
            {t('createRewardSystem.submitButton')}
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
      </Form>
    </>
  );
};

export default RewardSystemCreateForm;
