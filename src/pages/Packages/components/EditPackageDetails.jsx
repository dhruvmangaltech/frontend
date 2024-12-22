import React from 'react';
import { Card, Row, Col } from '@themesberg/react-bootstrap';
import { Formik } from 'formik';
import { updatePackageSchema } from '../schemas';
import PackageCreateForm from './PackageCreateForm';
import useEditPackage from '../hooks/useEditPackage';
import { useNavigate } from 'react-router-dom';
import { formatDateMDY } from '../../../utils/dateFormatter';
import { toast } from '../../../components/Toast';
import { AdminRoutes } from '../../../routes';
import { serialize } from 'object-to-formdata';

const EditPackageDetails = () => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    if (res?.data?.updatedPackage[0]) {
      navigate(AdminRoutes.Packages);
      toast('Package data Updated.', 'success', 'packageUpdate');
    }
  };

  const {
    packageData,
    editPackage,
    packageId,
    loading,
    typeOptions,
    typeValue,
    setTypeValue,
    isSelectLoading,
    handleCreateOption,
  } = useEditPackage(onSuccess);

  const handleEditPackageSubmit = (formValues) => {
    const packageTypeInfo = (typeOptions || ['']).find(
      (item) => item.value === formValues.packageType
    );
    const body = {
      ...formValues,
      amount: formValues.amount.toString(),
      isActive: formValues.isActive,
      packageType: formValues.packageType,
      currency: 'USD',
      isVisibleInStore: formValues.isVisibleInStore,
      firstPurchaseApplicable: formValues.firstPurchaseApplicable,
      validTill: formValues.validTill,
      newPackageType: false,
      showPackageType: formValues.showPackageType,
      previousAmount: formValues?.previousAmount === 0 ? null : formValues?.previousAmount,
    };
    if (formValues.image) {
      body.image = formValues.image;
    }
    if (packageTypeInfo?.newOptions) {
      body.newPackageType = true;
    }
    editPackage(serialize(body));
  };

  return (
    <div>
      <Row>
        <Col sm={8}>
          <h3>Edit Package</h3>
        </Col>
      </Row>

      <Card body>
        {packageData && (
          <Formik
            initialValues={{
              packageId: +packageId,
              amount: packageData?.amount ?? '',
              gcCoin: packageData?.gcCoin ?? '',
              scCoin: packageData?.scCoin ?? '',
              isActive: packageData?.isActive,
              // hot: packageData?.hot ,
              packageType: packageData?.packageType,
              isVisibleInStore: packageData?.isVisibleInStore,
              firstPurchaseApplicable:packageData?.firstPurchaseApplicable,
              validTill: formatDateMDY(packageData.validTill),
              showPackageType: packageData?.showPackageType,
              previousAmount: packageData?.previousAmount,
              // image: packageData?.imageUrl
            }}
            validationSchema={updatePackageSchema}
            enableReinitialize
            onSubmit={handleEditPackageSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              setFieldValue,
              resetForm,
            }) => (
              <PackageCreateForm
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                resetForm={resetForm}
                navigate={navigate}
                loading={loading}
                packageData={packageData}
                isEdit={!!packageData?.PackageUsers?.length}
                typeOptions={typeOptions}
                typeValue={typeValue}
                setTypeValue={setTypeValue}
                isSelectLoading={isSelectLoading}
                handleCreateOption={handleCreateOption}
              />
            )}
          </Formik>
        )}
      </Card>
    </div>
  );
};

export default EditPackageDetails;
