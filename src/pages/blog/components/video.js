import React, { useState, useRef } from 'react'
import { useSlate, useSelected, useFocused } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types';
import { Button } from './button';
import useOutsideClick from 'components/hoc/OutsideClick'
import { MediaEditor ,CloseIcon } from 'utils/svg';
export const VideoElement = ({ attributes, children, element }) => {
    const { url } = element
    const selected = useSelected()
    const editor = useSlate();
    const focused = useFocused()
    const handleRemove = () =>{
        Transforms.removeNodes(editor, element)
    }
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
                            boxShadow: `${ selected && focused ? '0 0 0 3px #B4D5FF' : 'none' }`
                        } }
                    />
                </div>{selected && focused && <a onClick={ () => handleRemove() } href='javascript:void(0)'><CloseIcon/></a>}
            </div>
            {children}
        </div>
    )
}

export const insertVedio = (editor, url) => {
    if((url?.indexOf('http://') == 0 || url?.indexOf('https://') == 0)){

        const text = { text: '' }
        const video = [ { type: 'video', url, children: [ text ] },{
            type: 'paragraph',
            children: [
                { text: '' },
            ],
        } ]
        Transforms.insertNodes(editor, video)
        //setOpen(false)
    }
}

// export const InsertVideoButton = () => {
//     const inputRef = useRef();
//     const [ isOpen , setOpen ] = useState(false)
//     const handleOpen =() => {
//         setOpen(!isOpen)
//         setTimeout(()=> {
//             inputRef?.current?.focus()
//         },1)

//     }
//     return (
//         <>
//             <Button
//                 onClick={ () => handleOpen() }
//             >
//                 <MediaEditor />
//             </Button>
//             {isOpen &&
//             <InputText inputRef={ inputRef }  setOpen={ setOpen }/>
//             }
//         </>

//     )
// }

export const InsertVideoButton = () => {
    const editor = useSlate()
    return (
        <Button
            onMouseDown={ event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL:')
                if (!url) return
                insertVedio(editor, url)
            } }
        >
            <MediaEditor />
        </Button>
    )
}

const InputText = (props) => {
    const divRef = useRef()
    const { setOpen, inputRef } = props
    const editor = useSlate()
    const [ videoUrl , setVideoUrl ] = useState(null)

    useOutsideClick(divRef, () => {
        setOpen(false)
    });
    return(
        <div ref={ divRef } className='emoji-mart video-mart'>
            <input placeholder="Enter video Link" type='text' ref={ inputRef } defaultValue={ videoUrl }  onChange={ (event) => setVideoUrl(event.target.value) } />
            <Button onClick={ () => insertVedio(editor,videoUrl) } >confirm</Button>
        </div>)
}
VideoElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}
InputText.propTypes = {
    setOpen: PropTypes.func,
    inputRef: PropTypes.any
}