import React from "react";
import {
    Col,
    Row,
    Form as BForm,
    Modal,
    Table,
} from "@themesberg/react-bootstrap";


const RefundDetailsModal = ({ handleClose, showModal, moreDetails }) => {

    const formatValue = (label, value) => {
        if (label === 'Account Number' && value) {
            const maskedValue = '****' + value.slice(-4);
            return maskedValue;
        }
        return value;
    };

    const tableInfo = [
        { label: 'Refund ID', value: moreDetails?.refundId },
        { label: 'Bank Name', value: moreDetails?.bankName },
        { label: 'Account Number', value: moreDetails?.acc },
        { label: 'Package ID', value: moreDetails?.packageId },
        { label: 'Error Description', value: moreDetails?.errorDescription },
        { label: 'Error Explanation', value: moreDetails?.errorExplanation },
        { label: 'Short Amount', value: moreDetails?.shortAmount },
        { label: 'Crypto Address', value: moreDetails?.cryptoAddress },
        { label: 'Crypto Amount', value: (moreDetails?.cryptoAmount && moreDetails?.cryptoAmount > 0) ? moreDetails?.cryptoAmount : 'NA' },
        { label: 'Crypto Currency', value: moreDetails?.cryptoCurrency },
        { label: 'Exchange Rate', value: moreDetails?.exchangeRate },
        { label: 'Refund By', value: moreDetails?.refundBy },
    ]

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title> Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mt-3'>
                    <Col sm={12} className='my-2'>
                        <Table bordered striped responsive hover size='sm' className='text-center mt-4' style={{ marginBottom: '55px' }}>
                            <tbody>
                                {tableInfo.map(({ label, value }, index) => (
                                    (value && value !== 'NA') ?
                                    <tr key={index}>
                                        <td>{label}</td>
                                        <td>{formatValue(label, value)}</td>
                                    </tr> :
                                    <></>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default RefundDetailsModal;
