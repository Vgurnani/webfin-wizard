import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import
{
    Form,
    Button,
    Accordion,
    Card,
}
    from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { getBlogs } from '../../middleware/blog';
import { ROUTES } from '../../constants/appRoutes';
import { getDynamicURL } from '../../services/api';
import { setEditBlog } from '../../actions/blog';

import {
    OpenArrow,
    DeleteIcon,
    CloneIcon,
} from '../../utils/svg';
import searchIcon from '../../images/search.png';
import filterIcon from '../../images/filter.png';
import EditIcon from '../../images/edit.png';

const BlogsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const blogs = useSelector(state => state.blog.blogs)

    useEffect(() => {
        dispatch(getBlogs());
    }, [ dispatch ]);

    const handleEdit = (event, blog) => {
        event.preventDefault();
        dispatch(setEditBlog(blog));
        const route = getDynamicURL(ROUTES.EDIT_BLOG, { id: blog.id });
        history.push(route)
    }

    return(
        <main className="dashboard-data">
            <section className="dashboard-body">
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
                                <img src={ searchIcon } alt={ 'searchIcon' } />
                            </Button>
                        </Form>
                        <a className="btn-filter" href="/">
                            <img src={ filterIcon } alt={ 'filterIcon' } />
                        </a>
                    </div>
                </div>
                <section className="dashboard-body">
                    <div className="dashboard-body-header">
                        <div className="dashboard-body-title">
                            <h2>Posts</h2>
                        </div>
                        <div className="dashboard-body-actions">
                            <Link to={ ROUTES.BLOG } className='btn btn-primary'>Add New+</Link>
                        </div>
                    </div>
                    { !!blogs?.published?.length && <div className="dashboard-table">
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
                                    {blogs?.published?.map(blog => (<tr key={ blog?.slug }>
                                        <td>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch-1"
                                                label=""
                                            />
                                            <span className="table-post-title">{blog?.title}</span>
                                        </td>
                                        <td>
                                            -
                                        </td>
                                        <td>
                                            -
                                        </td>
                                        <td>
                                            dd/mm/yyyy
                                        </td>
                                        <td>
                                            <a onClick={ (e) => handleEdit(e, blog) } className="table-action-btns" href="/#">
                                                <img src={ EditIcon } alt={ 'editIcon' } />
                                                <span>Edit</span>
                                            </a>
                                            <a className="table-action-btns" href="/">
                                                <DeleteIcon />
                                                <span>Delete</span>
                                            </a>
                                            <a className="table-action-btns" href="/">
                                                <CloneIcon />
                                                <span>Clone</span>
                                            </a>
                                        </td>
                                    </tr>)
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>}
                    {!!blogs?.draft?.length && <div className="draft-posts">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={ Button } variant="link" eventKey="0">
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
                                                        {blogs?.draft?.map(blog => (<tr key={ blog.slug }>
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
                                                        </tr>))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>}
                </section>
            </section>
        </main>

    )
}

export default BlogsPage