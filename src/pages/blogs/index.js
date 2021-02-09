import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from 'components/core/table'
import
{
    Form,
    Button,
    Accordion,
    Card,
}
    from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getPublishedBlogs, getBlogById, deleteBlog } from '../../middleware/blog';
import { ROUTES } from '../../constants/appRoutes';
import { getDynamicURL } from '../../services/api';

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
    const publishBlogs = useSelector(state => state.blog.publishBlogs)
    const draftBlogs = useSelector(state => state.blog.draftBlogs)

    useEffect(() => {
        //dispatch(getDraftBlogs());
        dispatch(getPublishedBlogs());
    }, [ dispatch ]);

    const handleEdit = (event, blog) => {
        event.preventDefault();
        const route = getDynamicURL(ROUTES.EDIT_BLOG, { id: blog.id });
        history.push(route)
    }
    const handleClone = (event, blog) => {
        event.preventDefault();
        dispatch(getBlogById(blog.id))
        history.push(ROUTES.BLOG)
    }

    const handleDelete = (event, blog) => {
        event.preventDefault();
        dispatch(deleteBlog(blog.id))
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
                    { publishBlogs?.length > 0 && <div className="dashboard-table">
                        <CustomTable headings={ [ 'Title','Views','Comments','Date Created','Actions' ] }>
                            {publishBlogs?.map(blog => (<tr key={ blog?.slug }>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch-1"
                                        label=""
                                        checked={ blog.published_at !== null }
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
                                    <a onClick={ (e) => handleDelete(e, blog) } className="table-action-btns" href="/#">
                                        <DeleteIcon />
                                        <span>Delete</span>
                                    </a>
                                    <a onClick={ (e) => handleClone(e, blog) } className="table-action-btns" href="/#">
                                        <CloneIcon />
                                        <span>Clone</span>
                                    </a>
                                </td>
                            </tr>)
                            )}
                        </CustomTable>
                    </div>}
                    {draftBlogs?.length > 0 && <div className="draft-posts">
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
                                            <CustomTable headings={ [ 'Title','Views','Comments','Date Created','Actions' ] }>

                                                {draftBlogs?.map(blog => (<tr key={ blog.slug }>
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
                                            </CustomTable>

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