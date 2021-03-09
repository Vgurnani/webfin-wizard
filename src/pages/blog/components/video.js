import React, { useState } from 'react'
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

export const insertVedio = (editor, url, setOpen) => {
    if((url?.indexOf('http://') == 0 || url?.indexOf('https://') == 0)){

        const text = { text: '' }
        const image = [ { type: 'video', url, children: [ text ] },{
            type: 'paragraph',
            children: [
                { text: '' },
            ],
        } ]
        Transforms.insertNodes(editor, image)
        setOpen(false)
    }
}

export const InsertVideoButton = () => {
    const editor = useSlate()
    const [ isOpen , setOpen ] = useState(false)
    const [ videoUrl , setVideoUrl ] = useState(null)
    return (
        <>
            <Button
                onClick={ ( ) => setOpen(!isOpen) }
            >
                <MediaEditor />
            </Button>
            {isOpen &&<div className='emoji-mart video-mart'>

                <input type='text' defaultValue={ videoUrl }  onChange={ (event) => setVideoUrl(event.target.value) } />

                <Button onClick={ () => insertVedio(editor,videoUrl, setOpen) } >confirm</Button>
            </div>}
        </>

    )
}

VideoElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}