import React from 'react'
import { useSelected, useFocused, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types'
import { css } from '@emotion/css'
import { Button } from './button';
import {
    ImageUploadEditor
} from '../../../utils/svg';

export const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div { ...attributes }>
            <div contentEditable={ false }>
                <img
                    src={ element.url }
                    className={ css`
              display: block;
              max-width: 100%;
              max-height: 20em;
              box-shadow: ${ selected && focused ? '0 0 0 3px #B4D5FF' : 'none' };
            ` }
                />
            </div>
            {children}
        </div>
    )
}

export const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [ text ] }
    Transforms.insertNodes(editor, image)
}

export const InsertImageButton = () => {
    const editor = useSlate()
    return (
        <Button
            onMouseDown={ event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the image:')
                if (!url) return
                insertImage(editor, url)
            } }
        >
            <ImageUploadEditor />
        </Button>
    )
}

ImageElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}