import React from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col ,Form } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
import { AllColors } from 'constants/theme'
import ButtonLoader from 'components/core/loader/button-loader'

const ColourPalette = (props) => {
    const { submitData,handleSubmit, loading  } = props
    return(
        <div className="color-palette-popup">
            <Form onSubmit={ handleSubmit(submitData) }>
                <Modal.Header closeButton>
                    <div className="logo-upload-header">
                        <Row>
                            <Col className="col-12">
                                <Modal.Title>Color palette</Modal.Title>
                            </Col>
                        </Row>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="color-palatte">
                        <div className="color-palatte-selector">
                            <Field
                                name="colors"
                                options={ AllColors() || []  }
                                component={ renderStyleMultipleRadio }
                                defaultValue={ 'no' }
                                placeholder={ 'gaveCraving' }
                                isColors={ true }
                                className='styled-radio-btn btn-outline'
                                imgWidth="30px"
                            />
                        </div>
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
ColourPalette.propTypes = {
    submitData: PropTypes.func,
    handleSubmit: PropTypes.func,
    assessmentData: PropTypes.object,
    loading: PropTypes.bool
};
export default ColourPalette;