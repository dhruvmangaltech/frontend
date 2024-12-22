import {
  Col,
  Row,
  Button,
  Spinner,
  Form as BForm,
} from '@themesberg/react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { AdminRoutes } from '../../../routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDays, subDays } from 'date-fns';
import { formatDateYMD } from '../../../utils/dateFormatter';
import { createBonusSchema } from '../schema';
import useOutsideClick from '../../../utils/useOutsideClick';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DateRange } from 'react-date-range';
import '../../../components/DateRangePicker/DateRangePicker.scss';
import useCreateBonus from '../hooks/useCreateBonus';
import Datetime from 'react-datetime'
import useBonusListing from '../hooks/useBonusListing';
import Trigger from '../../../components/OverlayTrigger'
import '../bonus.scss'
import { useGetPaymentProviderListingQuery } from '../../../reactQuery/hooks/customQueryHook';

const CreateBonus = ({ bonusData, details }) => {
  const { bonusData: myBonusData } = useBonusListing()
  const [dataBonus, setDataBonus] = useState([])
  const navigate = useNavigate();
  const location = useLocation()

  const bonuses = ['daily bonus']
  const [bonusType, setBonusType] = useState(bonusData?.bonusType ? bonusData?.bonusType : bonuses?.filter(val => !location.state?.includes(val))?.[0])
  const { ref, isVisible, setIsVisible } = useOutsideClick(false);

  const { data } = useGetPaymentProviderListingQuery()

  useEffect(() => {
    const set = new Set()
    myBonusData?.rows?.map((bonus) => { set.add(bonus?.bonusType) })
    setDataBonus(Array.from(set))
  }, [myBonusData])

  const bonusTypeHandler = (setValues, values, e) => {
    setBonusType(e.target.value)
    setValues({
      ...values, bonusTypeDWM:
        [
          { day: 1, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          { day: 2, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          { day: 3, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          { day: 4, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          { day: 5, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          { day: 6, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          { day: 7, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
        ]
    })

  }

  const handleAddClick = (i, index, values, setValues) => {
    const tempValues = [...values.bonusTypeDWM];
    tempValues[i].bonusTypeCoin.splice(index + 1, 0, { type: `${tempValues[i].bonusTypeCoin[0]?.type === 'gc' ? 'sc' : 'gc'}`, amount: 0 });
    setValues({ ...values, bonusTypeDWM: tempValues });
  };

  const handleRemoveClick = (i, index, values, setValues) => {
    const tempValues = [...values.bonusTypeDWM];
    tempValues[i].bonusTypeCoin.splice(index, 1);
    setValues({ ...values, bonusTypeDWM: tempValues });
  };

  const { t, loading, createBonus, updateBonus } = useCreateBonus();
  return (
    <>
      <Row>
        <Col sm={12}>
          <h3>
            {bonusData
              ? details
                ? t('viewTitle')
                : t('editTitle')
              : t('createTitle')}
          </h3>
        </Col>
      </Row>
      <Formik
        initialValues={{
          bonusName: bonusData ? bonusData?.bonusName : '',
          bonusAmountGc: bonusData ? bonusData?.gcAmount : 0,
          bonusAmountSc: bonusData ? bonusData?.scAmount : 0,
          percentage: bonusData ? bonusData?.percentage : 0,
          renewableCycle: bonusData ? (bonusData?.renewableCycle !== null ? bonusData?.renewableCycle : 6) : 6,
          // gcAmount: bonusData ? bonusData?.gcAmount : 0,
          // scAmount: bonusData ? bonusData?.scAmount : 0,
          // fsAmount: bonusData ? bonusData?.freeSpinAmount : 0,
          // numberOfUser: bonusData ? bonusData?.claimedCount : '',
          isActive: bonusData ? bonusData?.isActive : false,
          // isUnique: bonusData ? bonusData?.isUnique : false,
          description: (bonusData?.description) ? eval(JSON.stringify(bonusData?.description)) : '',
          startDate: bonusData ? new Date(bonusData?.validFrom) : new Date(),
          providerId: bonusData ? bonusData?.providerId : '',
          bonusTypeDWM: [
            { day: 1, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
            { day: 2, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
            { day: 3, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
            { day: 4, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
            { day: 5, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
            { day: 6, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
            { day: 7, bonusTypeCoin: [{ type: 'gc', amount: 0 }] },
          ]
        }}
        validationSchema={() => createBonusSchema(t)}
        onSubmit={(formValues) => {
          const values = formValues.bonusTypeDWM.map((item, i) => {
            return {
              bonusName: formValues.bonusName,
              day: item.day,
              startDate: formatDateYMD(formValues.startDate),
              endDate: '',
              description: formValues.description,
              gcAmount:
                item.bonusTypeCoin.filter(i => i.type === 'gc')?.[0]
                  ? item.bonusTypeCoin.filter(i => i.type === 'gc')?.[0]?.amount
                  : 0,
              scAmount: item.bonusTypeCoin.filter(i => i.type === 'sc')?.[0]
                ? item.bonusTypeCoin.filter(i => i.type === 'sc')?.[0]?.amount
                : 0,
              isActive: formValues.isActive,
              // isUnique: formValues.isUnique,
              // numberOfUser: formValues.numberOfUser,
            };
          })

          const createDailyBonusImages = {
            day_1: formValues.thumbnail && formValues.thumbnail[0],
            day_2: formValues.thumbnail && formValues.thumbnail[1],
            day_3: formValues.thumbnail && formValues.thumbnail[2],
            day_4: formValues.thumbnail && formValues.thumbnail[3],
            day_5: formValues.thumbnail && formValues.thumbnail[4],
            day_6: formValues.thumbnail && formValues.thumbnail[5],
            day_7: formValues.thumbnail && formValues.thumbnail[6],
          }

          const welcomeVal = {
            bonusName: formValues.bonusName,
            startDate: formatDateYMD(formValues.startDate),
            endDate: '',
            description: formValues.description,
            gcAmount: formValues.bonusAmountGc,
            scAmount: formValues.bonusAmountSc,
            fsAmount: 0,
            isActive: formValues.isActive,
          }

          const updateValues = {
            bonusId: bonusData?.bonusId,
            bonusType: bonusType,
            // day: bonusData?.day,
            startDate: formatDateYMD(formValues.startDate),
            endDate: '',
            //   bonusName: formValues.bonusName,
            gcAmount: formValues.bonusAmountGc,
            scAmount: formValues.bonusAmountSc,
            percentage: formValues.percentage,
            renewableCycle: formValues.renewableCycle,
            fsAmount: 0,
            // numberOfUser: formValues.numberOfUser,
            description: formValues.description,
            isActive: formValues.isActive,
            providerId: formValues.providerId
            // isUnique: formValues.isUnique
          }
          let updateImage = {}
          if (bonusData?.bonusType === 'daily bonus') {
            updateImage = { ['day_' + bonusData?.day]: formValues.thumbnail }
          }

          if (bonusData?.bonusType != 'welcome bonus') {
            updateValues.day = bonusData?.day
          }
          !bonusData
            ?
            createBonus({
              bonusData: bonusType === 'welcome bonus' ? { bonusType: bonusType, bonuses: [welcomeVal] } : { bonusType: bonusType, bonuses: JSON.stringify(values.flat()), ...createDailyBonusImages },
            })
            : updateBonus({ bonusData: bonusType === 'daily bonus' ? { ...updateValues, ...updateImage } : updateValues });
        }}
      >
        {({
          values,
          setValues,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            {/* // (!bonusData || bonusData?.bonusType != 'welcome bonus') &&  */}
            <Row className='mt-3'>
              {
                <>
                  <Col className='col-12 col-sm-6 col-lg-3'>
                    <BForm.Label style={{ minWidth: '108px' }}>
                      Bonus Type
                      <span className='text-danger'> *</span>
                    </BForm.Label>
                    <BForm.Select
                      type='text'
                      name={'bonusType'}
                      //   style={{ minWidth: '120px' }}
                      disabled={bonusData}
                      value={bonusType}
                      onChange={(e) => bonusTypeHandler(setValues, values, e)}
                      onBlur={handleBlur}
                    >
                      {(bonusData ? true : !dataBonus?.includes(bonusType)) && <option key={bonusType} value={bonusType}>
                      {values.bonusName}
                      </option>}
                      {/* {(bonusData ? true : !dataBonus?.includes('daily bonus')) && <option key={'daily'} value={'daily bonus'}>
                        Daily Bonus
                      </option>} */}
                    </BForm.Select>
                  </Col>
                </>
              }
              <Col className='col-12 col-sm-6 col-lg-3'>
                <BForm.Label>
                  {t('form.bonusName')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Control
                  type='text'
                  name='bonusName'
                  disabled={bonusData}
                  placeholder={t('form.bonusNamePlace')}
                  value={values.bonusName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  component='div'
                  name='bonusName'
                  className='text-danger'
                />
              </Col>
              {/* <Col>
                            <BForm.Label>
                            {t('form.bonusType')}
                            <span className='text-danger'> *</span>
                            </BForm.Label>
                
                            <BForm.Select
                            type='text'
                            name='bonusType'
                            disabled={bonusData}
                            value={values.bonusType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            >
                                <option value={''}>{t('form.bonusTypePlace')}</option>
                                {bonusData && <option key={'daily'} value={'daily bonus'}>Daily Bonus</option>}
                                {bonusData && <option key={'weekly'} value={'welcome bonus'}>Welcome Bonus</option>}
                                <option key={'gc'} value={'gc'}>{t('form.gc')}</option>
                                <option key={'sc'} value={'sc'}>{t('form.sc')}</option>
                                <option key={'both'} value={'both'}>{t('form.both')}</option>
                                <option key={'freespin'} value={'freespin'}>{t('form.freeSpin')}</option>
                            </BForm.Select>
                            <ErrorMessage
                                component='div'
                                name='bonusType'
                                className='text-danger'
                            />
                        </Col> */}
              {/* </Row>
                    <Row className='mt-3'> */}
              {/* {(values.bonusType === 'gc' || values.bonusType === 'both' || values.bonusType === 'daily bonus' || values.bonusType === 'welcome bonus' || values.bonusType === '') && <Col>
                            <BForm.Label>
                            {t('form.gcAmount')}
                            <span className='text-danger'> *</span>
                            </BForm.Label>

                            <BForm.Control
                            type='number'
                            name='gcAmount'
                            min='0'
                            disabled={details}
                            placeholder={t('form.gcAmountPlace')}
                            value={values.gcAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />

                            <ErrorMessage
                            component='div'
                            name='gcAmount'
                            className='text-danger'
                            />
                        </Col>} */}
              {/* {(values.bonusType === 'sc' || values.bonusType === 'daily bonus' || values.bonusType === 'welcome bonus' || values.bonusType === 'both' || values.bonusType === '') && <Col>
                            <BForm.Label>
                            {t('form.scAmount')}
                            <span className='text-danger'> *</span>
                            </BForm.Label>

                            <BForm.Control
                            type='number'
                            name='scAmount'
                            min='0'
                            disabled={details}
                            placeholder={t('form.scAmountPlace')}
                            value={values.scAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />

                            <ErrorMessage
                            component='div'
                            name='scAmount'
                            className='text-danger'
                            />
                        </Col>} */}
              {/* {(values.bonusType === 'freespin' || values.bonusType === '') && <Col>
                            <BForm.Label>
                            {t('form.fsAmount')}
                            <span className='text-danger'> *</span>
                            </BForm.Label>

                            <BForm.Control
                            type='number'
                            name='fsAmount'
                            min='0'
                            disabled={details}
                            placeholder={t('form.fsAmountPlace')}
                            value={values.fsAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />

                            <ErrorMessage
                            component='div'
                            name='fsAmount'
                            className='text-danger'
                            />
                        </Col>} */}
              {/*<Col>
                 <BForm.Label>
                  {t('form.numberOfUser')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Control
                  type='number'
                  name='numberOfUser'
                  min='0'
                  disabled={details}
                  placeholder={t('form.numberOfUserPlace')}
                  value={values.numberOfUser}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  component='div'
                  name='numberOfUser'
                  className='text-danger'
                /> 
              </Col>*/}

              <Col className='col-12 col-sm-6 col-lg-3'>
                <BForm.Label>
                  {t('form.dateRange')} <span className='text-danger'>*</span>
                </BForm.Label>
                <Datetime
                  inputProps={
                    {
                      placeholder: t('form.dateRangePlace'),
                      disabled: details
                    }
                  }
                  dateFormat='YYYY-MM-DD'
                  onChange={(e) => {
                    setFieldValue('startDate', formatDateYMD(e._d))
                  }}
                  value={values.startDate}
                  isValidDate={(e) => {
                    return e._d > new Date() || formatDateYMD(e._d) === formatDateYMD(new Date())
                  }}
                  timeFormat={false}
                />
                <ErrorMessage
                  component='div'
                  name='startDate'
                  className='text-danger'
                />
              </Col>
              {/* <Col>
                <BForm.Label>
                  {t('form.dateRange')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <div className='custom-container date d-flex align-items-center'>
                  <span
                    className='mt-2 d-flex '
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {formatDateYMD(state?.[0].startDate)} -{' '}
                    {formatDateYMD(state?.[0].endDate)}&nbsp; PERIOD &nbsp;{' '}
                    <FontAwesomeIcon icon={faCalendarAlt} className='mt-1' />{' '}
                    &nbsp;
                  </span>

                  {isVisible && !details && (
                    <div
                      ref={ref}
                      style={{
                        zIndex: '9999',
                        position: 'absolute',
                        top: '40px',
                        right: '0px',
                      }}
                    >
                      <DateRange
                        minDate={new Date()}
                        editableDateInputs
                        onChange={(item) => {
                          setFieldValue(
                            'startDate',
                            formatDateYMD(item.selection.startDate)
                          );
                          setFieldValue(
                            'endDate',
                            formatDateYMD(item.selection.endDate)
                          );
                          setState([item.selection]);
                        }}
                        readOnly
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    </div>
                  )}
                </div>
              </Col> */}
              <Col>
                <BForm.Label>
                  {t('form.active')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Check
                  type='switch'
                  name='isActive'
                  checked={values.isActive}
                  disabled={details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Col>
              {/* <Col md={3} sm={6}> */}
              {/* <BForm.Label>
                      {t('form.unique')}
                      <span className='text-danger'> *</span>
                    </BForm.Label>

                    <BForm.Check
                      type='switch'
                      name='isUnique'
                      disabled={details}
                      checked={values.isUnique}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    /> */}
              {/* </Col> */}
            </Row>
            <Row className='mt-3'>
              <Col>
                <BForm.Label>
                  {t('form.description')}
                  <span className='text-danger'> *</span>
                </BForm.Label>

                <BForm.Control
                  type='text'
                  as='textarea'
                  rows='3'
                  name='description'
                  disabled={details}
                  placeholder={t('form.descriptionPlace')}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  component='div'
                  name='description'
                  className='text-danger'
                />
              </Col>
            </Row>
            {(bonusData || bonusType === 'welcome bonus') && <Row className='mt-3'>

              <div className='flex-basis-50 mb-3'>
                {/* {bonusData && <BForm.Label>Day {bonusData.day}
                </BForm.Label>} */}
                <div>
                  {bonusType === 'daily bonus' && <div className='d-flex align-items-center'>
                    <BForm.Label style={{ minWidth: '108px' }}>
                      Image
                      <span className='text-danger'> *</span>
                    </BForm.Label>
                    <BForm.Text>
                      <Trigger message={t('message.thumbnail')} id={'thumbnail'} />
                      <input
                        id={'thumbnail'}
                        title=' '
                        name={'thumbnail'}
                        disabled={details}
                        type='file'
                        onChange={(event) => {
                          setFieldValue(
                            'thumbnail',
                            event.currentTarget.files[0]
                          )
                        }}
                      />
                      {values?.thumbnail && (
                        <img
                          alt='not found'
                          width='60px'
                          src={URL.createObjectURL(values.thumbnail)}
                        />
                      )}
                      {!values?.thumbnail && bonusData?.imageUrl && (
                        <img
                          alt='not found'
                          width='60px'
                          src={bonusData?.imageUrl[0][`day_${bonusData?.day}`]}

                        />
                      )}
                      <ErrorMessage
                        component='div'
                        name='thumbnail'
                        className='text-danger'
                      />
                    </BForm.Text>


                    {/* <BForm.Control
                          type='text'
                          placeholder='Enter Image URL'
                          name={'bonusTypeDWM[${i}].imgUrl'}
                          value={type.imgUrl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        /> */}
                  </div>}
                  {/* {type.bonusTypeCoin?.map((coinType, index) => {
                          return (
                            <> */}
                   {(bonusType === 'daily bonus' || bonusType === 'welcome bonus' || bonusType === 'referral-bonus' || bonusType === 'default-bonus') && <Row className='mt-2'>
                    <Col className='col-12 col-sm-6'>
                      <BForm.Label>
                        Bonus Type
                        {/* <span className='text-danger'> *</span> */}
                      </BForm.Label>
                      <BForm.Select
                        type='text'
                        disabled
                        name={'bonusTypeGc'}
                        // value={values.bonusTypeGc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option key={'gc'} value={'gc'}>
                          GC
                        </option>
                        {/* <option key={'sc'} value={'sc'}>
                                      SC
                                    </option>
                                    <option key={'both'} value={'freeSpin'}>
                                      Free Spin
                                    </option> */}
                      </BForm.Select>
                    </Col>
                    <Col className='col-12 col-sm-6'>
                      <BForm.Label>
                        Amount
                        {/* <span className='text-danger'> *</span> */}
                      </BForm.Label>
                      <BForm.Control
                        type='number'
                        placeholder='Amount'
                        name={'bonusAmountGc'}
                        disabled={details}
                        value={values.bonusAmountGc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>}
                  {(bonusType === 'daily bonus' || bonusType === 'welcome bonus' || bonusType === 'referral-bonus' || bonusType === 'default-bonus') && <Row className='mt-2'>
                    <Col className='col-12 col-sm-6'>
                      <BForm.Label >
                        Bonus Type
                        {/* <span className='text-danger'> *</span> */}
                      </BForm.Label>
                      <BForm.Select
                        type='text'
                        disabled
                        name={'bonusTypeSc'}
                        // value={values.bonusTypeGc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option key={'gc'} value={'gc'}>
                          SC
                        </option>
                        {/* <option key={'sc'} value={'sc'}>
                                      SC
                                    </option>
                                    <option key={'both'} value={'freeSpin'}>
                                      Free Spin
                                    </option> */}
                      </BForm.Select>
                    </Col>
                    <Col className='col-12 col-sm-6'>
                      <BForm.Label>
                        Amount
                        {/* <span className='text-danger'> *</span> */}
                      </BForm.Label>
                      <BForm.Control
                        type='number'
                        placeholder='Amount'
                        disabled={details}
                        name={'bonusAmountSc'}
                        value={values.bonusAmountSc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>}
                  {(bonusType === 'default-bonus') && <Row className='mt-2'>
                    <Col className='col-12 col-sm-6'>
                      <BForm.Label >
                        Renewable Cycle
                        <span className='text-danger'> *</span>
                      </BForm.Label>
                      <BForm.Select
                        type='number'
                        name={'renewableCycle'}
                        placeholder='Renewable Cycle'
                        value={values.renewableCycle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option key={'6'} value={6}>
                          6 hours
                        </option>
                        <option key={'12'} value={12}>
                          12 hours
                        </option>
                        <option key={'24'} value={24}>
                          24 hours
                        </option>
                      </BForm.Select>
                    </Col>
                  </Row>}
                  {(bonusType === 'first-purchase-bonus' || bonusType === 'psp-bonus') && <Row className='mt-2'>
                    <Col className='col-12 col-sm-6'>
                      <BForm.Label>
                        Percentage
                      </BForm.Label>
                      <BForm.Control
                        type='number'
                        placeholder='Percentage'
                        disabled={details}
                        name={'percentage'}
                        value={values.percentage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                        <BForm.Label>
                        {t('form.paymentProvider')}
                        <span className='text-danger'> *</span>
                        </BForm.Label>
                
                        <BForm.Select
                          type='text'
                          name='providerId'
                          value={values.providerId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          >
                          <option value={''}>{t('form.providerName')}</option>
                          {data?.map((c) => (
                          <option
                            key={c?.providerId}
                            value={c?.providerId}
                          >
                          {c?.providerName}
                          </option>
                          ))}
                        </BForm.Select>

                        <ErrorMessage
                          component='div'
                          name='bonusType'
                          className='text-danger'
                        />
                        </Col>
                  </Row>}
                </div>
              </div>
            </Row>}
            {!bonusData && bonusType !== 'welcome bonus' && <Row className='mt-3'>
              <>
                {values.bonusTypeDWM?.map((type, i) => {
                  return (
                    <div className='mb-3 col-12 col-lg-6' key={i}>
                      <div className='create-bonus-days p-3'>
                      <BForm.Label>Day {type.day}</BForm.Label>
                      {bonusType === 'daily bonus' &&
                        <div className='d-flex align-items-center flex-wrap'>
                          <BForm.Label style={{ minWidth: '108px' }}>
                            Image
                            <span className='text-danger'> *</span>
                          </BForm.Label>
                          <BForm.Text>
                            <Trigger message={t('message.thumbnail')} id={`thumbnail[${i}]`} />
                            <input
                              id={`thumbnail[${i}]`}
                              title=' '
                              disabled={details}
                              name={`thumbnail[${i}]`}
                              type='file'
                              onChange={(event) => {
                                setFieldValue(
                                  `thumbnail[${i}]`,
                                  event.currentTarget.files[0]
                                )
                              }}
                            />
                            {values?.thumbnail && values?.thumbnail[i] && (
                              <img
                                alt='not found'
                                width='60px'
                                src={URL.createObjectURL(values.thumbnail[i])}
                              />
                            )}
                            <ErrorMessage
                              component='div'
                              name={`thumbnail[${i}]`}
                              className='text-danger'
                            />
                          </BForm.Text>

                          {/* <ErrorMessage
                          component='div'
                          name={`thumbnail[${i}]`}
                          className='text-danger'
                        /> */}
                          {/* <BForm.Control
                          type='text'
                          placeholder='Enter Image URL'
                          name={'bonusTypeDWM[${i}].imgUrl'}
                          value={type.imgUrl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        /> */}
                        </div>}
                      <div>
                        {type.bonusTypeCoin?.map((coinType, index) => {
                          return (
                            <>
                              <Row className='mt-2'>
                                <Col className='col-12 col-md-6'>
                                  <BForm.Label style={{ minWidth: '108px' }}>
                                    Bonus Type
                                    {/* <span className='text-danger'> *</span> */}
                                  </BForm.Label>
                                  <BForm.Select
                                    type='text'
                                    name={`bonusTypeDWM[${i}].bonusTypeCoin[${index}].type`}
                                    style={{ minWidth: '120px' }}
                                    value={coinType.type}
                                    onChange={handleChange}
                                    disabled={type.bonusTypeCoin.length > 1}
                                    onBlur={handleBlur}
                                  >

                                    {/* {(type.bonusTypeCoin.length === 1 ||) &&  */}
                                    <option key={'gc'} value={'gc'}>
                                      GC
                                    </option>
                                    <option key={'sc'} value={'sc'}>
                                      SC
                                    </option>
                                  </BForm.Select>
                                </Col>
                                <Col className=''>
                                  <BForm.Label style={{ minWidth: '80px' }}>
                                    Amount
                                    {/* <span className='text-danger'> *</span> */}
                                  </BForm.Label>
                                  <BForm.Control
                                    type='number'
                                    placeholder='Amount'
                                    name={`bonusTypeDWM[${i}].bonusTypeCoin[${index}].amount`}
                                    value={coinType.amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Col>
                              </Row>
                              <Row className='mt-2'>
                                <Col>
                                  {type.bonusTypeCoin.length !== 1 && (
                                    <Button
                                      variant='danger'
                                      className='btn-sm me-2'
                                      onClick={() =>
                                        handleRemoveClick(
                                          i,
                                          index,
                                          values,
                                          setValues
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  )}
                                  {type.bonusTypeCoin.length - 1 === index && type.bonusTypeCoin.length < 2 && (
                                    <Button
                                      variant='success'
                                      className='btn-sm'
                                      onClick={() =>
                                        handleAddClick(
                                          i,
                                          index,
                                          values,
                                          setValues
                                        )
                                      }
                                    >
                                      Add
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            </>
                          );
                        })}
                      </div>
                      </div>
                    </div>
                  );
                })}
              </>
              {/* <Col></Col> */}
            </Row>}
            <div className='mt-4 d-flex justify-content-between align-items-center'>
              <Button
                variant='warning'
                onClick={() => navigate(AdminRoutes.BonusListing)}
              >
                {t('form.cancel')}
              </Button>

              <Button
                variant='success'
                hidden={details}
                onClick={() => {
                  handleSubmit();
                }}
                className='ml-2'
              >
                {t('form.submit')}
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
        )}
      </Formik >
    </>
  );
};

export default CreateBonus;
