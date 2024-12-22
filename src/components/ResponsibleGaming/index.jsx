import { faEdit, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card } from '@themesberg/react-bootstrap'
import React from 'react'
import Trigger from '../OverlayTrigger'
import Limit from './Limit'
import './style.scss'
import useResponsibleGaming from './useResponsibleGaming'
import useCheckPermission from '../../utils/checkPermission'
import SelfExclusion from './SelfExclusion'
import { ResetConfirmationModal, RemoveConfirmationModal } from '../ConfirmationModal'
import { limitName, getDateAfterShweepDay } from './constants'

const ResponsibleGaming = ({ userLimits, user = {}, currencyCode, getUserDetails }) => {
  const {
    t,
    limitLabels,
    setLimit,
    setLimitModal,
    limitModal,
    limit,
    updateLimit,
    exclusionModal,
    setExclusionModal,
    setDisableUser,
    resetModal,
    removeLimit,
    setRemoveLimit,
    setResetModal,
    handleYes,
    data,
    setData,
    updateResponsibleGambling,
    updateLoading,
    userId,
    removeModal,
    setRemoveModal,
    handleRemoveLimits
  } = useResponsibleGaming({ userLimits, getUserDetails })

  const { isHidden } = useCheckPermission()
//   const updateLimitForModal = (limit?.label === limitName.take_break || limit?.label === limitName.session_limit) ? setDisableUser : updateLimit
	const updateLimitForModal = (formValues) => {
    // if (limit.label === limitName.session_limit) {
    //   updateResponsibleGambling({
    //     responsibleGamblingType: '1',
    //     sessionReminderTime: formValues.formValues.limit,
    //     userId: Number(userId),
    //     reason: formValues.formValues.reason,
    //     favroite: formValues.formValues.isFavorite
    //   })
    // }
    if (limit.label === limitName.daily_purchase_limit ||
      limit.label === limitName.weekly_purchase_limit ||
      limit.label === limitName.monthly_purchase_limit) {
      updateResponsibleGambling({
        responsibleGamblingType: '2',
        limitType: limit.limitType.toString(),
        userId: Number(userId),
        reason: formValues.formValues.reason,
        favroite: formValues.formValues.isFavorite,
        amount: formValues.formValues.limit
      })
    }
    if (limit.label === limitName.daily_time_limit ||
      limit.label === limitName.weekly_time_limit ||
      limit.label === limitName.monthly_time_limit) {
      updateResponsibleGambling({
        responsibleGamblingType: '1',
        limitType: limit.limitType.toString(),
        userId: Number(userId),
        reason: formValues.formValues.reason,
        favroite: formValues.formValues.isFavorite,
        amount: formValues.formValues.limit
      })
    }
    if (limit.label === limitName.take_break) {
      updateResponsibleGambling({
        responsibleGamblingType: '4',
        userId: Number(userId),
        reason: formValues.formValues.reason,
        favroite: formValues.formValues.isFavorite,
        amount: Number(formValues.formValues.limit),
        timeBreakDuration: getDateAfterShweepDay(formValues.formValues.limit)?.formattedDate  
      })
    }
    if(limit.label === limitName.self_exclusion) {
      updateResponsibleGambling({
        responsibleGamblingType: '5',
        userId: Number(userId),
        reason: formValues.formValues.reason.trim(),
        favroite: formValues.formValues.isFavorite,
        selfExclusion: limit.selfExclusion ? false : true 
      })
    }
}
  return (
    <>
      <Card className='card-overview'>
        <h4 className='h4-overview'>Limits <hr className='h4-hr' /></h4>
        <div className='div-overview limit row w-100 m-auto'>
          {/* <div key={limitName.session_limit}>
            <h6>{t('playerLimit.sessionLimit')}</h6>
            <div>
              <span>{userLimits?.timeLimit || t('playerLimit.notSet')}</span>
              <Trigger message={t('playerLimit.setLimit')} id={t('playerLimit.setLimit') + limitName.session_limit } />
              <Button
                id={t('playerLimit.setLimit') + limitName.session_limit}
                variant='warning'
                size='sm'
                onClick={() => {
                  setLimit({ label: limitName.session_limit, name: 'Time Period', value: userLimits?.timeLimit || '' })
                  setLimitModal(true)
                }}
                hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>

              <Trigger message={t('playerLimit.resetLimit')} id={t('playerLimit.resetLimit') +limitName.session_limit } />
              <Button
                id={t('playerLimit.resetLimit') +limitName.session_limit }
                variant='danger'
                size='sm'
                disabled={!userLimits?.timeLimit}
                onClick={() => {
                  setData(limitName.session_limit)
                  setResetModal(true)
                }}
                hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
              >
                <FontAwesomeIcon icon={faRedo} />
              </Button>
            </div>
          </div> */}
          {limitLabels?.map(({ label, value, minimum, limitType, selfExclusion }) => {
            return (
              <div key={label} className='col-12 col-lg-4'>
              <div className='d-flex justify-content-between w-100' key={label}>
                <h6>{label}</h6>
                <div>
                  <span>{value || t('playerLimit.notSet')}</span>
                  <Trigger message={t('playerLimit.setLimit')} id={label+'_set'} />
                    <Button
                      id={label+'_set'}
                      variant='warning'
                      size='sm'
                      onClick={() => {
                        setLimit({ label, value, minimum, limitType, selfExclusion })
                        setLimitModal(true)
                      }}
                      hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {value && label !== 'Self Exclusion' && <Button
                      id={label+'_remove'}
                      variant='warning'
                      size='sm'
                      onClick={() => {
                        setRemoveLimit({label, value})
                        setRemoveModal(true)
                      }}
                      hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                    >
                       <FontAwesomeIcon icon={faTrash} />
                    </Button>}

                  {/* <Trigger message={t('playerLimit.resetLimit')} id={label+t('playerLimit.resetLimit')} />
                    <Button
                    id={label+t('playerLimit.resetLimit')}
                      variant='danger'
                      size='sm'
                      disabled={!value}
                      onClick={() => {
                        setData(label)
                        setResetModal(true)
                      }}
                      hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                    >
                      <FontAwesomeIcon icon={faRedo} />
                    </Button> */}
                </div>
              </div>
              </div>
            )
          })}

          {/* <div key={limitName.take_break}>
            <h6>Take A Break</h6>
            <div>
              <span>{user?.selfExclusion
                ? `${Math.ceil((Math.abs(new Date(user?.selfExclusion) - new Date())) / (1000 * 60 * 60 * 24))} Days`
                : t('playerLimit.notSet')}
              </span>
              <Trigger message={t('playerLimit.setBreak')} id={limitName.take_break+t('playerLimit.setBreak')} />
                <Button
                id={limitName.take_break+t('playerLimit.setBreak')}
                  variant='warning'
                  size='sm'
                  onClick={() => {
                    setLimit({
                      label: limitName.take_break,
                      name: 'Time Period',
                      value: user?.selfExclusion ? Math.ceil((Math.abs(new Date(user?.selfExclusion) - new Date())) / (1000 * 60 * 60 * 24)) : ''
                    })
                    setLimitModal(true)
                  }}
                  hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>

              {/* <Trigger message={t('playerLimit.resetBreak')} id={limitName.take_break+t('playerLimit.resetBreak')} />
                <Button
                  id={limitName.take_break+t('playerLimit.resetBreak')}
                  variant='danger'
                  size='sm'
                  disabled={!user?.selfExclusion}
                  onClick={() => {
                    setData(limitName.take_break)
                    setResetModal(true)
                  }}
                  hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                >
                  <FontAwesomeIcon icon={faRedo} />
                </Button>
            </div>
          </div> */}

          <div key='Self Exclusion'>
            {/* <h6>{t('playerLimit.selfExclusion')}</h6> */}
            {/* <div> */}
              {/* <span>{userLimits?.isSelfExclusionPermanent
                ? 'Permanent'
                : userLimits?.selfExclusion
                  ? `${Math.ceil((Math.abs(new Date(userLimits?.selfExclusion) - new Date())) / (1000 * 60 * 60 * 24 * 30))} Months`
                  : 'Not Set'}
              </span> */}
              {/* <Trigger message={t('playerLimit.setSelfExclusion')} id={t('playerLimit.setSelfExclusion') +userLimits?.isSelfExclusionPermanent } /> */}
                {/* <Button
                  id={t('playerLimit.setSelfExclusion') +userLimits?.isSelfExclusionPermanent }
                  variant='warning'
                  size='sm'
                  onClick={() => {
                    setLimit({
                      type: 'SELF_EXCLUSION',
                      days: userLimits?.isSelfExclusionPermanent
                        ? -1
                        : userLimits?.selfExclusion ? Math.ceil((Math.abs(new Date(userLimits?.selfExclusion) - new Date())) / (1000 * 60 * 60 * 24 * 30)) : ''
                    })
                    setExclusionModal(true)
                  }}
                  hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button> */}

              {/* <Trigger message={t('playerLimit.resetSelfExclusion')} id={t('playerLimit.resetSelfExclusion') +userLimits?.isSelfExclusionPermanent } />
                <Button
                id={t('playerLimit.resetSelfExclusion') +userLimits?.isSelfExclusionPermanent }
                  variant='danger'
                  size='sm'
                  disabled={!userLimits?.isSelfExclusionPermanent && !userLimits?.selfExclusion}
                  onClick={() => {
                    setData('Self Exclusion')
                    setResetModal(true)
                  }}
                  hidden={isHidden({ module: { key: 'Users', value: 'R' } })}
                >
                  <FontAwesomeIcon icon={faRedo} />
                </Button> */}
            {/* </div> */}
          </div>
        </div>
      </Card>
      {/* {limitModal &&
        <DailyLimit
          t={t}
          show={limitModal}
          setShow={setLimitModal}
          limit={limit}
          updateLimit={updateLimitForModal}
          currencyCode={currencyCode}
        />} */}
      {limitModal &&
        <Limit
          t={t}
          show={limitModal}
          setShow={setLimitModal}
          limit={limit}
          updateLimit={updateLimitForModal}
          currencyCode={currencyCode}
        />}

      {exclusionModal &&
        <SelfExclusion
          t={t}
          show={exclusionModal}
          setShow={setExclusionModal}
          limit={limit}
          updateLimit={setDisableUser}
        />}

      {resetModal &&
        <ResetConfirmationModal
          t={t}
          show={resetModal}
          setShow={setResetModal}
          handleYes={handleYes}
          data={data}
        />}

      {removeModal && 
        <RemoveConfirmationModal
          t={t}
          show={removeModal}
          setShow={setRemoveModal}
          handleYes={handleRemoveLimits}
          removeLimit={removeLimit}
        />}
    </>
  )
}

export default ResponsibleGaming