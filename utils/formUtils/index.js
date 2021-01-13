/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import React from 'react';
import { Form, Row } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import Dropzone from 'react-dropzone'

export const Validations = (props) => {
    const {
        touched,
        error,
        validationError,
        warning,
    } = props.props;

    return (
        <>
            <p>
                {touched && ((error && <span className="field_error">{error}</span>) || (warning && <span>{warning}</span>))}
            </p>
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
        meta: { touched, error, warning },
        maxLength,
        rows,
        defaultWarning
    } = props;

    return (
        <Form.Group controlId={name} className="form-group">
            <Form.Label className="form-label">{label || ''}</Form.Label>
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
        width,
        imgWidth,
        isColors,
        fontStyled,
        meta: { touched, error, warning },
    } = props;
    return (

        <Form.Group className="form-group">
   
                { options.map((item,index) => {
                    return(
                        <div key={ index } className={ `  ${ className || 'styled-radio' }` }>
                            <label className="labl" >
                                <input { ...input }
                                    onChange={ (value) => {
                                        const elm = value.currentTarget;
                                        input.onChange(value || elm?.value)
                                    } }
                                    type="radio"
                                    value={ item.value }
                                    checked={ item.value === (input.value || defaultValue) }
                                    id={ input.name } />
                                <div className='align-items-center d-inline-flex justify-content-center p-2 shadow-sm' style={ { width: width || 'auto' } }>
                                    <span className='row ml-5'>
                                        {item.imageUrl && <>
                                            <img src={ item.imageUrl } className='styled-radio-img'  alt={ item.label } style={ { width: imgWidth || 'auto' } } /></>}
                                        {fontStyled ? <p style={{fontStyle: item.value}} className="emojiText mb-0 mt-1" dangerouslySetInnerHTML={ { __html:  item.label  } } /> : 
                                        <p className="emojiText mb-0 mt-1" dangerouslySetInnerHTML={ { __html:  item.label  } } /> }
                                        {isColors && <p className='row checkbox-colors'>
                                            {item.colors && item.colors.map((color,ind) => <span style={{backgroundColor: color}}></span>)}
                                        </p>}
                                    </span>
                                </div>
                            </label>
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
                //setUrl(base64);
            }
            input.onChange(file)
            reader.readAsDataURL(file);
        })
    }

    return(
        <>
            <Dropzone accept="image/jpeg, image/png" multiple={ false } onDrop={ acceptedFiles => handleDrop(acceptedFiles) } >
                {({ getRootProps, getInputProps }) => {
                    return(
                        <section>
                            <div { ...getRootProps() } className={ formClass + ' avatar-user' }>
                                <div className="c-avatar cursor-pointer"
                                    style={ {  backgroundImage: url ? `url(${ url })`: null } } >
                                    <input  name={ input.name } { ...getInputProps()  } />
                                    <p dangerouslySetInnerHTML={{__html: placeholder}}/>
                                </div>
                            </div>
                        </section>
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

export {
    renderFileDrop,
    renderFieldWG,
    renderField,
    renderOTPField,
    renderStyleMultipleRadio
};