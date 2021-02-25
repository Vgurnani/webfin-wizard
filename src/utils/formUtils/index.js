/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import React from 'react';
import { Form } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import Dropzone from 'react-dropzone'
import ColorImage from 'images/color.png'
export const Validations = (props) => {
    const {
        touched,
        error,
        validationError,
        warning,
        withoutTouch
    } = props.props;

    return (
        <>
            <p>
                {touched && ((error && <span className="field_error">{error}</span>) || (warning && <span>{warning}</span>))}
            </p>
            {withoutTouch && <p>
                {((error && <span className="field_error">{error}</span>) || (warning && <span>{warning}</span>))}
            </p>}
            {validationError && (
                <p>
                    {(validationError && <span className="field_error">{validationError}</span>)}
                </p>
            )}
        </>
    );
};

const renderFieldWG = (props) => {
    const {
        input,
        label,
        name,
        type,
        placeholder,
        disabled,
        validationError,
        meta: { asyncValidating, touched, error, warning },
        maxLength,
        handleKeyUp,
        rows,
        withoutTouch,
        defaultWarning
    } = props;

    const changeValue = (event) =>{
        handleKeyUp && handleKeyUp(event.currentTarget.value)
        //input.onChange(event.currentTarget.value)
    }

    return (
        <Form.Group className={ asyncValidating ? 'async-validating' : '' } controlId={ name }>
            { label &&  <Form.Label>{label || ''}</Form.Label> }
            <Form.Control rows={ rows } { ...input } onBlur={ changeValue }  maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'validation-error' : '' } placeholder={ placeholder || '' } />
            {defaultWarning && !input.value && <span className="default-warning"><i className="fas fa-exclamation-triangle"></i> {defaultWarning}</span>}
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                    withoutTouch
                } }
            />
        </Form.Group>
    );
};

const renderFieldChangeWG = (props) => {
    const {
        input,
        label,
        name,
        type,
        placeholder,
        handleChange,
        disabled,
        validationError,
        meta: { touched, error, warning },
        maxLength,
        rows,
        defaultWarning
    } = props;

    const changeValue = (event) =>{
        input.onChange(event.target?.value?.replace(/[^a-zA-Z0-9 ]/gi, ''))
        handleChange && handleChange(event.target?.value?.replace(/[^a-zA-Z0-9 ]/gi, ''))
    }

    return (
        <Form.Group controlId={ name }>
            { label &&  <Form.Label>{label || ''}</Form.Label> }
            <Form.Control rows={ rows } { ...input } onChange={ changeValue }  maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'validation-error' : '' } placeholder={ placeholder || '' } />
            {defaultWarning && !input.value && <span className="default-warning"><i className="fas fa-exclamation-triangle"></i> {defaultWarning}</span>}
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            />
        </Form.Group>
    );
};

const renderField = (props) => {
    const {
        input,
        type,
        placeholder,
        disabled,
        validationError,
        meta: { touched, error, warning },
        maxLength,
        rows,
        defaultWarning
    } = props;

    return (
        <>
            <Form.Control rows={ rows } { ...input }  maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'form-control validation-error' : 'form-control' } placeholder={ placeholder || '' } />
            {defaultWarning && !input.value && <span className="default-warning"><i className="fas fa-exclamation-triangle"></i> {defaultWarning}</span>}
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            />
        </>
    );
};

const renderOTPField = (props) => {
    const {
        input,
        validationError,
        meta: { touched, error, warning },
        formClass,
        numInputs,
        defaultValue
    } = props;
    const handleData = (value) => {
        input.onChange(value)
    }
    return (
        <div className={ formClass + ' form-group force-mb-10' } style={ { width: '100%' } }>
            <OtpInput
                value={ defaultValue || input.value }
                onChange={ handleData }
                numInputs={ numInputs }
                separator={ <span></span> }
            />
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            />
        </div>
    );
};

