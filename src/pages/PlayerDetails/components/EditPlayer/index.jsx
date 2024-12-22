import React, { useState, useEffect } from 'react'
import { Row } from '@themesberg/react-bootstrap'
import { Formik } from 'formik'
// import { createAdminSchema } from '../schemas'
import EditPlayerForm from './EditPlayerForm'
import { userPersonalSchema } from './schema'
import { getCityListQuery, getStateListQuery } from '../../../../reactQuery/hooks/customQueryHook'
import { formatDateMDY } from '../../../../utils/dateFormatter'
import { useCheckLexisNexisMutation, useUpdatePlayerInfo, useUpdateUserStatus } from '../../../../reactQuery/hooks/customMutationHook'
import { genderConst } from './constant'
import RemarksModal from '../Verification/RemarksModal'
import ModalView from '../../../../components/Modal'
import { toast } from '../../../../components/Toast'

const EditPlayer = (props) => {
  const [enabled, setEnabled] = useState(false)
  const [isFirstTime, setIsFirmTime] = useState({state: false, city: false})
  const [isEdit, setIsEdit] = useState(true)
  const [selectedState, setSelectedState] = useState(null)
  const [openModal, setOpenModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null)
  const { userData ,getUserDetails} = props

  const { mutate: updatePlayerInfo, isLoading: isUpdatePlayerInfo } = useUpdatePlayerInfo({
    onSuccess: (data) => {
      setIsEdit(true)
      if (data.data.message) {
        toast(data.data.message, 'success')
      } else {
        toast(data.data.message, 'error')
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errors.length > 0) {
        const {errors} = error.response.data;
        errors.map((error) => {
          if (error?.errorCode === 500) {
            toast('Something Went Wrong', 'error')
          }
          if (error?.description) {
            toast(error?.description, 'error')
          }
        })
      }
    }
  })

  const { mutate: checkLexisNexis, isLoading: loading } =
  useCheckLexisNexisMutation({
      onSuccess: () => {
        toast("LexisNexis Check done successfully", "success");
        closeModal();
      },
    });

  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const formatDate = (date) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const handleVerifyLexisNexis = () =>{
    setOpenModal(true);
  }

  const onSubmit = (dataValue) => {
    const data = {
      userId: userData.userId,
    };
    checkLexisNexis(data);
  };

  const handleCreateSubmit = (formValues) => {
    const data = {
      userId: userData.userId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      middleName: formValues.middleName,
      dateOfBirth: formValues?.dateOfBirth ? formatDate(formValues.dateOfBirth) : '',
      gender:formValues.gender? formValues?.gender?.value : '',
      addressLine_1: formValues.addressLine_1,
      addressLine_2: formValues.addressLine_2,
      city: formValues.city || '',
      state: formValues?.state ? formValues.state.state_id.toString() : '',
      country: '1',
      zipCode: formValues.zipCode,
      email: formValues.email,
      userName: userData.username,
      phoneCode: formValues.countryCode,
      phone: formValues.phone
    }
    updatePlayerInfo(data)
  }
  const {
    data: stateData,
    isLoading: isGetStateLoading,
  } = getStateListQuery({ params: {} })

  // useEffect(() => {
  //   setEnabled(true)
  // }, [])
  const onStateChangeHandler = (value) => {
    setSelectedCity({})
    setSelectedState(value)
  }
  const {
    data: cityData
  } = getCityListQuery({ params: { stateId: selectedState?.value || false }, enabled: !!selectedState?.value || false })

  useEffect(() => {
    const tempIsFirstTime = {...isFirstTime}
    if (stateData?.length > 0 && userData?.state && !isFirstTime.state) {
      const tempState = stateData?.find(item => item.state_id === Number(userData.state))
      if (tempState) {
        tempState.label = tempState.name
        tempState.value = tempState.state_id
        setSelectedState(tempState)
        tempIsFirstTime.state = true
      }
    }
    if (userData?.city && stateData?.length > 0 && userData?.state && cityData?.length > 0 && !isFirstTime.city) {
      const tempCity = cityData?.find(item => item.city_id === Number(userData.city))
      if (tempCity) {
        tempCity.label = tempCity.name
        tempCity.value = tempCity.city_id
        setSelectedCity(tempCity)
        tempIsFirstTime.city = true
      }
    }
    setIsFirmTime(tempIsFirstTime)
  }, [userData && userData?.city, userData?.state, stateData, cityData])
  return (
    <Row className=''>
      <ModalView
        openModal={openModal}
        toggleModal={toggleModal}
        size='lg'
        hideHeader
        center
        className='announcement-view-wrap'
        firstBtnClass='btn-primary'
        secondBtnClass='btn-secondary'
        hideFooter
      >
        <RemarksModal closeModal={closeModal} onSubmit={onSubmit} />
      </ModalView>
      <Formik
        initialValues={{
          firstName: userData?.firstName || '',
          lastName: userData?.lastName || '',
          dateOfBirth: userData?.dateOfBirth ? formatDateMDY(userData?.dateOfBirth) : null,
          gender: (userData?.gender && genderConst.find(item => item.value === userData?.gender)) || null,
          addressLine_1: userData?.addressLine_1 || '',
          addressLine_2: userData?.addressLine_2 || '',
          zipCode: userData?.zipCode || '',
          email: userData?.email || '',
          username: userData?.username || '',
          phone: userData?.phone || '',
          countryCode: '1',
          state: userData?.state ? { value: userData?.state, state_id: userData?.state } : null,
          city: userData?.city || '',
          middleName: userData?.middleName || ''
        }}
        validationSchema={userPersonalSchema}
        onSubmit={(formValues) => handleCreateSubmit(formValues)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          errors,
          resetForm
        }) => (
          <EditPlayerForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            onStateChangeHandler={onStateChangeHandler}
            isGetStateLoading={isGetStateLoading}
            selectedState={selectedState}
            stateData={stateData}
            cityData={cityData}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            errors={errors}
            loading={isUpdatePlayerInfo}
            userData={userData}
            handleVerifyLexisNexis={handleVerifyLexisNexis}
            resetForm={resetForm}
          />
        )}
      </Formik>
    </Row>
  )
}

export default EditPlayer
