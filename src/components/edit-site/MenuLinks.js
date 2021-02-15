import React, { useState } from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {
    EditMenuIcon,
    PlusIcon
} from '../../utils/svg';
const MenuLinks = (props) => {
    const [ linkType, setLinkType ] = useState(0)
    const [ loadingtype , setLoadingType ] = useState(false)
    const { onClose  ,menuLinks,loadData,handleChangeMenuLink,isValid, addMenuLinks ,removeMenuLink } = props
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
    const removeLinkTypeFun = (index) =>{
        setLoadingType(true)
        setLinkType(0)
        removeMenuLink(index)
        setTimeout(()=>{
            setLoadingType(false)
        },1)
    }

    console.log(getData())
    return(
        <div className="">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-6">
                            <Modal.Title>Menu</Modal.Title>
                        </Col>
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="edit-menu-listing">
                    <div className="menu-listing">
                        <ol style={ { height: '230px' } }>
                            { !loadData && menuLinks.map((item,index) => {
                                return(
                                    <li key={ index }>
                                        <div className="menu-order">{ index+1 }.</div>
                                        <div className="menu-detail">
                                            <div className="menu-detail-inner">
                                                <div className="menu-name">
                                                    <EditMenuIcon />
                                                    <span>{ item?.name ? item?.name?.uppercase() : '...' }</span>
                                                </div>
                                                <div className="">
                                                    <a className="menu-action" href='#' onClick={ () => setLinkTypeFun(index) }>edit</a>&nbsp;
                                                    {index !== 0 && <a className="menu-action" href='#' onClick={ () => removeLinkTypeFun(index) }>remove</a>}
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                            }) }
                        </ol>

                        {menuLinks.length < 5 && <button className='add-icon-btn' onClick={ addLinks }><PlusIcon /></button>}
                    </div>

                    <div className="add-menu">
                        {!loadingtype &&
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <input type='text'
                                    name='name'
                                    disabled={ getData()?.name === 'home' }
                                    onChange={ (event) => handleChangeMenuLink(event,linkType) }
                                    className='form-control'
                                    defaultValue={ getData()?.name }

                                />
                                {!isValid && <p><span className='field_error'>Name and url should be unique </span></p>}
                            </Form.Group>
                            <Form.Group className="url-control">
                                <Form.Label>Link</Form.Label>
                                {!loadData &&<input type='text'
                                    name='url'
                                    disabled={ true }
                                    className='form-control'
                                    defaultValue={ getData()?.url }

                                />}
                            </Form.Group>
                        </Form>
                        }
                    </div>
                    {!isValid && <p><span className='field_error'>Name and url should be unique </span></p>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns text-right">
                    { isValid ?
                        <Button onClick={ onClose } variant="primary">confirm</Button> :
                        <Button disabled={ true } variant="primary">confirm</Button>
                    }

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
    loadText: PropTypes.bool,
    removeMenuLink: PropTypes.func,
    isValid: PropTypes.bool
};
export default MenuLinks;