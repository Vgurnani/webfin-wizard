/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import React from 'react';
import { Form } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import Dropzone from 'react-dropzone';
import ColorImage from 'images/color.png';
import _ from 'lodash';
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
        asyncLoading,
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
        <Form.Group controlId={ name }>
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
            { asyncLoading && asyncValidating ? <div className="small-up-loader">
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div> : null }
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
        handleClick,
        isNiche,
        fontStyled,
        meta: { touched, error, warning },
    } = props;

    const setValue = (item) => {
        return isColors ? JSON.stringify(item.value) : (isNiche ? JSON.stringify({ id: item.value, label: item.label }) :  item.value)
    }
    const setChecked = (item) =>{
        if(isColors){
            const itemValue = typeof (item.value) === 'string' ? item.value && JSON.parse(item.value) : item.value
            const inputValue = typeof (input.value) === 'string' ? input.value && JSON.parse(input.value) : input.value
            return itemValue.name === (inputValue.name || defaultValue)
        }else if(isNiche){
            const value = typeof input.value === 'string' ? input.value &&  JSON.parse(input.value) : input.value
            const other = item.label === 'Other' ? input.value && !_.map(options,'label').includes(value.label) : false
            return value && value.id === item.value || other
        }else{
            return (item.value === (input.value || defaultValue))
        }
    }
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
                            value={ setValue(item) }
                            onClick={ (event) => {
                                isColors && item.label === 'Custom Color' ? handleClick && handleClick(event) : null }
                            }
                            checked={ setChecked(item) }
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
            { isNiche && input.value && (typeof input.value === 'string' ?  JSON.parse(input.value).label !== 'Other' : input?.value?.label !== 'Other') &&
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            /> }
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

            reader.onabort = () => {}
            reader.onerror = () => {}
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
                                {isDropText ? <div className='drag-image-box'><p className='' dangerouslySetInnerHTML={ { __html: isDropText } }/></div> : null }
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

const renderNicheSelectField = (props) => {
    const {
        input,
        validationError,
        meta: { touched, error, warning },
        options,
        defaultValue,
        handleChange,
        defaultWarning
    } = props;

    const onChange = (event) => {
        const value = options.filter((item) => item.label === event.target.value )[ 0 ] || { label: event.target.value }
        handleChange && handleChange(value)
        input.onChange(JSON.stringify(value))
    }

    return (
        <Form.Group>
            <input defaultValue={ defaultValue } autoComplete={ 'off' } id='selectFieldInput' list='selectField' name={ name }  className={ validationError || (touched && error) ? 'form-control validation-error' : 'form-control' } onChange={ onChange } />
            <datalist id="selectField">

                {
                    options.map((item, index) => (
                        <option key={ index } data-value={ item.value }>
                            {item.label}
                        </option>
                    ))}
            </datalist>
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
export {
    renderFileDrop,
    renderFieldWG,
    renderNicheSelectField,
    renderField,
    renderOTPField,
    renderStyleMultipleRadio,
    renderFieldChangeWG,
};