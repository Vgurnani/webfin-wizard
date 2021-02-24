import React from 'react'
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types';
import { Button } from './button';
import { MediaEditor } from 'utils/svg';

export const VideoElement = ({ attributes, children, element }) => {
    const { url } = element
    return (
        <div { ...attributes }>
            <div contentEditable={ false }>
                <div
                    style={ {
                        padding: '75% 0 0 0',
                        position: 'relative',
                    } }
                >
                    <iframe
                        src={ `${ url }?title=0&byline=0&portrait=0` }
                        frameBorder="0"
                        style={ {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                        } }
                    />
                </div>
            </div>
            {children}
        </div>
    )
}

export const insertVedio = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'video', url, children: [ text ] }
    Transforms.insertNodes(editor, image)
}

export const InsertVideoButton = () => {
    const editor = useSlate()
    return (
        <Button
            onMouseDown={ event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the video:')
                if (!url) return
                insertVedio(editor, url)
            } }
        >
            <MediaEditor />
        </Button>
    )
}

VideoElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}