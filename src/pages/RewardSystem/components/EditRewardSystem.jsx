import React from 'react';
import { Card, Row, Col } from '@themesberg/react-bootstrap';
import { Formik } from 'formik';
import { updateRewardSystemSchema } from '../schemas';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../../components/Toast';
import { AdminRoutes } from '../../../routes';
import RewardSystemCreateForm from './RewardSystemCreateForm';
import useEditRewardSystem from '../hooks/useEditRewardSystem';
import { serialize } from 'object-to-formdata'


const EditRewardSystem = () => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    if (res?.data) {
      navigate(AdminRoutes.RewardSystem);
      toast('Reward System data Updated.', 'success', 'rewardSystemUpdate');
    }
  };

  const {
    rewardSystemData,
    editRewardSystem,
    vipTierId,
    loading,
    isSelectLoading,
  } = useEditRewardSystem(onSuccess);
  const handleEditRewardSystemSubmit = (formValues) => {

    const body = {
      "vipTierId": vipTierId,
      "name": formValues.vipTier,
      "scRequiredPlay": formValues.scRequiredPlay,
      "gcRequiredPurchase": formValues.gcRequiredPurchase,
      "scRequiredMonth": formValues.scRequiredMonth,
      "gcRequiredMonth": formValues.gcRequiredMonth,
      "bonusSc": formValues.bonusSc,
      "bonusGc": formValues.bonusGc,
      "rakeback": formValues.rakeback,
      "boost": formValues.boost,
      "level": formValues.level,
      "icon" : formValues.icon, 
      "gradualLoss" : formValues.gradualLoss,
      "liveSupport": formValues.isLiveSupport,
      "isActive": formValues.isActive,
    };
    editRewardSystem(serialize(body));
  };

  return (
    <div>
      <Row>
        <Col sm={8}>
          <h3>Edit Reward System</h3>
        </Col>
      </Row>

      <Card body>
        {rewardSystemData && (
          <Formik
            initialValues={{
              vipTierId: +vipTierId,
              vipTier: rewardSystemData?.name ?? '',
              scRequiredPlay: rewardSystemData?.scRequiredPlay ?? '',
              gcRequiredPurchase:  rewardSystemData?.gcRequiredPurchase ?? '',
              scRequiredMonth: rewardSystemData?.scRequiredMonth ?? '',
              gcRequiredMonth:  rewardSystemData?.gcRequiredMonth ?? '',
              bonusSc: rewardSystemData?.bonusSc ?? '',
              bonusGc: rewardSystemData?.bonusGc ?? '',
              boost: rewardSystemData?.boost,
              rakeback: rewardSystemData?.rakeback,
              gradualLoss: rewardSystemData?.gradualLoss,
              level: rewardSystemData?.level,
              isActive: rewardSystemData?.isActive,
              isLiveSupport: rewardSystemData?.liveSupport,
            }}
            validationSchema={updateRewardSystemSchema}
            enableReinitialize
            onSubmit={handleEditRewardSystemSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              setFieldValue,
              resetForm,
            }) => (
              <RewardSystemCreateForm
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                resetForm={resetForm}
                navigate={navigate}
                loading={loading}
                rewardSystemData={rewardSystemData}
                isSelectLoading={isSelectLoading}
              />
            )}
          </Formik>
        )}
      </Card>
    </div>
  );
};

export default EditRewardSystem;
