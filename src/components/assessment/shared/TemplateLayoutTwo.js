import React from 'react'
import PropTypes from 'prop-types';
import './style.sass'

const TemplateLayoutTwo = () => {
    return(
        <div className="template2">
            <div className='t-header'></div>
            <div className='t-content'></div>
        </div>
    )
}
TemplateLayoutTwo.propTypes = {
    setOpen: PropTypes.func
};
export default TemplateLayoutTwo;