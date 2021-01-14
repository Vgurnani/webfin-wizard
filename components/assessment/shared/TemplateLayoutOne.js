import React from 'react'
import PropTypes from 'prop-types';
import './style.sass'
const TemplateLayoutOne = (props) => {
    return(
            <div className="template1">
                <div className='t-header'></div>
                <div className='t-content'></div>
            </div>
        
    )
}
TemplateLayoutOne.propTypes = {
    setOpen: PropTypes.func
};
export default TemplateLayoutOne;