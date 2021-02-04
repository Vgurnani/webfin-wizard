import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  DashboardMenuIcon,
  EditSiteMenuIcon,
  BlogMenuIcon,
  MarketingMenuIcon,
  SubMenuIcon,
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  Instagram,
  CloseIcon,
  SmallRadio,
  SmallRadioChecked,
  OpenArrow,
  DeleteIcon,
  CloneIcon,
} from '../../utils/svg';
import
  {
    Container,
    Row,
    Col,
    Form,
    Button,
    Accordion,
    Card,
  }
from 'react-bootstrap';
import searchIcon from '../../images/search.png';
import filterIcon from '../../images/filter.png';
import EditIcon from '../../images/edit.png';

 const DashboardPage =(props) => {
    const dispatch = useDispatch();
    const [status, setStatus ] = useState(false)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    var timeoutData = null;
    useEffect(() => {
        removeItem('assessmentForm')
        dispatch({
          type: 'SET_ACTIVE_SIDEBAR',
          payload: 'dashboard'
        })
        dispatch(getCurrentUser());
        return () =>{
          clearInterval(timeoutData)
        }
    }, [  ]);


    useEffect(() =>{
      data?.site?.domain && checkDomainStatus(`https://${data?.site?.domain}`)
      timeoutData = data?.site?.domain && setInterval(function(){
        checkDomainStatus(`https://${data?.site?.domain}`)
      },30000)
      return () =>{
        clearInterval(timeoutData)
      }
    },[data?.site?.domain])


    const checkDomainStatus = async(domain) => {
      try{
        const data = await axios.get(domain)
        if(data.status === 200){
          setStatus(true)
          clearInterval(timeoutData)
        }
      }catch(err){
      }
    }



    return(
        <main className="dashboard-data">
          <section className="dashboard-body">
             <div className="dashboard-header">
              <div className="dashboard-title">
                <h5>
                  Domain:  
                  <a href={`https://${data?.site?.domain}`} target='_blank'>
                    { data?.site?.domain }
                  </a> 
                  <span className={`${status ? 'success' : 'in-progress'}`}> - 
                    {status ? "Done" : "In Progress"}
                  </span>
                </h5>
                <h1>Dashboard</h1>
                
              </div>
              <div className="dashboard-actions">
                <Link to={'/blog'} className='btn btn-primary'>Create Blog</Link>
              </div>
              
            </div> 
            <div className="dashboard-header">
              <div className="dashboard-title">
                <h5>Site 1</h5>
                <h1>My blog about food</h1>
              </div>
              <div className="dashboard-actions">
              <Form className="search-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className="form-control" placeholder="Search" />
                  </Form.Group>
                  <Button className="btn-search" type="submit">
                    <img src={searchIcon} />
                  </Button>
                </Form>
                <a className="btn-filter">
                  <img src={filterIcon} />
                </a>
              </div>
            </div>
            <section className="dashboard-body">
              <div className="dashboard-body-header">
                <div className="dashboard-body-title">
                  <h2>Posts</h2>
                </div>
                <div className="dashboard-body-actions">
                  <a className="btn btn-primary">
                  Add New+
                  </a>
                </div>
              </div>
              <div className="dashboard-table">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Views</th>
                        <th>Comments</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch-1"
                            label=""
                          /> 
                          <span className="table-post-title">The Joy of Cooking</span>
                        </td>
                        <td>
                        132 
                        <span className="view-tags">★ Best Performance</span>
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        dd/mm/yyyy
                        </td>
                        <td>
                          <a className="table-action-btns">
                            <img src={EditIcon} />
                            <span>Edit</span>
                          </a>
                          <a className="table-action-btns">
                            <DeleteIcon />
                            <span>Delete</span>
                          </a>
                          <a className="table-action-btns">
                            <CloneIcon />
                            <span>Clone</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <Form.Check 
                            type="switch"
                            id="custom-switch-2"
                            label=""
                          /> 
                          <span className="table-post-title">The Joy of Cooking</span>
                        </td>
                        <td>
                        132 
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        dd/mm/yyyy
                        </td>
                        <td>
                          <a className="table-action-btns">
                            <img src={EditIcon} />
                            <span>Edit</span>
                          </a>
                          <a className="table-action-btns">
                            <DeleteIcon />
                            <span>Delete</span>
                          </a>
                          <a className="table-action-btns">
                            <CloneIcon />
                            <span>Clone</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch-3"
                            label=""
                          /> 
                          <span className="table-post-title">The Joy of Cooking</span> 
                        </td>
                        <td>
                        132 
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        dd/mm/yyyy
                        </td>
                        <td>
                          <a className="table-action-btns">
                            <img src={EditIcon} />
                            <span>Edit</span>
                          </a>
                          <a className="table-action-btns">
                            <DeleteIcon />
                            <span>Delete</span>
                          </a>
                          <a className="table-action-btns">
                            <CloneIcon />
                            <span>Clone</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch-4"
                            label=""
                          /> 
                          <span className="table-post-title">The Joy of Cooking</span> 
                        </td>
                        <td>
                        132 
                        <span className="view-tags">★ Best Performance</span>
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        dd/mm/yyyy
                        </td>
                        <td>
                          <a className="table-action-btns">
                            <img src={EditIcon} />
                            <span>Edit</span>
                          </a>
                          <a className="table-action-btns">
                            <DeleteIcon />
                            <span>Delete</span>
                          </a>
                          <a className="table-action-btns">
                            <CloneIcon />
                            <span>Clone</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch-5"
                            label=""
                          /> 
                          <span className="table-post-title">The Joy of Cooking</span> 
                        </td>
                        <td>
                        132 
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        dd/mm/yyyy
                        </td>
                        <td>
                          <a className="table-action-btns">
                            <img src={EditIcon} />
                            <span>Edit</span>
                          </a>
                          <a className="table-action-btns">
                            <DeleteIcon />
                            <span>Delete</span>
                          </a>
                          <a className="table-action-btns">
                            <CloneIcon />
                            <span>Clone</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch-6"
                            label=""
                          /> 
                          <span className="table-post-title">The Joy of Cooking</span> 
                        </td>
                        <td>
                        132 
                        </td>
                        <td>
                        32
                        </td>
                        <td>
                        dd/mm/yyyy
                        </td>
                        <td>
                          <a className="table-action-btns">
                            <img src={EditIcon} />
                            <span>Edit</span>
                          </a>
                          <a className="table-action-btns">
                            <DeleteIcon />
                            <span>Delete</span>
                          </a>
                          <a className="table-action-btns">
                            <CloneIcon />
                            <span>Clone</span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="draft-posts">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Drafts
                      <OpenArrow />
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      <div className="dashboard-table">
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Views</th>
                                <th>Comments</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  
                                  <span className="table-post-title">The Joy of Cooking</span>
                                </td>
                                <td>
                               
                                </td>
                                <td>
                              
                                </td>
                                <td>
                             
                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    label="Publish"
                                  /> 
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span className="table-post-title">The Joy of Cooking</span>
                                </td>
                                <td>
                                
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    label="Publish"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span className="table-post-title">The Joy of Cooking</span> 
                                </td>
                                <td>
                                
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    label="Publish"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span className="table-post-title">The Joy of Cooking</span> 
                                </td>
                                <td>
                            
                                </td>
                                <td>
                              
                                </td>
                                <td>
                               
                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    label="Publish"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td> 
                                  <span className="table-post-title">The Joy of Cooking</span> 
                                </td>
                                <td>
                                
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    label="Publish"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span className="table-post-title">The Joy of Cooking</span> 
                                </td>
                                <td>
                                
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                <Form.Check 
                                    type="switch"
                                    label="Publish"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </section>
          </section>
        </main>
        
    )
}

export default DashboardPage