import React, { useState } from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col, Form } from 'react-bootstrap';
const MenuLinks = (props) => {
    const [ linkType, setLinkType ] = useState(0)
    const [ loadingtype , setLoadingType ] = useState(false)
    const { onClose  ,menuLinks,loadData,handleChangeMenuLink, addMenuLinks } = props
    const getData = () => {
        return menuLinks[ linkType ]
    }
    const addLinks = () =>{
        addMenuLinks()
    }
    const setLinkTypeFun = (index) => {
        setLoadingType(true)
        setLinkType(index)
        setTimeout(()=>{
            setLoadingType(false)
        },1)
    }
    return(
        <div className="">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-12">
                            <Modal.Title>Menu</Modal.Title>
                        </Col>
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="col-6">
                        <div style={ { height: '200px' } }>
                            { !loadData && menuLinks.map((item,index) => {
                                return(
                                    <div key={ index }>
                                        <span>{ index+1 }.</span>
                                        <span>{ item?.name?.uppercase() }</span>
                                        <span><a href='#' onClick={ () => setLinkTypeFun(index) }>edit</a></span>
                                    </div>)
                            }) }
                        </div>
                        {menuLinks.length < 5 && <button onClick={ addLinks }>add</button>}
                    </Col>
                    <Col className="col-6">
                        {!loadingtype &&
                        <div>
                            <Form.Group>
                                <Form.Label>Name:</Form.Label>
                                <input type='text'
                                    name='name'
                                    disabled={ getData()?.name === 'home' }
                                    onChange={ (event) => handleChangeMenuLink(event,linkType) }
                                    className='form-control'
                                    defaultValue={ getData()?.name }

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>link:</Form.Label>
                                {<input type='text'
                                    name='url'
                                    disabled={ true }
                                    className='form-control'
                                    defaultValue={ getData()?.url }

                                />}
                            </Form.Group>

                        </div>
                        }
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns text-right">
                    <Button onClick={ onClose } variant="primary">confirm</Button>
                </div>
            </Modal.Footer>
        </div>

    )
}
String.prototype.uppercase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
MenuLinks.propTypes = {
    onClose: PropTypes.func,
    menuLinks: PropTypes.array,
    addMenuLinks: PropTypes.func,
    loadData: PropTypes.bool,
    assessmentData: PropTypes.object,
    handleChangeMenuLink: PropTypes.func,
    loadText: PropTypes.bool
};
export default MenuLinks;