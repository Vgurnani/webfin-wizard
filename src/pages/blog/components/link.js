import React, { useState } from 'react'
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

export const wrapLink = (editor, url,title ) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [ { text: title } ] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

const insertLink = (editor, url,title, setOpen) => {
    if (editor.selection) {
        wrapLink(editor, url)
        setOpen(false)
    }
}

export const LinkButton = () => {
    const editor = useSlate()
    const [ isOpen , setOpen ] = useState(false)
    const [ linkUrl , setLinkUrl ] = useState(null)
    const [ linkTitle , setLinkTitle ] = useState(null)
    return (
        <>
            <Button
                onClick={ ( ) => setOpen(!isOpen) }
            >
                <LinkEditor />
            </Button>
            {isOpen &&<div className='emoji-mart link-mart'>
                <label>Title</label>
                <input type='text' defaultValue={ linkUrl }  onChange={ (event) => setLinkUrl(event.target.value) } /><br/>
                <label>Url</label>
                <input type='text' defaultValue={ linkTitle }  onChange={ (event) => setLinkTitle(event.target.value) } /><br/>
                <Button onClick={ () => insertLink(editor,linkUrl,linkTitle, setOpen) } >confirm</Button>
            </div>}
        </>)
}

LinkElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}