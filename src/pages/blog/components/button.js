import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef((
    {
        //className,
        active,
        //reversed,
        ...props
    },
    ref
) => (
    <span
        { ...props }
        ref={ ref }
        className={ active ? 'button-active': '' }
    />
)
)

Button.propTypes = {
    className: PropTypes.string,
    active: PropTypes.any,
    reversed: PropTypes.any
}