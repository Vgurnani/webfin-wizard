import React from 'react'
import PropTypes from 'prop-types'
import closeIcon from '../../../../src/images/close.png'

const ConfirmAlert = (props) => {
    const { onClose, handleAction } = props
    return (
        <div className='confirm-modal'>
            <div className="confirm-modal-header">
                <a className="confirm-modal-close"  onClick={ onClose }>
                    <img src={ closeIcon } />
                </a>
            </div>
            <div className="confirm-modal-body">
                <h2>Are you sure?</h2>
                <p>By confirming this blog & information will be deleted forever.</p>
                {/* <p>You want to delete this?</p> */}
                <div className="confirm-modal-btns">
                    <div className="confirm-btn">
                        <button className="btn btn-primary"
                            onClick={ () => {
                                handleAction()
                                onClose();
                            } }
                        >
                            Confirm
                        </button>
                    </div>
                    <div className="cancel-btn">
                        <button className="btn" onClick={ onClose }>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
ConfirmAlert.propTypes = {
    onClose: PropTypes.func,
    handleAction: PropTypes.func
}
export default ConfirmAlert;