import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ModalBox = (props)=> {
    const { open, handleClose } = props;

    return (
        <Modal show={ open } onHide={ handleClose }>
            {props.children}
        </Modal>
    )
}

ModalBox.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    children: PropTypes.any,
}

export default ModalBox;