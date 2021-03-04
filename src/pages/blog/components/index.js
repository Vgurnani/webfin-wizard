/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/display-name */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export const EditorValue = React.forwardRef(
    (
        {
            //className,
            value,
            ...props
        },
        ref
    ) => {
        const textLines = value.document.nodes
            .map(node => node.text)
            .toArray()
            .join('\n')
        return (
            <div
                ref={ ref }
                { ...props }
            >
                <div
                >
                    {textLines}
                </div>
            </div>
        )
    }
)

export const Icon = React.forwardRef(
    (
        { //className,
            ...props },
        ref
    ) => (
        <span
            { ...props }
            ref={ ref }
        />
    )
)

export const Instruction = React.forwardRef(
    (
        { //className,
            ...props },
        ref
    ) => (
        <div
            { ...props }
            ref={ ref }
        />
    )
)

export const Menu = React.forwardRef(
    (
        { //className,
            ...props },
        ref
    ) => (
        <div
            { ...props }
            ref={ ref }
        />
    )
)

export const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

export const Toolbar = React.forwardRef(
    (
        { //className,
            ...props },
        ref
    ) => (
        <Menu
            { ...props }
            ref={ ref }
        />
    )
)

Toolbar.propTypes = {
    className: PropTypes.string
}
Menu.propTypes = {
    className: PropTypes.string
}
Icon.propTypes = {
    className: PropTypes.string
}
Instruction.propTypes = {
    className: PropTypes.string
}
EditorValue.propTypes = {
    className: PropTypes.string,
    value: PropTypes.any
}