const renderStyleMultipleRadio = (props) => {
    const {
        input,
        validationError,
        options,
        className,
        defaultValue,
        isIcons,
        handleChange,
        isColors,
        fontStyled,
        meta: { touched, error, warning },
    } = props;
    return (
        <Form.Group>
            { options.map((item,index) => {
                item[ 'imageUrl' ] = item.icon?.match('http') ? item.icon : item.imageUrl
                return(
                    <div key={ index } className={ `  ${ className || 'styled-radio' }` }>

                        <input { ...input }
                            onChange={ (value) => {
                                const elm = value.currentTarget;
                                input.onChange(value || elm?.value)
                                handleChange && handleChange(value || elm?.value)
                            } }
                            type="radio"
                            value={ isColors ? JSON.stringify(item.value) : item.value }
                            checked={ isColors ? (JSON.stringify(item.value) === (input.value || defaultValue)) : (item.value === (input.value || defaultValue)) }
                            id={ input.name }
                            className="styled-radio"
                        />
                        <div className='input-radio-label'>
                            {isColors && <span className={ `checkbox-colors ${ item.label === 'Clean White' ? 'round-border' : null }` }>
                                {item.label === 'Custom Color' ? <img src={  ColorImage } /> : <span style={ { backgroundColor: item.value[ 'top-menu' ] } }></span>}
                            </span>}
                            {isIcons && item.icon && !item.imageUrl &&  <span className='emojiText mb-0 mt-1' dangerouslySetInnerHTML={ { __html:  item.icon  } } />}
                            {item.imageUrl && <>
                                <img src={ item.imageUrl } className='styled-radio-img'  alt={ item.label } /></>}
                            {fontStyled ? <p  className="emojiText mb-0 mt-1" dangerouslySetInnerHTML={ { __html:  item.label  } } /> : <span className="emojiText mb-0 mt-1" dangerouslySetInnerHTML={ { __html:  item.label  } } /> }

                        </div>

                    </div>)

            })}

            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            />
        </Form.Group>)
}
const renderFileDrop = (props)=> {
    const {
        input,
        //setUrl,
        url,
        formClass,
        isDropText,
        isDrop,
        placeholder,
        meta: { touched, error, warning },
    } = props;

    const handleDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const base64 = reader.result
                input.onChange(base64)
                isDrop && isDrop()
                //setUrl(base64);
            }
            // input.onChange(file)
            reader.readAsDataURL(file);
        })
    }

    return(
        <>
            <Dropzone accept="image/jpeg, image/png" multiple={ false } onDrop={ acceptedFiles => handleDrop(acceptedFiles) } >
                {({ getRootProps, getInputProps }) => {
                    return(

                        <div { ...getRootProps() } className={ formClass + ' avatar-user' }>
                            <div className="c-avatar cursor-pointer upload-file"
                                style={ {  backgroundImage: url ? `url(${ url })`: null } } >
                                <input  name={ input.name } { ...getInputProps()  } />
                                <p className='' dangerouslySetInnerHTML={ { __html: placeholder } }/>
                                {isDropText ? <div className='drag-image-box'><p>{isDropText}</p></div> : null }
                            </div>
                        </div>

                    )}}
            </Dropzone>
            <Validations
                props={ {
                    touched,
                    error,
                    warning
                } }
            /></>)
}
const renderFieldUsPhone = (props) => {
    const {
        input,
        label,
        name,
        type,
        placeholder,
        disabled,
        validationError,
        meta: { asyncValidating, touched, error, warning },
        maxLength,
        rows,
        withoutTouch,
        defaultWarning
    } = props;

    const changeValue = (event) =>{
        var x = event.currentTarget.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        const value = !x[ 2 ] ? x[ 1 ] :  x[ 1 ] + '-' + x[ 2 ] + (x[ 3 ] ? '-' + x[ 3 ] : '');
        input.onChange(value)
    }

    return (
        <Form.Group className={ asyncValidating ? 'async-validating' : '' } controlId={ name }>
            { label &&  <Form.Label>{label || ''}</Form.Label> }
            <Form.Control rows={ rows } { ...input } onChange={ changeValue }  maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'validation-error' : '' } placeholder={ placeholder || '' } />
            {defaultWarning && !input.value && <span className="default-warning"><i className="fas fa-exclamation-triangle"></i> {defaultWarning}</span>}
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                    withoutTouch
                } }
            />
        </Form.Group>
    );
};

export {
    renderFileDrop,
    renderFieldWG,
    renderField,
    renderOTPField,
    renderStyleMultipleRadio,
    renderFieldChangeWG,
    renderFieldUsPhone
};