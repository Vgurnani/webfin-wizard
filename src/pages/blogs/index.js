/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import ConfirmAlert from 'components/core/confirm-alert'
import { confirmAlert } from 'react-confirm-alert';
import Pagination from 'react-js-pagination';
import { absoluteValue } from 'utils/helpers'
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
import { BLOG_STATUS } from 'constants/app'
import { getDynamicURL } from '../../services/api';
import {
    OpenArrow,
    EditBlogListIcon,
    CloneBlogListIcon,
    ShareBlogListIcon,
    ViewsBlogListIcon,
    CommentsBlogListIcon,
    DeleteBlogListIcon,
    SortBlogIcon,
    DateBlogListIcon,
    ChevronRight,
    MobileHomeIcon,
    MobileSAddNewIcon,
    MobileSearchIcon,
} from '../../utils/svg';
import { getSessionData } from 'utils/helpers'
import searchIcon from '../../images/search.png';
import 'react-confirm-alert/src/react-confirm-alert.css';
const searchInput = React.createRef()
const BlogsPage = () => {

    const limit = 6;
    const dispatch = useDispatch();
    const history = useHistory();
    const [ sortToggle, setSortToggle ] = useState(false);
    const [ activePagePublish, setActivePagePublish ] = useState(0);
    const [ activeBlogs, setActiveBlogs ] = useState([]);
    const [ copySuccess, setCopySuccess ] = useState('');
    const [ activePageDraft, setActivePageDraft ] = useState(0)
    const publishBlogs = useSelector(state => state.blog.publishBlogs)
    const publishMetaData = useSelector(state => state.blog.publishMetaData)
    const draftBlogs = useSelector(state => state.blog.draftBlogs)
    const draftMetaData = useSelector(state => state.blog.draftMetaData)
    const data = useSelector(state => state.user.sessionData?.data?.data) || getSessionData();
    const [ sortPublish, setSortPublish ] = useState({ title: 'desc', createdAt: 'desc' })
    const [ sortDraft, setSortDraft ] = useState({ title: 'desc', createdAt: 'desc' })

    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'blog'
        })
        //dispatch(allBlogsCount())
        dispatch(getDraftBlogs(`page=${ activePageDraft }&size=${ limit }`));
        dispatch(getPublishedBlogs(`page=${ activePagePublish }&size=${ limit }`));
    }, [ dispatch ]);

    const handleFilter = () => {
        // const filterData = `_where[title_contains]=${ filter }&_limit=${ limit }`
        // dispatch(getDraftBlogs(filterData));
        // dispatch(getPublishedBlogs(filterData));
        // setActivePagePublish(1)
        // setActivePageDraft(1)

    }

    const handleEdit = (event, blog) => {
        event.preventDefault();
        const route = getDynamicURL(ROUTES.EDIT_BLOG, { id: blog.slug });
        history.push(route)
    }
    const handleClone = (event, blog) => {
        event.preventDefault();
        dispatch(getBlogById(blog.slug))
        history.push(ROUTES.BLOG)
    }

    const handlePageChangePublish = (pageNumber) => {
        const args = `page=${ pageNumber - 1 }&size=${ limit }`
        dispatch(getPublishedBlogs(args));
        setActivePagePublish(pageNumber);
    }
    const handlePageChangeDraft= (pageNumber) => {
        const startWith = (pageNumber - 1) * limit
        const args = `_start=${ startWith }&_limit=${ limit }`
        dispatch(getDraftBlogs(args));
        setActivePageDraft(pageNumber - 1);
    }

    const handleDelete = (event, blog) => {
        event.preventDefault();
        const countPublish = blog.status == BLOG_STATUS.PUBLISHED && publishBlogs.length === 1 ? activePagePublish - 1 : activePagePublish
        const publishArgs = `page=${ absoluteValue(countPublish) }&size=${ limit }`
        const countDraft = blog.status == BLOG_STATUS.DRAFT && draftBlogs.length === 1 ? activePageDraft - 1 : activePageDraft
        const draftArgs = `page=${ absoluteValue(countDraft) }&size=${ limit }`

        confirmAlert({
            // eslint-disable-next-line react/display-name
            customUI: ({ onClose }) => {
                return(
                    <ConfirmAlert key={ 'box' } onClose={ onClose } handleAction={ () => dispatch(deleteBlog(blog.slug,draftArgs,publishArgs)) } />
                );
            }
        });
    }

    const handlePublish = (event, blog ) => {
        event.preventDefault()
        const publishPage = !event.target.checked && publishBlogs.length === 1 ? activePagePublish - 1 : activePagePublish
        const publishArgs = `page=${ absoluteValue(publishPage) }&size=${ limit }`
        const draftPage = event.target.checked && draftBlogs.length === 1 ? activePageDraft - 1 : activePageDraft
        const draftArgs = `page=${ absoluteValue(draftPage) }&size=${ limit }`
        dispatch(callPublish(blog.slug,event.target.checked, publishArgs , draftArgs))
    }

    const redirectToBlog = (event,blog) => {
        event.preventDefault();
        window.open(
            `https://${ data.sites[ 0 ].domain }/blog/${ blog.slug }`,
            '_blank'
        );
    }

    const sortData = (type,blogType) => {
        if(BLOG_STATUS.PUBLISHED === blogType ){
            sortPublish[ type ] = sortPublish[ type ] === 'asc' ? 'desc' : 'asc'
            setSortPublish(sortPublish)

        }else{
            sortDraft[ type ] = sortDraft[ type ] === 'asc' ? 'desc' : 'asc'
            setSortDraft(sortDraft)
        }
        const args = `page=${ blogType === BLOG_STATUS.PUBLISHED ? activePagePublish : activePageDraft }&size=${ limit }&sort=${ type },${ BLOG_STATUS.PUBLISHED ? sortPublish[ type ] : sortDraft[ type ] }`
        blogType === BLOG_STATUS.PUBLISHED ?  dispatch(getPublishedBlogs(args)) : dispatch(getDraftBlogs(args));

    }
    const sortDataMobile = ( type, order ) => {
        sortPublish[ type ] = order
        sortDraft[ type ] = order
        setSortPublish(sortPublish)
        setSortDraft(sortDraft)
        const publishArgs = `page=${ activePagePublish }&size=${ limit }&sort=${ type },${ order }`
        const draftArgs = `page=${ activePageDraft }&size=${ limit }&sort=${ type },${ order }`
        dispatch(getPublishedBlogs(publishArgs))
        dispatch(getDraftBlogs(draftArgs))
        setSortToggle(!sortToggle)
    }

    const copyToClipBoard = (event, blog) => {
        event.preventDefault();
        navigator.clipboard.writeText(`https://${ data.sites[ 0 ].domain }/blog/${ blog.slug }`)
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 1000);
    };

    const toggleActiveBlogs = (id) => {
        const blogsData = [ ...activeBlogs ];
        if (blogsData.includes(id)) {
            delete blogsData[ blogsData.indexOf(id) ];
        } else {
            blogsData.push(id)
        }
        setActiveBlogs(blogsData);
    }

    const toggleSearch = () => {
        searchInput?.current?.focus()
    }

    return(
        <main className="dashboard-data blog-dashboard">
            <section className="dashboard-body" style={ { marginTop: '12px' } }>
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Posts</h1>
                        <div className="dashboard-body-actions">

                            <Link to={ ROUTES.BLOG } className='btn btn-primary add-new-blog'>Add New+</Link>
                            <Link to='#' onClick={ () => setSortToggle(!sortToggle) } className='btn btn-primary sort-blogs'>
                                <SortBlogIcon />
                                Sort By
                            </Link>
                            {
                                sortToggle && <ul className='wrap-drop drop'>
                                    <li  onClick={ () => sortDataMobile('title','asc') }><a>Title -asc</a></li>
                                    <li onClick={ () => sortDataMobile('createdAt','asc') } ><a>Created At -asc</a></li>
                                    <li onClick={ () => sortDataMobile('title','desc') }><a>Title -desc</a></li>
                                    <li className={ sortPublish[ 'createdAt' ] === 'desc' ? 'active' : '' } onClick={ () => sortDataMobile('createdAt','desc') }><a>Created At -desc</a></li>
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="dashboard-actions">
                        <Form className="search-form">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control ref={ searchInput } onChange={ () => {} }  className="form-control" placeholder="Search" />
                            </Form.Group>
                            <Button onClick={ handleFilter } className="btn-search" type="button">
                                <img src={ searchIcon } alt={ 'searchIcon' } />
                            </Button>
                        </Form>
                    </div>
                </div>
                <div>{copySuccess}</div>
                <div className="blog-custom-list-table">
                    <div className="blog-custom-list">
                        <div className="blog-list-header">
                            <div className="blog-list-column blog-list-live" >
                                Live
                            </div>
                            <div className={ `blog-list-column blog-list-title ${ sortPublish[ 'title' ] ==='desc' ?  'headerSortDown': 'headerSortUp' }` } onClick={ () => sortData('title',BLOG_STATUS.PUBLISHED) }>
                                Title
                            </div>
                            <div className={ `blog-list-column blog-list-date ${ sortPublish[ 'createdAt' ] ==='desc' ?  'headerSortDown': 'headerSortUp' }` } onClick={ () => sortData('createdAt',BLOG_STATUS.PUBLISHED) } >
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
                            {publishBlogs?.map((blog, index) => (<div className={ (activeBlogs?.includes(blog?.id) ? 'active ' : '') + 'blog-list-table blog-list-publish blog-list-header' } key={ blog?.slug }>
                                <div className="blog-list-column blog-list-live" key={ index }>
                                    <Form.Check
                                        type="switch"
                                        id={ 'custom-switch-'+blog.id  }
                                        label=""
                                        onChange={ (e) => handlePublish(e, blog) }
                                        checked={  blog.status === BLOG_STATUS.PUBLISHED }
                                    />
                                </div>
                                <div className="blog-list-column blog-list-title">
                                    <span className="table-post-title">
                                        {blog?.title}
                                        <a onClick={ (event) => redirectToBlog(event, blog) }>View</a>
                                        <a onClick={ () => toggleActiveBlogs(blog?.id) } className="toggle-blog-detail">
                                            <ChevronRight />
                                        </a>
                                    </span>
                                </div>
                                <div className="blog-list-column blog-list-date">
                                    <DateBlogListIcon />
                                    <span> { blog.createdAt && moment(blog.createdAt).format('L')}</span>
                                </div>
                                <div className="blog-list-column blog-list-views">
                                    <ViewsBlogListIcon />
                                    <span>70,365</span>
                                </div>
                                <div className="blog-list-column blog-list-comments">
                                    <CommentsBlogListIcon />
                                    <span>32</span>
                                </div>
                                <div className="blog-list-column blog-list-actions  blog-list-delete">
                                    <div className="hover-actions">
                                        <a onClick={ (e) => handleEdit(e, blog) } className="table-action-btns" href="/#">
                                            <EditBlogListIcon />
                                            <span>Edit</span>
                                        </a>
                                        <a onClick={ (e) => handleClone(e, blog) } className="table-action-btns active" href="/#">
                                            <CloneBlogListIcon />
                                            <span>Clone</span>
                                        </a>
                                        <a className='table-action-btns' href="/#" onClick={ (e) => copyToClipBoard(e, blog) }>
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
                            <div className='blogs-pagination'>
                                { limit  < publishMetaData?.count && <Pagination
                                    activePage={ activePagePublish }
                                    itemsCountPerPage={ limit  }
                                    totalItemsCount={ publishMetaData?.count }
                                    pageRangeDisplayed={ 5 }
                                    onChange={ handlePageChangePublish }
                                />
                                }
                            </div>
                        </div> : <div className="blog-list-table blog-list-header no-post">No Posts available</div>}
                    </div>
                </div>

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
                                                <div className={ `blog-list-column blog-list-title ${ sortDraft[ 'title' ] ==='desc' ?  'headerSortDown': 'headerSortUp' }` } onClick={ () => sortData('title',BLOG_STATUS.DRAFT) }>
                                                    Title
                                                </div>
                                                <div className={ `blog-list-column blog-list-date ${ sortDraft[ 'createdAt' ] ==='desc' ?  'headerSortDown': 'headerSortUp' }` }  onClick={ () => sortData('createdAt',BLOG_STATUS.DRAFT) }>
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
                                                {draftBlogs?.map((blog, index) => (<div className={ (activeBlogs?.includes(blog?.id) ? 'active ' : '') + 'blog-list-table blog-list-publish blog-list-header' } key={ blog?.slug }>
                                                    <div className="blog-list-column blog-list-live" key={ index }>
                                                        <Form.Check
                                                            type="switch"
                                                            id={ 'custom-switch-'+blog.id  }
                                                            label=""
                                                            onChange={ (e) => handlePublish(e, blog) }
                                                            checked={ blog.status !== 'DRAFT' }
                                                        />
                                                    </div>
                                                    <div className="blog-list-column blog-list-title">
                                                        <span className="table-post-title">
                                                            {blog?.title}
                                                            {/* <a onClick={ (event) => redirectToBlog(event, blog) }>View</a> */}
                                                            <a onClick={ () => toggleActiveBlogs(blog?.id) } className="toggle-blog-detail">
                                                                <ChevronRight />
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <div className="blog-list-column blog-list-date">
                                                        <DateBlogListIcon />
                                                        <span> { blog.createdAt && moment(blog.createdAt).format('L')}</span>
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
                                                            {/* <a className="table-action-btns" href="/#" onClick={ (e) => copyToClipBoard(e, blog) }>
                                                                <ShareBlogListIcon />
                                                                <span>Share</span>
                                                            </a> */}
                                                        </div>
                                                        <a onClick={ (e) => handleDelete(e, blog) } className="table-action-btns table-action-btns-delete" href="/#">
                                                            <DeleteBlogListIcon />
                                                        </a>
                                                    </div>
                                                </div>)
                                                )}
                                                { limit < draftMetaData?.count && <Pagination
                                                    activePage={ activePageDraft }
                                                    itemsCountPerPage={ limit }
                                                    totalItemsCount={ draftMetaData?.count }
                                                    pageRangeDisplayed={ 5 }
                                                    onChange={ handlePageChangeDraft }
                                                />
                                                }
                                            </div> : <div className="blog-list-table blog-list-header no-post">No Drafts available</div>}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
                <div className="blog-mobile-action">
                    <ul>
                        <li>
                            <Link to={ ROUTES.DASHBOARD }>
                                <MobileHomeIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to={ ROUTES.BLOG }>
                                <MobileSAddNewIcon />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={ toggleSearch }>
                                <MobileSearchIcon />
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </main>

    )
}

export default BlogsPage