/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import imageExtensions from 'image-extensions';
import {
    Editor,
    Transforms,
    createEditor,
    Element as SlateElement,
} from 'slate';
import isUrl from 'is-url';
import { withHistory } from 'slate-history';
import { Icon, Toolbar } from './components';
import { Button } from './components/button';
import { ImageElement, InsertImageButton, insertImage } from './components/image';
import {
    Form
} from 'react-bootstrap';

import {
    FontSizeEditor,
    FontFamilyEditor,
    BoldEditor,
    ItalicEditor,
    UnderlineEditor,
    StrikeThroghEditor,
    HighlightEditor,
    ListNumberedEditor,
    ListBulletedEditor,
    LinkEditor,
    QuoteEditor,
    ImageUploadEditor,
    TableEditor,
    MediaEditor,
    UndoEditor,
    RedoEditor,
} from '../../utils/svg';
import { InsertVideoButton, VideoElement } from './components/video';
import { LinkButton, LinkElement, wrapLink } from './components/link';
import { EmojiButton } from './components/emoji';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = [ 'numbered-list', 'bulleted-list' ]

const RichTextEditor = (props) => {
    const [ value, setValue ] = useState(props.initialValue)
    const renderElement = useCallback(props => <Element { ...props } />, [])
    const renderLeaf = useCallback(props => <Leaf { ...props } />, [])
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])

    useEffect(() => {
        props.setRTEData(value);
    }, [ value ])

    return (
        <Slate editor={ editor } value={ value } onChange={ value => setValue(value) } className="custom-rte-editor">
            <Toolbar className="custom-rte-toolbar">
                <div className="toolbar-wrapper">
                    <div className="toolbar-box">
                        <Form.Control as="select" onChange={ event => handleHeading(event, editor) } custom>
                            <option>Paragraph</option>
                            <option format="heading-one">1</option>
                            <option format="heading-two">2</option>
                            <option format="heading-three">3</option>
                            <option format="heading-four">4</option>
                        </Form.Control>
                    </div>
                    {/* <div className="toolbar-box">
                        <MarkButton format="font-size" icon="FontSizeEditor"/>
                        <MarkButton format="font-family" icon="FontFamilyEditor"/>
                    </div> */}
                    <div className="toolbar-box">
                        <MarkButton format="bold" icon="BoldEditor"/>
                        <MarkButton format="italic" icon="ItalicEditor"/>
                        <MarkButton format="underline" icon="UnderlineEditor"/>
                        {/* <MarkButton format="strike" icon="StrikeThroghEditor"/>
                        <MarkButton format="highlight" icon="HighlightEditor"/> */}
                    </div>
                    <div className="toolbar-box">
                        <BlockButton format="numbered-list" icon="ListNumberedEditor"/>
                        <BlockButton format="bulleted-list" icon="ListBulletedEditor"/>
                    </div>
                    <div className="toolbar-box">
                        <MarkButton format="link" icon="LinkEditor"/>
                        <BlockButton format="block-quote" icon="QuoteEditor"/>
                        <MarkButton format="image" icon="ImageUploadEditor"/>
                        <MarkButton format="emoji" icon="TableEditor"/>
                        <MarkButton format="video" icon="MediaEditor"/>
                    </div>
                    {/* <div className="toolbar-box">
                        <MarkButton format="undo" icon="UndoEditor"/>
                        <MarkButton format="redo" icon="RedoEditor"/>
                    </div> */}

                    {/* <div className="toolbar-box">

                    </div> */}
                </div>
            </Toolbar>
            <div className="rte-editor-content">
                <div className="editor-content">
                    <Editable
                        renderElement={ renderElement }
                        renderLeaf={ renderLeaf }
                        placeholder="Enter some rich text…"
                        readOnly={ props.readOnly }
                        spellCheck
                        autoFocus
                        onKeyDown={ event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[ hotkey ]
                                    toggleMark(editor, mark)
                                }
                            }
                        } }
                    />
                </div>
            </div>

        </Slate>
    )
}

const withImages = editor => {
    const { insertData, insertText, isVoid, isInline } = editor

    editor.isVoid = element => {
        return [ 'image', 'video' ].includes(element.type) ? true : isVoid(element)
    }

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element)
    }

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [ mime ] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}

const getIcon = (iconType) => {
    switch (iconType) {
    case 'FontSizeEditor':
        return <FontSizeEditor />
    case 'FontFamilyEditor':
        return <FontFamilyEditor />
    case 'BoldEditor':
        return <BoldEditor />
    case 'ItalicEditor':
        return <ItalicEditor />
    case 'UnderlineEditor':
        return <UnderlineEditor />
    case 'StrikeThroghEditor':
        return <StrikeThroghEditor />
    case 'HighlightEditor':
        return <HighlightEditor />
    case 'ListNumberedEditor':
        return <ListNumberedEditor />
    case 'ListBulletedEditor':
        return <ListBulletedEditor />
    case 'LinkEditor':
        return <LinkButton />
    case 'QuoteEditor':
        return <QuoteEditor />
    case 'ImageUploadEditor':
        return <InsertImageButton />
    case 'TableEditor':
        return <EmojiButton />
    case 'MediaEditor':
        return <InsertVideoButton />
    case 'UndoEditor':
        return <UndoEditor />
    case 'RedoEditor':
        return <RedoEditor />
    default:
        return <BoldEditor />
    }
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const [ match ] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[ format ] === true : false
}

const Element = (props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
    case 'block-quote':
        return <blockquote { ...attributes }>{children}</blockquote>
    case 'bulleted-list':
        return <ul { ...attributes }>{children}</ul>
    case 'heading-one':
        return <h1 { ...attributes }>{children}</h1>
    case 'heading-two':
        return <h2 { ...attributes }>{children}</h2>
    case 'heading-three':
        return <h3 { ...attributes }>{children}</h3>
    case 'heading-four':
        return <h4 { ...attributes }>{children}</h4>
    case 'list-item':
        return <li { ...attributes }>{children}</li>
    case 'numbered-list':
        return <ol { ...attributes }>{children}</ol>
    case 'image':
        return <ImageElement { ...props } />
    case 'video':
        return <VideoElement { ...props } />
    case 'link':
        return <LinkElement { ...props } />
    default:
        return <p { ...attributes }>{children}</p>
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span { ...attributes }>{children}</span>
}

const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    const iconSvg = getIcon(icon)
    return (
        <Button
            className="editor-icons"
            active={ isBlockActive(editor, format) }
            onMouseDown={ event => {
                event.preventDefault()
                toggleBlock(editor, format)
            } }
        >
            <Icon>{iconSvg}</Icon>
        </Button>
    )
}

const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    const iconSvg = getIcon(icon)
    return (
        <Button
            className="editor-icons"
            active={ isMarkActive(editor, format) }
            onMouseDown={ event => {
                event.preventDefault()
                toggleMark(editor, format)
            } }
        >
            <Icon>{iconSvg}</Icon>
        </Button>
    )
}

const handleHeading = (event, editor) => {
    event.preventDefault()
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[ index ];
    const format =  optionElement.getAttribute('format');
    toggleBlock(editor, format)
}

RichTextEditor.prototype = {
}
export default RichTextEditor;