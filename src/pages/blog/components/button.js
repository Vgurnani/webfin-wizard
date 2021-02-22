import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@emotion/css';

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef((
    {
        className,
        active,
        reversed,
        ...props
    },
    ref
) => (
    <span
        { ...props }
        ref={ ref }
        className={ cx(
            className,
            css`
          cursor: pointer;
          color: ${ reversed
        ? active
            ? 'white'
            : '#aaa'
        : active
            ? 'black'
            : '#ccc' };
        `
        ) }
    />
)
)

Button.propTypes = {
    className: PropTypes.string,
    active: PropTypes.any,
    reversed: PropTypes.any
}