import React from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Form, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import ButtonLoader from 'components/core/loader/button-loader'
import { renderStyleMultipleRadio } from 'utils/formUtils'
const Niche = (props) => {
    const { handleSubmit, submitData,loading, assessmentData } = props

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
                            name="nicheId"
                            options={ assessmentData.niches || [] }
                            component={ renderStyleMultipleRadio }
                            defaultValue={ 'no' }
                            placeholder={ 'gaveCraving' }
                            className='styled-radio-btn'
                            imgWidth="30px"
                            isIcons={ true }
                        />
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
    loading: PropTypes.bool
};
export default Niche;