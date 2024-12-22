import React, { useEffect } from 'react';
import { Row, Col } from '@themesberg/react-bootstrap';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { createPackageSchema } from '../schemas';
import { useNavigate } from 'react-router-dom';
import PackageCreateForm from './PackageCreateForm';
import usCreatePackage from '../hooks/useCreatePackage';
import { useCreatePackageMutation } from '../../../reactQuery/hooks/customMutationHook';
import { AdminRoutes } from '../../../routes';
import { toast } from '../../../components/Toast';
import { useTranslation } from 'react-i18next';
import { serialize } from 'object-to-formdata';

const CreatePackages = () => {
  const {
    // isGetPackageTypeLoading,
    typeOptions,
    typeValue,
    setTypeValue,
    isSelectLoading,
    handleCreateOption,
  } = usCreatePackage();
  const { t } = useTranslation(['packages']);
  const navigate = useNavigate();
  const onSuccess = (res) => {
    if (res?.data?.createPackage) {
      toast(res?.data?.message, 'success', 'packageCreate');
      navigate(AdminRoutes.Packages);
    }
  };
  const onError = (error) => {
    toast(error.response.data.errors[0].description, 'error', 'packageCreate');
  };
  const { mutate: createPackage, isLoading } = useCreatePackageMutation({
    onSuccess,
    onError,
  });

  const handleCreatePackageSubmit = (formValues) => {
    const packageTypeInfo = typeOptions.find(
      (item) => item.value === formValues.packageType
    );
    const body = {
      ...formValues,
      amount: formValues.amount.toString(),
      isActive: formValues.isActive,
      packageType: formValues?.packageType|| '',
      currency: 'USD',
      isVisibleInStore: formValues.isVisibleInStore,
      // firstPurchaseApplicable: formValues.firstPurchaseApplicable,
      image: formValues.image,
      validTill: formValues.validTill,
      newPackageType: false,
      showPackageType: formValues.showPackageType,
      previousAmount: formValues?.previousAmount === 0 ? null : formValues?.previousAmount,
    };
    if (packageTypeInfo?.newOptions) {
      body.newPackageType = true;
    }
    createPackage(serialize(body));
  };

  return (
    <div>
      <Row>
        <Col sm={8}>
          <h3>{t('createPackage.title')}</h3>
        </Col>
      </Row>

      <Formik
        initialValues={{
          amount: '',
          gcCoin: '',
          scCoin: '',
          isActive: false,
          // hot: false,
          // showPackage: null,
          packageType: '',
          isVisibleInStore: false,
          // firstPurchaseApplicable:false,
          image: '',
          validTill: null,
          showPackageType: true,
          previousAmount: '',
        }}
        validationSchema={createPackageSchema}
        onSubmit={handleCreatePackageSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
          <PackageCreateForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            loading={isLoading}
            navigate={navigate}
            typeOptions={typeOptions}
            typeValue={typeValue}
            setTypeValue={setTypeValue}
            isSelectLoading={isSelectLoading}
            handleCreateOption={handleCreateOption}
          />
        )}
      </Formik>
    </div>
  );
};

export default CreatePackages;
