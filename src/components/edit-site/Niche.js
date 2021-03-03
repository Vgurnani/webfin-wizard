import React,{ useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Form, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { getNicheSuggestion } from 'middleware/assessments'
import ButtonLoader from 'components/core/loader/button-loader'
import { renderStyleMultipleRadio, renderNicheSelectField } from 'utils/formUtils'
import _ from 'lodash'
const Niche = (props) => {
    const dispatch  = useDispatch();
    const { handleSubmit, submitData,form, loading, assessmentData } = props
    const customNiches = useSelector((state) => state.assessment.customNiches )
    const [ showCustomNiche , setCustomNiche ] = useState(false)

    useEffect(() => {
        if(form?.initial?.niche){
            const niche = JSON.parse(form?.initial?.niche)
            if(!_.map(assessmentData.niches,'label').includes(niche.label)){
                dispatch(getNicheSuggestion(niche.label))
                setCustomNiche(true)
            }
        }
    },[ form?.initial?.niche ])

    const handleNicheChange = ( event ) => {
        const obj = JSON.parse(event.target.value)
        obj.label === 'Other'? setCustomNiche(true) : setCustomNiche(false)
    }
    const getSuggestion = (value) => {
        dispatch(getNicheSuggestion(value.label))
    }
    const setDefaultValue = () => {
        const niche = form?.initial?.niche
        const label = typeof niche === 'string' ? JSON.parse(niche).label : niche.label
        return label
    }
    const asyncValidateFunc = _.debounce(getSuggestion, 300);
    const asyncChangeCallback = useCallback(asyncValidateFunc, []);
    return(
        <div className="niche-edit-modal">
            <Form onSubmit={ handleSubmit(submitData) }>
                <Modal.Header closeButton>
                    <div className="logo-upload-header">
                        <Row>
                            <Col className="col-12">
                                <Modal.Title>Niche</Modal.Title>
                            </Col>
                        </Row>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="category-wrapper">
                        <Field
                            name="niche"
                            options={ assessmentData.niches || [] }
                            component={ renderStyleMultipleRadio }
                            defaultValue={ 'no' }
                            handleChange={ handleNicheChange }
                            placeholder={ 'gaveCraving' }
                            isNiche={ true }
                            className='styled-radio-btn'
                            imgWidth="30px"
                            isIcons={ true }
                        />
                        {showCustomNiche && <Field
                            name="niche"
                            defaultValue={ setDefaultValue() }
                            options={  customNiches || []  }
                            handleChange = { asyncChangeCallback }
                            component={ renderNicheSelectField }
                        />}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-btns text-right">
                        <ButtonLoader
                            button={ <Button type='submit' variant="primary">confirm</Button> }
                            loadButton= {
                                <Button disabled={ true } type='button' variant="primary">saving..</Button>
                            }
                            loading={ loading }

                        />
                    </div>
                </Modal.Footer>
            </Form>
        </div>

    )
}
Niche.propTypes = {
    submitData: PropTypes.func,
    handleSubmit: PropTypes.func,
    assessmentData: PropTypes.object,
    loading: PropTypes.bool,
    form: PropTypes.object
};
export default Niche;