/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
// import CustomTable from 'components/core/table'
import ConfirmAlert from 'components/core/confirm-alert'
import { confirmAlert } from 'react-confirm-alert';

import
{
    Form,
    Button,
    Accordion,
    Card,
}
    from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getDraftBlogs,callPublish, getPublishedBlogs, getBlogById, deleteBlog } from '../../middleware/blog';
import { ROUTES } from '../../constants/appRoutes';
import { getDynamicURL } from '../../services/api';

import {
    OpenArrow,
    EditBlogListIcon,
    CloneBlogListIcon,
    ShareBlogListIcon,
    ViewsBlogListIcon,
    CommentsBlogListIcon,
    DeleteBlogListIcon
} from '../../utils/svg';
import { getSessionData } from 'utils/helpers'
import searchIcon from '../../images/search.png';
// import filterIcon from '../../images/filter.png';
import 'react-confirm-alert/src/react-confirm-alert.css';

const BlogsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const publishBlogs = useSelector(state => state.blog.publishBlogs)
    const draftBlogs = useSelector(state => state.blog.draftBlogs)
    const data = useSelector(state => state.user.sessionData?.data?.data) || getSessionData()
    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'blog'
        })
        dispatch(getDraftBlogs());
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
        confirmAlert({
            // eslint-disable-next-line react/display-name
            customUI: ({ onClose }) => {
                return(
                    <ConfirmAlert key={ 'box' } onClose={ onClose } handleAction={ () => dispatch(deleteBlog(blog.id)) } />
                );
            }
        });
    }

    const handlePublish = (event, blog ) => {
        event.preventDefault()
        dispatch(callPublish(blog.id,event.target.checked))
    }

    const redirectToBlog = (event,blog) => {
        event.preventDefault();
        window.open(
            `https://${ data.sites[ 0 ].domain }/blog/${ blog.slug }`,
            '_blank'
        );
    }

    return(
        <main className="dashboard-data blog-dashboard">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Posts</h1>
                        <div className="dashboard-body-actions">
                            <Link to={ ROUTES.BLOG } className='btn btn-primary'>Add New+</Link>
                        </div>
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
                    </div>
                </div>
                {/* <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h5>Site 1</h5>
                        <h1>My blog about {data?.sites[ 0 ]?.niche?.label}</h1>
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
                </div> */}

                {/* <div className="dashboard-body-header">
                    <div className="dashboard-body-title">
                        <h2>Posts</h2>
                    </div>
                    <div className="dashboard-body-actions">
                        <Link to={ ROUTES.BLOG } className='btn btn-primary'>Add New+</Link>
                    </div>
                </div> */}

                <div className="blog-custom-list-table">
                    <div className="blog-custom-list">
                        <div className="blog-list-header">
                            <div className="blog-list-column blog-list-live">
                                Live
                            </div>
                            <div className="blog-list-column blog-list-title">
                                Title
                            </div>
                            <div className="blog-list-column blog-list-date">
                                Date Created
                            </div>
                            <div className="blog-list-column blog-list-views">
                                Views
                            </div>
                            <div className="blog-list-column blog-list-comments">
                                Comments
                            </div>
                            <div className="blog-list-column blog-list-delete">
                                Delete
                            </div>
                        </div>
                        { publishBlogs?.length ? <div className="blog-custom-list-table-data">
                            {publishBlogs?.map((blog, index) => (<div className="blog-list-table blog-list-publish blog-list-header" key={ blog?.slug }>
                                <div className="blog-list-column blog-list-live" key={ index }>
                                    <Form.Check
                                        type="switch"
                                        id={ 'custom-switch-'+blog.id  }
                                        label=""
                                        onChange={ (e) => handlePublish(e, blog) }
                                        checked={ blog.published_at !== null }
                                    />
                                </div>
                                <div className="blog-list-column blog-list-title">
                                    <span className="table-post-title">
                                        {blog?.title}
                                        <a onClick={ (event) => redirectToBlog(event, blog) }>View</a>
                                    </span>
                                </div>
                                <div className="blog-list-column blog-list-date">
                                    { blog.created_at && moment(blog.created_at).format('L')}
                                </div>
                                <div className="blog-list-column blog-list-views">
                                    <ViewsBlogListIcon />
                                    <span>70,365</span>
                                </div>
                                <div className="blog-list-column blog-list-comments">
                                    <CommentsBlogListIcon />
                                    <span></span>
                                </div>
                                <div className="blog-list-column blog-list-actions  blog-list-delete">
                                    <div className="hover-actions">
                                        <a onClick={ (e) => handleEdit(e, blog) } className="table-action-btns" href="/#">
                                            <EditBlogListIcon />
                                            <span>Edit</span>
                                        </a>
                                        <a onClick={ (e) => handleClone(e, blog) } className="table-action-btns" href="/#">
                                            <CloneBlogListIcon />
                                            <span>Clone</span>
                                        </a>
                                        <a className="table-action-btns" href="/#">
                                            <ShareBlogListIcon />
                                            <span>Share</span>
                                        </a>
                                    </div>
                                    <a onClick={ (e) => handleDelete(e, blog) } className="table-action-btns table-action-btns-delete" href="/#">
                                        <DeleteBlogListIcon />
                                    </a>
                                </div>
                            </div>)
                            )}
                        </div> : <div className="blog-list-table blog-list-header no-post">No Posts available</div>}
                    </div>
                </div>
                {/* <CustomTable headings={ [ 'Title','Views','Comments','Date Created','Actions' ] }>
                    {publishBlogs?.map((blog, index) => (<tr key={ blog?.slug }>
                        <td style={ { cursor: 'pointer ' } } key={ index } >
                            <Form.Check
                                type="switch"
                                id={ 'custom-switch-'+blog.id  }
                                label=""
                                onChange={ (e) => handlePublish(e, blog) }
                                checked={ blog.published_at !== null }
                            />
                            <span className="table-post-title">{blog?.title}</span>
                        </td>
                        <td onClick={ (event) => redirectToBlog(event, blog) } style={ { cursor: 'pointer ' } }>
                            -
                        </td>
                        <td onClick={ (event) => redirectToBlog(event, blog) } style={ { cursor: 'pointer ' } }>
                            -
                        </td>
                        <td  style={ { cursor: 'pointer ' } }>
                            { blog.created_at && moment(blog.created_at).format('L')}
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
                </CustomTable> */}

                <div className="draft-posts">
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
                                    <div className="blog-custom-list-table">
                                        <div className="blog-custom-list">
                                            <div className="blog-list-header">
                                                <div className="blog-list-column blog-list-live">
                                                    Live
                                                </div>
                                                <div className="blog-list-column blog-list-title">
                                                    Title
                                                </div>
                                                <div className="blog-list-column blog-list-date">
                                                    Date Created
                                                </div>
                                                <div className="blog-list-column blog-list-views">
                                                    Views
                                                </div>
                                                <div className="blog-list-column blog-list-comments">
                                                    Comments
                                                </div>
                                                <div className="blog-list-column blog-list-delete">
                                                    Delete
                                                </div>
                                            </div>
                                            { draftBlogs?.length ? <div className="blog-custom-list-table-data">
                                                {draftBlogs?.map((blog, index) => (<div className="blog-list-table blog-list-header" key={ blog?.slug }>
                                                    <div className="blog-list-column blog-list-live" key={ index }>
                                                        <Form.Check
                                                            type="switch"
                                                            id={ 'custom-switch-'+blog.id  }
                                                            label=""
                                                            onChange={ (e) => handlePublish(e, blog) }
                                                            checked={ blog.published_at !== null }
                                                        />
                                                    </div>
                                                    <div className="blog-list-column blog-list-title">
                                                        <span className="table-post-title">
                                                            {blog?.title}
                                                            <a onClick={ (event) => redirectToBlog(event, blog) }>View</a>
                                                        </span>
                                                    </div>
                                                    <div className="blog-list-column blog-list-date">
                                                        { blog.created_at && moment(blog.created_at).format('L')}
                                                    </div>
                                                    <div className="blog-list-column blog-list-views">
                                                        <ViewsBlogListIcon />
                                                        <span>70,365</span>
                                                    </div>
                                                    <div className="blog-list-column blog-list-comments">
                                                        <CommentsBlogListIcon />
                                                        <span></span>
                                                    </div>
                                                    <div className="blog-list-column blog-list-actions  blog-list-delete">
                                                        <div className="hover-actions">
                                                            <a onClick={ (e) => handleEdit(e, blog) } className="table-action-btns" href="/#">
                                                                <EditBlogListIcon />
                                                                <span>Edit</span>
                                                            </a>
                                                            <a onClick={ (e) => handleClone(e, blog) } className="table-action-btns" href="/#">
                                                                <CloneBlogListIcon />
                                                                <span>Clone</span>
                                                            </a>
                                                            <a className="table-action-btns" href="/#">
                                                                <ShareBlogListIcon />
                                                                <span>Share</span>
                                                            </a>
                                                        </div>
                                                        <a onClick={ (e) => handleDelete(e, blog) } className="table-action-btns table-action-btns-delete" href="/#">
                                                            <DeleteBlogListIcon />
                                                        </a>
                                                    </div>
                                                </div>)
                                                )}
                                            </div> : <div className="blog-list-table blog-list-header no-post">No Posts available</div>}
                                        </div>
                                    </div>
                                    {/*  <div className="dashboard-table blogs-table">
                                      <CustomTable headings={ [ 'Title','Views','Comments','Date Created','Actions' ] }>

                                            {draftBlogs?.map(blog => (
                                                <tr  key={ blog.slug }>
                                                    <td>
                                                        <span className="table-post-title">{blog.title}</span>
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>
                                                        { blog.created_at && moment(blog.created_at).format('L')}
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id={ 'custom-switch-'+blog.id  }
                                                            label=""
                                                            onChange={ (e) => handlePublish(e, blog) }
                                                            checked={ blog.published_at !== null }
                                                        />
                                                        <a onClick={ (e) => handleDelete(e, blog) } className="table-action-btns" href="/#">
                                                            <DeleteIcon />
                                                            <span>Delete</span>
                                                        </a>
                                                    </td>
                                                </tr>))}
                                        </CustomTable>

                                    </div>*/}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </section>
        </main>

    )
}

export default BlogsPage