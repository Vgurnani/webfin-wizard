/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import CustomTable from 'components/core/table'
import ConfirmAlert from 'components/core/confirm-alert'
import { confirmAlert } from 'react-confirm-alert';
import Pagination from 'react-js-pagination';

import
{
    Form,
    Button,
    Accordion,
    Card,
}
    from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { allBlogsCount, getDraftBlogs,callPublish, getPublishedBlogs, getBlogById, deleteBlog } from '../../middleware/blog';
import { ROUTES } from '../../constants/appRoutes';
import { getDynamicURL } from '../../services/api';

import {
    OpenArrow,
    DeleteIcon,
    CloneIcon,
} from '../../utils/svg';
import { getSessionData } from 'utils/helpers'
import searchIcon from '../../images/search.png';
import EditIcon from '../../images/edit.png';
import 'react-confirm-alert/src/react-confirm-alert.css';

const BlogsPage = () => {
    const limit = 6;
    const dispatch = useDispatch();
    const history = useHistory();
    const [ filter, setFilter ] = useState(null)
    const [ activePagePublish, setActivePagePublish ] = useState(1);
    const [ activePageDraft, setActivePageDraft ] = useState(1)
    const publishBlogs = useSelector(state => state.blog.publishBlogs)
    const blogsCount = useSelector(state => state.blog.blogsCount)
    const draftBlogs = useSelector(state => state.blog.draftBlogs)
    const data = useSelector(state => state.user.sessionData?.data?.data) || getSessionData()
    console.log(blogsCount)
    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'blog'
        })
        dispatch(allBlogsCount())
        dispatch(getDraftBlogs(`_limit=${ limit }`));
        dispatch(getPublishedBlogs(`_limit=${ limit }`));
    }, [ dispatch ]);

    const handleFilter = () => {
        const filterData = `_where[title_contains]=${ filter }&_limit=${ limit }`
        dispatch(allBlogsCount())
        dispatch(getDraftBlogs(filterData));
        dispatch(getPublishedBlogs(filterData));
    }

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

    const handlePageChangePublish = (pageNumber) => {
        const startWith = (pageNumber - 1) * limit
        const args = `_start=${ startWith }&_limit=${ limit }`
        dispatch(getPublishedBlogs(args));
        setActivePagePublish(pageNumber);
    }
    const handlePageChangeDraft= (pageNumber) => {
        const startWith = (pageNumber - 1) * limit
        const args = `_start=${ startWith }&_limit=${ limit }`
        dispatch(getDraftBlogs(args));
        setActivePageDraft(pageNumber);
    }

    const handlePaginateData =(countPublish,countDraft ) => {
        let draftStartWith = (activePageDraft - 1) * limit
        let publishStartWith = (activePagePublish - 1) * limit
        let publishArgs;
        let draftArgs;
        if(publishStartWith <= countPublish || countPublish === 0){
            publishArgs = `_start=${ publishStartWith  }&_limit=${ limit }`
        }else{
            publishStartWith = publishStartWith - limit
            publishArgs = `_start=${ publishStartWith  }&_limit=${ limit }`
            setActivePagePublish(activePagePublish - 1)
        }
        if(draftStartWith < countDraft || countDraft === 0 ){
            draftArgs = `_start=${ draftStartWith }&_limit=${ limit }`
        }else{
            draftStartWith = draftStartWith - limit
            draftArgs = `_start=${ draftStartWith }&_limit=${ limit }`
            setActivePageDraft(activePageDraft - 1)
        }
        return { publishArgs, draftArgs }
    }

    const handleDelete = (event, blog) => {
        event.preventDefault();
        const countPublish = ( blog.published_at !== null ? blogsCount.publishCount : (blogsCount.publishCount - 1) )
        const countDraft = ( blog.published_at === null ? blogsCount.draftCount : (blogsCount.draftCount - 1) )
        const result = handlePaginateData(countPublish,countDraft)
        confirmAlert({
            // eslint-disable-next-line react/display-name
            customUI: ({ onClose }) => {
                return(
                    <ConfirmAlert key={ 'box' } onClose={ onClose } handleAction={ () => dispatch(deleteBlog(blog.id,result.draftArgs,result.publishArgs)) } />
                );
            }
        });
    }

    const handlePublish = (event, blog ) => {
        event.preventDefault()
        const countPublish = ( event.target.checked ? blogsCount.publishCount : (blogsCount.publishCount - 1) )
        const countDraft = ( !event.target.checked ? blogsCount.draftCount : (blogsCount.draftCount - 1) )
        const result = handlePaginateData(countPublish,countDraft)
        dispatch(callPublish(blog.id,event.target.checked, result.draftArgs, result.publishArgs))
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
            <section className="dashboard-body" style={ { marginTop: '12px' } }>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={ Button } variant="link" eventKey="0">
                                Posts
                                <div className="dashboard-body-actions">
                                    <Link to={ ROUTES.BLOG } className='btn btn-primary'>Add New+</Link>
                                </div>
                                <div className="dashboard-actions">
                                    <Form className="search-form">
                                        <Form.Group controlId="formBasicEmail">
                                            <Button onClick={ handleFilter } className="btn-search" type="button">
                                                <img src={ searchIcon } alt={ 'searchIcon' } />
                                            </Button>
                                            <Form.Control className="form-control" onChange={ (event) => setFilter(event.target.value) } placeholder="Search" />
                                        </Form.Group>

                                    </Form>
                                </div>
                                <OpenArrow />
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                { publishBlogs?.length ? <div className="dashboard-table blogs-table">
                                    <CustomTable headings={ [ 'Title','Views','Comments','Date Created','Actions' ] }>
                                        {publishBlogs?.map((blog, index) => (<tr key={ blog?.slug }>
                                            <td style={ { cursor: 'pointer ' } } key={ index } >
                                                <Form.Check
                                                    type="switch"
                                                    id={ 'custom-switch-'+blog.id  }
                                                    label=""
                                                    onChange={ (e) => handlePublish(e, blog) }
                                                    checked={ blog.published_at !== null }
                                                />
                                                <span className="table-post-title">{blog?.title}</span>&nbsp;
                                                <a href="#" onClick={ (event) => redirectToBlog(event, blog) } style={ { textDecoration: 'underline' ,cursor: 'pointer ' } }>view</a>
                                                <br/>
                                                <a onClick={ (e) => handleEdit(e, blog) } className="table-action-btns" href="/#">
                                                    <img src={ EditIcon } alt={ 'editIcon' } />
                                                    <span>Edit</span>
                                                </a>
                                                <a onClick={ (e) => handleClone(e, blog) } className="table-action-btns" href="/#">
                                                    <CloneIcon />
                                                    <span>Clone</span>
                                                </a>
                                            </td>
                                            <td >
                                                -
                                            </td>
                                            <td >
                                                -
                                            </td>
                                            <td >
                                                { blog.created_at && moment(blog.created_at).format('L')}
                                            </td>
                                            <td>

                                                <a onClick={ (e) => handleDelete(e, blog) } className="table-action-btns" href="/#">
                                                    <DeleteIcon />
                                                    <span>Delete</span>
                                                </a>

                                            </td>
                                        </tr>)
                                        )}
                                    </CustomTable>
                                    <div className='blogs-pagination'>
                                        { limit -1  <= blogsCount?.publishCount && <Pagination
                                            activePage={ activePagePublish }
                                            itemsCountPerPage={ limit -1 }
                                            totalItemsCount={ blogsCount?.publishCount }
                                            pageRangeDisplayed={ 5 }
                                            onChange={ handlePageChangePublish }
                                        />
                                        }
                                    </div>
                                </div> : <div>No Posts available</div>}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
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
                                    {draftBlogs?.length ? <div className="dashboard-table blogs-table">
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
                                        <div className='blogs-pagination'>
                                            { limit < blogsCount?.draftCount && <Pagination
                                                activePage={ activePageDraft }
                                                itemsCountPerPage={ limit }
                                                totalItemsCount={ blogsCount?.draftCount }
                                                pageRangeDisplayed={ 5 }
                                                onChange={ handlePageChangeDraft }
                                            />
                                            }
                                        </div>

                                    </div> : <div>No Drafts available</div>}
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