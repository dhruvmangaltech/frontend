import React from 'react';
import { Row, Col } from '@themesberg/react-bootstrap';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCreateRewardSystemMutation } from '../../../reactQuery/hooks/customMutationHook';
import { AdminRoutes } from '../../../routes';
import { toast } from '../../../components/Toast';
import { useTranslation } from 'react-i18next';

import { createRewardSystemSchema } from '../schemas';
import useCreateRewardSystem from '../hooks/useCreateRewardSystem';
import RewardSystemCreateForm from './RewardSystemCreateForm';
import { serialize } from 'object-to-formdata'


const CreateRewardSystem = () => {
    const {
        isSelectLoading,
    } = useCreateRewardSystem();
    const { t } = useTranslation(['rewardSystem']);
    const navigate = useNavigate();
    const onSuccess = (res) => {
        console.log("create rewards system", res)
        if (res?.data) {
            toast(res?.data?.message, 'success', 'rewardSystemCreate');
            navigate(AdminRoutes.RewardSystem);
        }
    };
    const onError = (error) => {
        toast(error.response.data.errors[0].description, 'error', 'rewardSystemCreate');
    };
    const { mutate: createRewardSystem, isLoading } = useCreateRewardSystemMutation({
        onSuccess,
        onError,
    });

    const handleCreateRewardSystemSubmit = (formValues) => {
        const body = {
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
        createRewardSystem(serialize(body));
    };

    return (
        <div>
            <Row>
                <Col sm={8}>
                    <h3>{t('createRewardSystem.title')}</h3>
                </Col>
            </Row>

            <Formik
                initialValues={{
                    vipTier: '',
                    scRequiredPlay: '',
                    gcRequiredPurchase: '',
                    scRequiredMonth: '',
                    gcRequiredMonth: '',
                    bonusSc: '',
                    bonusGc: '',
                    boost: '',
                    rakeback: '',
                    gradualLoss : '',
                    icon  : '',
                    level  : '',
                    isActive: false,
                    isLiveSupport: false,
                }}
                validationSchema={createRewardSystemSchema}
                onSubmit={handleCreateRewardSystemSubmit}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
                }) => (

                    <RewardSystemCreateForm
                        values={values}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        loading={isLoading}
                        navigate={navigate}
                        isSelectLoading={isSelectLoading}
                    />
                )}
            </Formik>
        </div>
    );
};

export default CreateRewardSystem;
