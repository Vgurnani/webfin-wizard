/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import React from 'react';
import { Form } from 'react-bootstrap';
import OtpInput from 'react-otp-input';

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

export {
    renderFieldWG,
    renderField,
    renderOTPField
};