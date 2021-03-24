import React,{ useState ,useEffect , useCallback } from 'react'
import SocialMedia from './socialMedia'
import PropTypes  from 'prop-types'
import { createSocialMedia } from 'middleware/blog'
import { useDispatch , useSelector } from 'react-redux';
import { Field ,reduxForm, reset ,stopAsyncValidation } from 'redux-form';
import { renderTextArea, renderFieldChangeWG } from 'utils/formUtils';
import { SOCIAL_MEDIA } from 'constants/app'
import asyncValidate  from 'utils/asyncValidate';
import UploadImageModal from 'components/assessment/shared/UploadImageModal';
import { change as reduxChange } from 'redux-form';
import ButtonLoader from 'components/core/loader/button-loader'
import _ from 'lodash'
import{
    Button,
    Col,
    Row,
    Form
}from 'react-bootstrap';
import {
    TopRightArrow,
} from 'utils/svg'
import { getUnsplash } from 'middleware/assessments';
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

export const UserName =(props) => {
    const dispatch  = useDispatch()
    // eslint-disable-next-line react/prop-types
    const { handleSubmit, setUsernameEdit , initialize } = props
    const [ asyncLoad, setAsyncLoad ] =  useState(false)
    const selectorData = useSelector(state => state.user.sessionData?.data?.data)
    const user =  selectorData?.user
    const submitData = (data) => {
        dispatch(updateCurrentUser(data))
        setUsernameEdit(false)
    }
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        initialize({ userName: user?.userName })
        return () => {
            dispatch(reset('userProfileForm'))
        }
    },[ user ])
    const cancelFun = () => {
        // eslint-disable-next-line react/prop-types
        initialize({ userName: user?.userName })
        setUsernameEdit(false)
    }
    const handleChange = (value) => {
        if(value){
            setAsyncLoad(true)
            asyncValidate(value).then((result) => {
                !result ? dispatch(stopAsyncValidation('userProfileForm', { userName: 'That username is taken' })) : null
                setAsyncLoad(false)
            })
        }
    }
    const asyncValidateFunc = _.debounce(handleChange, 800);
    const asyncChangeCallback = useCallback(asyncValidateFunc, []);
    return(
        <Form onSubmit={ handleSubmit(submitData) }>
            <Field
                name="userName"
                label=""
                // eslint-disable-next-line react/prop-types
                defaultValue={ user?.userName }
                handleChange={ asyncChangeCallback }
                component={ renderFieldChangeWG }
                maxLength="150"
                withoutTouch={ true }
                placeholder='Enter your Username'
            />
            { asyncLoad && <div className="small-up-loader">
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div> }
            <Button variant='primary' type='submit'>Update</Button>
            <a href='#' onClick={ () => cancelFun() }>cancel</a>
        </Form>
    )
}

const UserProfile = (props) =>{
    // eslint-disable-next-line react/prop-types
    const { setProfileModal, profileModal } = props
    const dispatch = useDispatch();
    const userProfileForm = useSelector((state)=>state.form.userProfileForm);
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const userProfileLoading = useSelector((state) => state.user.userProfileLoading )
    const handleToggleModal = () => {
        setProfileModal(!profileModal)
    }
    const submitData = ( ) => {
        dispatch(updateCurrentUser({ profileImageUrl: userProfileForm?.values?.profileImageUrl }))
    }

    const clearImage = () => {
        dispatch(reduxChange('userProfileForm', 'profileImageUrl', null))
    }

    const getBase64 = (base64) => {
        dispatch(reduxChange('userProfileForm', 'profileImageUrl', base64))
    }

    const handleSearch = (event) => {
        const query = event.target.value || 'cat'
        dispatch(getUnsplash('/photos',query))
    }
    useEffect(() => {
        if(!userProfileLoading){
            setProfileModal(false)
        }

    },[ userProfileLoading ])

    return(
        <Form onSubmit={ ()  => {} }>
            <UploadImageModal
                fieldName={ 'profileImageUrl' }
                clearImage={ clearImage }
                previewFile={ userProfileForm?.values?.profileImageUrl }
                getBase64={ getBase64 }
                handleSearch={ handleSearch }
                unsplashImages={ unsplashImages }
                openModal={ profileModal }
                submitData={ submitData }
                handleToggleModal={ handleToggleModal }
            >
                <ButtonLoader
                    button={ <Button onClick={ () => submitData() } variant="primary">confirm</Button> }
                    loadButton= {
                        <Button disabled={ true } type='button' variant="primary">saving..</Button>
                    }
                    loading={ userProfileLoading }

                />
            </UploadImageModal>
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
    const [ usernameEdit, setUsernameEdit ] = useState(false)
    const selectorData = useSelector(state => state.user.sessionData?.data?.data)
    const user =  selectorData?.user
    const [ profileModal, setProfileModal ] = useState(false )

    const connectData = (values) => {
        if(!Object.values(errors).includes(true)){
            dispatch(createSocialMedia(site.id,{ socialMediaLinks: values }, setOpenModal))
        }
    }
    const openEditFunc = () => {
        setEditable(true)
    }
    const openUsernameFunc = () => {
        setUsernameEdit(true)
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
                            <div className='row'>
                                <div className="author-img" onClick={ () => setProfileModal(!profileModal) }>
                                    <img src={ user?.profileImageUrl || profilePic } alt="Jason Miller" />
                                </div>
                                <UserProfile setProfileModal={ setProfileModal } profileModal={ profileModal } />
                                <div className="author-name  col-md-9" >
                                    {
                                        usernameEdit ? <UserName setUsernameEdit={ setUsernameEdit } { ...props }  /> : <><h5>{user?.userName?.toUsername() } </h5><a href='#' onClick={ openUsernameFunc } >Edit</a></>
                                    }
                                </div>
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
String.prototype.toUsername = function(){
    return this?.split('@') && this?.split('@')[ 0 ];
}
export default reduxForm({
    form: 'userProfileForm',
})(Dashboard);