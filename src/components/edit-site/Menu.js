import React from 'react';
import
{
    Col,
    Row,
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import {
    EditMenuIcon,
} from '../../utils/svg';
const Menu = (props) => {
    const { onClose } = props
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
                        <ol>
                            <li>
                                <div className="menu-order">1.</div>
                                <div className="menu-detail">
                                    <div className="menu-detail-inner">
                                        <div className="menu-name">
                                            <EditMenuIcon />
                                            <span>Home</span>
                                        </div>
                                        <a className="menu-action">Edit</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-order">2.</div>
                                <div className="menu-detail">
                                    <div className="menu-detail-inner">
                                        <div className="menu-name">
                                            <EditMenuIcon />
                                            <span>About</span>
                                        </div>
                                        <a className="menu-action">Edit</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-order">3.</div>
                                <div className="menu-detail">
                                    <div className="menu-detail-inner">
                                        <div className="menu-name">
                                            <EditMenuIcon />
                                            <span>Recipes</span>
                                        </div>
                                        <a className="menu-action">Edit</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-order">4.</div>
                                <div className="menu-detail">
                                    <div className="menu-detail-inner">
                                        <div className="menu-name">
                                            <EditMenuIcon />
                                            <span>Contact</span>
                                        </div>
                                        <a className="menu-action">Edit</a>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div className="add-menu">
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Contact" />
                            </Form.Group>
                            <Form.Group className="url-control">
                                <Form.Label>Link</Form.Label>
                                <Form.Control placeholder="/contact-success/" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns text-right">
                    <Button onClick={ onClose } variant="primary">confirm</Button>
                </div>
            </Modal.Footer>
        </div>

    )
}
export default Menu