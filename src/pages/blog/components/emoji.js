import React, { useCallback, useRef, useState } from 'react'
import { useSelected, useFocused, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types'
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import {
    SmileEditor
} from '../../../utils/svg';
import { Button } from './button';
import useClickOutside from './hooks/useClickOutside';

export const EmojiElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div { ...attributes }>
            <div contentEditable={ false }>
                <img
                    src={ element.url }
                    style={ { boxShadow: `${ selected && focused ? '0 0 0 3px #B4D5FF' : 'none' }` } }
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

export const EmojiButton = () => {
    const [ showPicker, setPickerState ] = useState(false);
    const picker = useRef(null);
    const editor = useSlate();

    const togglePicker = () => {
        setPickerState(!showPicker);
    };

    const dismissPicker = useCallback(() => {
        setPickerState(false);
    }, [ setPickerState ]);

    useClickOutside([ picker ], dismissPicker);

    const insertEmoji = (emoji) => {
        if ('native' in emoji) {
            editor.insertText(` ${ emoji.native } `);
            dismissPicker();
        }
    };

    return (
        <div ref={ picker }>
            {showPicker && (
                <Picker emoji="" title="" native={ true } onSelect={ insertEmoji } />
            )}
            <Button onClick={ togglePicker }>
                <SmileEditor />
            </Button>
        </div>
    )
}

EmojiElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}