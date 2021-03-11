import React, { useState , useRef } from 'react'
import { useSlate } from 'slate-react';
import {
    Transforms,
    Editor,
    Range,
    Element as SlateElement,
} from 'slate';
import PropTypes from 'prop-types';
import { Button } from './button';
import { LinkEditor } from 'utils/svg';
import useOutsideClick from 'components/hoc/OutsideClick'

export const LinkElement = ({ attributes, children, element }) => {
    return (
        <a { ...attributes } href={ element.url } target='_blank' rel='noreferrer'>
            {children}
        </a>
    )
}

const isLinkActive = editor => {
    const [ link ] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}

const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}

export const wrapLink = (editor, url ) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [ { text: url } ] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

const insertLink = (editor, url, setOpen) => {
    if (editor.selection) {
        wrapLink(editor, url)
        setOpen(false)
    }
}

export const LinkButton = () => {
    const inputRef = useRef();
    const [ isOpen , setOpen ] = useState(false)
    const handleOpen = () => {
        setOpen(!isOpen)
        setTimeout(()=> {
            inputRef?.current?.focus()
        },1)

    }
    return (
        <>
            <Button
                onClick={ handleOpen }
            >
                <LinkEditor />
            </Button>
            {isOpen && <InputText inputRef={ inputRef } setOpen={ setOpen }  />}
        </>)
}

const InputText = (props) => {
    const divRef = useRef()
    const { setOpen, inputRef } = props
    const editor = useSlate()
    const [ linkUrl , setLinkUrl ] = useState(null)

    useOutsideClick(divRef, () => {
        setOpen(false)
    });
    return(
        <div ref={ divRef } className='emoji-mart video-mart'>
            <input placeholder="Enter Link" ref={ inputRef } type='text' defaultValue={ linkUrl }  onChange={ (event) => setLinkUrl(event.target.value) } />
            <Button onClick={ () => insertLink(editor,linkUrl, setOpen) } >confirm</Button>
        </div>)
}
LinkElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}
InputText.propTypes = {
    setOpen: PropTypes.func,
    inputRef: PropTypes.any
}