import React, { useState , useEffect } from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {
    EditMenuIcon,
    PlusIcon
} from '../../utils/svg';
import ButtonLoader from 'components/core/loader/button-loader'
const MenuLinks = (props) => {
    const [ linkType, setLinkType ] = useState(0)
    const [ loadingtype , setLoadingType ] = useState(false)
    const { handleSubmit, submitData, loading, menuLinks,handleChangeMenuLink,isValid, addMenuLinks ,removeMenuLink } = props
    const getData = () => {
        return menuLinks[ linkType ]
    }
    const addLinks = () =>{
        addMenuLinks()
    }
    useEffect(()=>{
        setLoadingType(false)
    },[ linkType ])
    const setLinkTypeFun = (index) => {
        linkType !== index && setLoadingType(true)
        setLinkType(index)
    }
    const removeLinkTypeFun = (index) =>{
        setLoadingType(true)
        setLinkType(linkType-1)
        removeMenuLink(index)
    }
    const isValidMenu = () => {
        return menuLinks && !menuLinks.map((item) => item.name ).includes(undefined)
    }

    return(
        <div className="">
            <Form onSubmit={ handleSubmit(submitData) }>
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
                            <ol>
                                { menuLinks.map((item,index) => {
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

                            {menuLinks.length < 5 && <button className='add-icon-btn' type='button' onClick={ addLinks }><PlusIcon /></button>}
                        </div>

                        <div className="add-menu">
                            {!loadingtype &&
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <input type='text'
                                        name='name'
                                        disabled={ getData()?.name === 'home' && linkType === 0 }
                                        onChange={ (event) => handleChangeMenuLink(event,linkType) }
                                        className='form-control'
                                        defaultValue={ getData()?.name }
                                        value={ getData()?.name  }

                                    />
                                    {!isValid && <p><span className='field_error'>Name and url should be unique </span></p>}
                                </Form.Group>
                                <Form.Group className="url-control">
                                    <Form.Label>Link</Form.Label>
                                    {<input type='text'
                                        name='url'
                                        disabled={ true }
                                        className='form-control'
                                        defaultValue={ getData()?.url }

                                    />}
                                </Form.Group>
                            </Form>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-btns text-right">
                        { isValid  && isValidMenu() ?
                            <ButtonLoader
                                button={ <Button type='submit' variant="primary">confirm</Button> }
                                loadButton= {
                                    <Button disabled={ true } type='button' variant="primary">saving..</Button>
                                }
                                loading={ loading }

                            /> :
                            <Button disabled={ true } variant="primary">confirm</Button>
                        }

                    </div>
                </Modal.Footer>
            </Form>
        </div>

    )
}
String.prototype.uppercase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
MenuLinks.propTypes = {
    submitData: PropTypes.func,
    handleSubmit: PropTypes.func,
    menuLinks: PropTypes.array,
    addMenuLinks: PropTypes.func,
    loadData: PropTypes.bool,
    assessmentData: PropTypes.object,
    handleChangeMenuLink: PropTypes.func,
    loadText: PropTypes.bool,
    removeMenuLink: PropTypes.func,
    isValid: PropTypes.bool,
    loading: PropTypes.bool
};
export default MenuLinks;