import React from 'react'
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

export const wrapLink = (editor, url) => {
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

const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

export const LinkButton = () => {
    const editor = useSlate()
    return (
        <Button
            active={ isLinkActive(editor) }
            onMouseDown={ event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                insertLink(editor, url)
            } }
        >
            <LinkEditor />
        </Button>
    )
}

LinkElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}