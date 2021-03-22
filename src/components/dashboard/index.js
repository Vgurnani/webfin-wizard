import React,{ useState ,useEffect  } from 'react'
import { Link } from 'react-router-dom'
import SocialMedia from './socialMedia'
import PropTypes  from 'prop-types'
import { createSocialMedia } from 'middleware/blog'
import { useDispatch , useSelector } from 'react-redux';
import { Field ,reduxForm, reset  } from 'redux-form';
import { renderTextArea } from 'utils/formUtils';
import { SOCIAL_MEDIA } from 'constants/app'
import{
    Button,
    Col,
    Row,
    Form
}from 'react-bootstrap';
import history from 'utils/history'
import {
    TopRightArrow,
} from 'utils/svg'
import profilePic from 'images/user-avatar.png';
import { updateCurrentUser } from 'middleware/auth'
export const AuthorDescription =(props) => {
    const dispatch  = useDispatch()
    // eslint-disable-next-line react/prop-types
    const { handleSubmit, setEditable , initialize } = props
    const selectorData = useSelector(state => state.user.sessionData?.data?.data)
    const user =  selectorData?.user
    const submitData = (data) => {
        dispatch(updateCurrentUser(data))
        setEditable(false)
    }
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        initialize({ authorDescription: user?.authorDescription })
        return () => {
            dispatch(reset('userProfileForm'))
        }
    },[ user ])
    const cancelFun = () => {
        // eslint-disable-next-line react/prop-types
        initialize({ authorDescription: user?.authorDescription })
        setEditable(false)
    }
    return(
        <Form onSubmit={ handleSubmit(submitData) }>
            <Field
                name="authorDescription"
                label=""
                // eslint-disable-next-line react/prop-types
                defaultValue={ user?.authorDescription }
                component={ renderTextArea }
                maxLength="150"
                placeholder='Enter your description'
            />
            <Button variant='primary' type='submit'>Update</Button>
            <a href='#' onClick={ () => cancelFun() }>cancel</a>
        </Form>
    )
}
const Dashboard =(props) => {
    const { site, status } = props
    const dispatch = useDispatch()
    const [ errors, setErrors ] = useState({})
    const connecting = useSelector((state) => state.blog.connecting)
    const [ openModal ,setOpenModal ] = useState(false)
    const [ editable, setEditable ] = useState(false)
    const selectorData = useSelector(state => state.user.sessionData?.data?.data)
    const user =  selectorData?.user

    const connectData = (values) => {
        if(!Object.values(errors).includes(true)){
            dispatch(createSocialMedia(site.id,{ socialMediaLinks: values }, setOpenModal))
        }
    }
    const openEditFunc = () => {
        setEditable(true)
    }
    return(
        <Col md='12'>
            <Row>
                <div className='col-md-7'>
                    <div className="dashboard-header">
                        <div className="dashboard-title">
                            <h1>{ site?.websiteName } <a>Edit</a></h1>
                            <h5>
                                Domain:
                                <a href={ `https://${ site?.domain }` } rel="noreferrer" target='_blank' className={ `${ status ? 'success' : 'in-progress' }` }>
                                    { site?.domain } <TopRightArrow />
                                </a>

                                {/* <span className={ `${ status ? 'success' : 'in-progress' }` }> -
                                {status ? 'Done' : 'In Progress'}
                            </span> */}
                            </h5>
                            {/*<div className="dashboard-btns">
                            <a href={ `https://${ site?.domain }` } rel="noreferrer" target='_blank' className="btn btn-primary">View Website</a>
                        </div>*/}
                        </div>
                        <div className="blog-dashboard-report">
                            <div className="data-box">
                                <div className="data-box-title">
                                    <h3>Next steps</h3>
                                </div>
                                <ul className="blog-dashboard-steps">
                                    <li>
                                        <h4>1. Connect Social</h4>
                                        <Button onClick={ () => { setOpenModal(!openModal)} }>connect</Button>
                                        <SocialMedia errors={ errors } setErrors={ setErrors }  socialMediaLinks={ site?.socialMediaLinks || {} } connecting={ connecting } connectData={ connectData } openModal={ openModal } setOpenModal={ setOpenModal } />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog-dashboard-data col-md-5">

                    <div className="dashboard-header data-box">
                        { user && <div className="author-info" >
                            <div className="author-img" onClick={ () => history.push('/user-profile') }>
                                <img src={ user?.profileImageUrl || profilePic } alt="Jason Miller" />
                            </div>
                            <div className="author-name" onClick={ () => history.push('/user-profile') }>
                                <h5>{user?.firstName } { user?.lastName } </h5>
                                <Link to={ '/user-profile' } >Edit</Link>
                            </div>
                            <hr/>
                            <div className='about'>
                                <h6>About</h6>
                                {editable ? <AuthorDescription setEditable={ setEditable } { ...props } /> : <>
                                    <p>{ user?.authorDescription }</p>
                                    <a href='#' onClick={ openEditFunc } >Edit</a>
                                </>
                                }
                            </div>
                            <hr/>
                            <div className='connect-social'>
                                <h6>connect your social media accounts</h6>
                                {site.socialMediaLinks && Object.keys(site.socialMediaLinks).map((item) => {
                                    return(
                                        <>
                                            <a href={ site.socialMediaLinks[ item ] } dangerouslySetInnerHTML={ { __html: SOCIAL_MEDIA.filter((icon)=> icon.value === item)[ 0 ]?.imgUrl } } />
                                        </>)
                                })}
                                <a href='#' onClick={ () => { setOpenModal(!openModal)} } >+</a>
                            </div>
                        </div> }
                    </div>
                </div>
            </Row>
        </Col>
    )
}

Dashboard.propTypes = {
    site: PropTypes.object,
    initialize: PropTypes.object,
    user: PropTypes.object,
    status: PropTypes.bool
}
AuthorDescription.PropTypes = {
    handleSubmit:  PropTypes.func,
    setEditable:  PropTypes.func
}

export default reduxForm({
    form: 'userProfileForm',
})(Dashboard);