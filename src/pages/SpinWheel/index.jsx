import React from 'react'
import {
  Button,
  Row,
  Col,
  Table,
} from '@themesberg/react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import Trigger from '../../components/OverlayTrigger'
import useCheckPermission from '../../utils/checkPermission'
import useSpinWheel from './hooks/useSpinWheel'
import { allowedKeysforOrder, priorityConstants, tableHeaders } from './constants'
import CreateSpinWheelSection from './components/CreateSpinWheelSection'


const SpinWheel = () => {
  const {
     t,spinWheeldata,updateSpinWheelConfiguration,editData, handleShowModal,show, handleClose, type,
     
  } = useSpinWheel()
  const { isHidden } = useCheckPermission()
  
  return (
    <>
      <>
        <Row className='mb-3'>
          <Col sm={8}>
            <h3>Spin Wheel Configuration</h3>
          </Col>

        </Row>

        <Table bordered striped responsive hover size='sm' className='text-center mt-3'>
          <thead className='thead-dark'>
            <tr>
              {tableHeaders.map((h, idx) => (
                <th
                  key={idx}
                  onClick={() => allowedKeysforOrder.includes(h.value)}
                  style={{
                    cursor: 'pointer'
                  }}
                  className={'border-3 border border-secondary'}
                >
                  {t(h.label)} &nbsp;
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spinWheeldata &&
              spinWheeldata?.map(
                ({
                  wheelDivisionId,
                  gc,
                  sc,
                  priority,
                  playerLimit,
                  isAllow
                },index) => {
                  return (
                    <tr key={wheelDivisionId}>
                      <td>{wheelDivisionId}</td>
                      <td>{gc}</td>
                      <td>{sc}</td>
                      <td>{priorityConstants[priority]}</td>
                      <td>{playerLimit != null ? playerLimit : "-"}</td>
                      <td>{isAllow === true ? 'True' : 'False'}</td>
                      <td>
                        <>
                          <Trigger message='Edit' id={wheelDivisionId + 'edit'} />

                          <Button
                            id={wheelDivisionId + 'edit'}
                            className='m-1'
                            size='sm'
                            variant='warning'
                            onClick={() =>
                              handleShowModal('Edit', spinWheeldata[index])}
                            hidden={isHidden({ module: { key: 'SpinWheelConfiguration', value: 'U' } })}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </>
                      </td>
                    </tr>
                  )
                }
              )}

            {spinWheeldata?.count === 0 &&
              (
                <tr>
                  <td
                    colSpan={9}
                    className='text-danger text-center'
                  >
                    {t('noDataFound')}
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
      </>
      <CreateSpinWheelSection
        t={t}
        handleClose={handleClose}
        data={editData}
        type={type}
        show={show}
        updateSpinWheelConfiguration={updateSpinWheelConfiguration}
      />
    </>
  )
}

export default SpinWheel