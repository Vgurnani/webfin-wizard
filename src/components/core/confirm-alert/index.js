import React from 'react'
import PropTypes from 'prop-types'

const ConfirmAlert = (props) => {
    const { onClose, handleAction } = props
    return (
        <div className='custom-ui'>
            <h3>Are you sure?</h3>
            <p>You want to delete this?</p>
            <button className="btn btn-secondry" onClick={ onClose }>No</button>
            <button className="btn btn-secondry btn-danger"
                onClick={ () => {
                    handleAction()
                    onClose();
                } }
            >
                Yes, Delete it!
            </button>
        </div>
    );
}
ConfirmAlert.propTypes = {
    onClose: PropTypes.func,
    handleAction: PropTypes.func
}
export default ConfirmAlert;