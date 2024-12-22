import React from 'react'
import {
    Button,
    Row,
    Col
} from '@themesberg/react-bootstrap'
import useReorderPackages from '../hooks/useReorderPackages'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../reorderPackages.scss'

const ReorderPackages = () => {
    const {
        t,
        loading,
        state, onDragEnd, handleSave
    } = useReorderPackages()

    return (
        <>
            <Row>
                <Col sm={8}>
                    <h3>{t('reorderPackage.label')}</h3>
                </Col>

                <Col>
                    <div className='text-right mb-3'>
                        <Button
                            variant='success'
                            onClick={() => handleSave()}
                        >
                            {t('save')}
                        </Button>
                    </div>
                </Col>
            </Row>

            <div className='cus-reorder-package'>

                <div className='reorder-heading cus-reorder-heading'>
                    {[
                        t('headers.id'),
                        t('headers.amount'),
                        t('headers.gcCoin'),
                        t('headers.scCoin'),
                        t('headers.status')
                    ].map((h) => (
                        <p key={h} style={{ width: '18%' }}>{h}</p>
                    ))}
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list'>
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {/* <QuoteList quotes={state.quotes} /> */}
                                {state.count > 0 &&
                                    state?.rows?.map(
                                        ({
                                            packageId,
                                            amount,
                                            gcCoin,
                                            scCoin,
                                            isActive
                                        }, idx) => (
                                            <Draggable draggableId={`id-${idx}`} key={idx} index={idx}>
                                                {provided => (
                                                    <div
                                                        className='reorder-content cus-reorder-content'
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <p className='cus-reorder-id'>{packageId}</p>
                                                        <p className='cus-reorder-amt'>{amount}</p>
                                                        <p className='cus-reorder-gccoin'>{gcCoin}</p>
                                                        <p className='cus-reorder-sccoin'>{scCoin}</p>
                                                        <p className='cus-reorder-status'>
                                                            {isActive
                                                                ? (
                                                                    <span className='text-success'>{t('activeStatus')}</span>
                                                                )
                                                                : (
                                                                    <span className='text-danger'>{t('inActiveStatus')}</span>
                                                                )}
                                                        </p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>

            {state.count === 0
                ? <p className='text-danger text-center'>{t('noDataFound')}</p>
                : null}
        </>
    )
}

export default ReorderPackages