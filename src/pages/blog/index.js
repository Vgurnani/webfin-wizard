import React, { useState, useEffect } from 'react';
import RichTextEditor from './rte';
import { Link } from 'react-router-dom'
import { Field, change } from 'redux-form';
import { renderFieldWG } from '../../utils/formUtils'
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
} from '../../utils/svg'

import {
  Form,
  Row,
  Col,
  ProgressBar,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../middleware/auth'
import { createBlog ,callPublish } from '../../middleware/blog';
import { getUnsplash} from '../../middleware/assessments'
import { change as reduxChange } from 'redux-form'
import { blogValidate as validate } from '../../utils/validates';
import profilePic from '../../public/images/media/media-4.jpg';
import media1 from '../../public/images/media/media-1.jpg';
import media2 from '../../public/images/media/media-2.jpg';
import media3 from '../../public/images/media/media-3.jpg';
import UploadImageModal from '../../components/assessment/shared/UploadImageModal'
const BlogPage =(props) => {
  const dispatch = useDispatch();
  const [ openModal, setModalOpen ]  = useState(false);
  const blogForm = useSelector((state)=>state.form.blogForm)
  const userData = useSelector(state => state.user.sessionData?.data?.data)
  const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
  const isReadyPublish = useSelector((state) => state.blog.isReadyPublish)
  const initialValue = [
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text:
            ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Try it out for yourself!' }],
    },
  ]

  const [rteData, setRTEData] = useState(initialValue)
  const { handleSubmit } = props;

  const submitData = (formData) => {
    //formData['image'] = formData.blogUrl
    const data = {
      type:"blog",
      content: formData.data,
      imageUrl: formData.blogUrl,
      title: formData.title
    }
    dispatch(createBlog(data))
  }

    useEffect(()=>{
      const query = 'blogs'
      dispatch(getUnsplash('/photos',query))
      dispatch(getCurrentUser())
    },[])


  const handleRTEdata = (data) =>{
    dispatch(change('blogForm', 'data', data))
    setRTEData(data)
  }
  const handleToggleModal = () => {
    setModalOpen(!openModal)
  }
  const handleSearch = (event) => {
	  const query = event.currentTarget.value || 'cat'
		dispatch(getUnsplash('/photos',query))
	}

	const getBase64 = (base64) => {
		dispatch(reduxChange('blogForm', 'blogUrl', base64))
	}

	const clearImage = () => {
		dispatch(reduxChange('blogForm', 'blogUrl', null))
	}


    return(
      <section className="dashboard-wrapper">
        <aside className="dashboard-menu">
        <ul>
            <li >
              <Link to="/dashboard">
              Dashboard
                <DashboardMenuIcon />
              </Link>
            </li>
            <li className="active">
              <Link to="/blog">
              Blog
                <BlogMenuIcon />
              </Link>
            </li>
            <li>
              <Link to="#">
              Test
                <DashboardMenuIcon />
              </Link>
            </li>
            <li>
              <Link to="#">
              Test
                <DashboardMenuIcon />
              </Link>
            </li>
            <li>
              <Link to="#">
              Test
                <DashboardMenuIcon />
              </Link>
            </li>
            <li>
              <Link to="#">
              Test
                <DashboardMenuIcon />
              </Link>
            </li>
          </ul>
        </aside>
        <main className="dashboard-data">
          <section className="dashboard-body">
            <div className="blog-creation">
              <Form onSubmit={handleSubmit(submitData)}>
                <div className="blog-creation-head">
                  <div className="blog-creation-head-left">
                    <Form.Group className="blog-title-group">
                        <Field
                              name="title"
                              component={ renderFieldWG }
                              placeholder={ 'Blog post title' }
                            />
                        <Form.Text>
                          March 25, 2020 / 4 min read / Author Name
                        </Form.Text>
                    </Form.Group>
                    <div className="upload-feature-img-wrap">
                    <div className="upload-feature-img" onClick={handleToggleModal}>
                      {blogForm?.values?.blogUrl ? <img src={blogForm?.values?.blogUrl} /> : 'Click here to edit feature image'}
                      </div>
                    </div>
                  </div>
                  <div className="blog-creation-author-box">
                    <h5>Author Box</h5>
                    <div className="author-info">
                      <div className="author-img">
                        <img src={profilePic} alt="Jason Miller" />
                      </div>
                      <div className="author-name">
                          <span>{userData && `${userData.user?.firstName} ${userData.user?.lastName}`}</span>
                          
                      </div>
                    </div>
                    <div className="author-bio">
                      <h6>About</h6>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <ul className="author-social-links">
                      <li className="facebook">
                        <a>
                          <Facebook />
                        </a>
                      </li>
                      <li className="linkedin">
                        <a>
                          <LinkedIn />
                        </a>
                      </li>
                      <li className="twitter">
                        <a>
                          <Twitter />
                        </a>
                      </li>
                      <li className="youtube">
                        <a>
                          <YouTube />
                        </a>
                      </li>
                      <li className="instagram">
                        <a>
                          <Instagram />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="blog-creation-content">
                  <div className="word-count">
                    <div className="word-count-progressbar">
                      <label>Word Count: </label>
                    <ProgressBar now="72" label="357/500" />
                    </div>

                  </div>
                  <div className="blog-editor">
                  <RichTextEditor readOnly={false} setRTEData={handleRTEdata} initialValue={initialValue} />
                  </div>
                </div>
               {/*
                <div className="blog-action">
                  <div className="blog-action-box">
                    <h5>
                      <span>Blog actions</span>
                      <a><CloseIcon /></a>
                    </h5>
                    <ul>
                      <li>
                        <SmallRadio />
                        <span>Save Layout</span>
                      </li>
                      <li className="active">
                      <SmallRadioChecked />
                      <span>SEO Booster</span>
                      </li>
                      <li className="active">
                        <SmallRadioChecked />
                        <span>Social Media</span>
                        <a>Edit</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="related-blog">
                  <h3>Related</h3>
                  <ul className="blog-list">
                    <li>
                      <div className="blog-box">
                        <div className="blog-img">
                          <img src={media1} alt="" />
                        </div>
                        <div className="blog-detail">

                          <div className="blog-title">
                          <h4>Top 10</h4>
                            <span className="blog-date">5h</span>
                          </div>
                          <p>It’s a small world.</p>
                          <a className="read-more">Read more</a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="blog-box">
                        <div className="blog-img">
                          <img src={media2} alt="" />
                        </div>
                        <div className="blog-detail">
                        <div className="blog-title">
                          <h4>101</h4>
                            <span className="blog-date">5h</span>
                          </div>
                          <p>It’s a small world.</p>
                          <a className="read-more">Read more</a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="blog-box">
                        <div className="blog-img">
                          <img src={media3} alt="" />
                        </div>
                        <div className="blog-detail">
                          <div className="blog-title">
                          <h4>Only for you</h4>
                            <span className="blog-date">5h</span>
                          </div>

                          <p>It’s a small world.</p>
                          <a className="read-more">Read more</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="blog-seo-booster">
                  <h3 className="seo-heading">
                    <span>SEO Booster</span>
                    <span className="icon">
                      <OpenArrow />
                    </span>
                  </h3>
                  <div className="seo-content">
                    <p><b>What’s this for?</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    <Row className="seo-form">
                      <Col className="col-6">
                        <Form.Group className="focus-keyword">
                          <Form.Label>Focus Keyword:</Form.Label>
                          <Form.Control type="text" placeholder="Keyword" />
                          <Form.Text >
                            <div className="seo-progress-bar">

                            </div>
                          <span class="primary">Too short (13/180)</span>
                          </Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Page name:</Form.Label>
                          <Form.Control type="text" placeholder="Page name" />
                          <Form.Text>

                          <div className="seo-progress-bar">
                            <span className="success">
                              Good
                            </span>
                            <div className="seo-strength">
                          <ProgressBar now="72" className="success" />
                          </div>
                          </div>
                          <span>(0/180)</span>
                          </Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>SEO Site:</Form.Label>
                          <Form.Control type="text" placeholder="Site name" />
                          <Form.Text>
                          <div className="seo-progress-bar">
                            <span className="danger">
                              Bad
                            </span>
                            <div className="seo-strength">
                          <ProgressBar now="72" className="danger" />
                          </div>
                          </div>
                          <span>(0/180)</span>
                          </Form.Text>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>SEO Description:</Form.Label>
                          <Form.Control as="textarea" placeholder="Give a relevant description to your page" />
                          <Form.Text>
                          <div className="seo-progress-bar"></div>
                          <span>(0/180)</span>
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="url-control">
                          <Form.Label>Page URL:</Form.Label>
                          <Form.Control type="url" placeholder="URL" />
                        </Form.Group>
                      </Col>
                      <Col className="col-6 seo-preview">
                        <Form.Group className="focus-keyword">
                            <Form.Label>Preview on Google:</Form.Label>
                        </Form.Group>
                        <div className="seo-meta-preview">
                          <h4>
                          Page name
                          <span className="seprator"></span>
                          Site name
                          </h4>
                          <a>http://jmason.webfin.com/blog1/blogpost</a>
                          <p>Sample Copy Text</p>
                        </div>
                        <Form.Group className="index-site-toggle">
                          <Form.Check
                             type="switch"
                             label="Let search engines index your main site pages"
                          />
                        </Form.Group> 

                        
                      </Col>
                    </Row>
                  </div>
                </div>
              */}  

              <UploadImageModal 
                fieldName={'blogUrl'} 
                clearImage={clearImage} 
                previewFile={blogForm.values?.blogUrl} 
                getBase64={getBase64} 
                handleSearch={handleSearch} 
                unsplashImages={unsplashImages} 
                openModal={openModal} 
                handleToggleModal={handleToggleModal} 
              />

              <div className="blog-btns">
                  {!isReadyPublish ? <Button type='submit' variant="primary">Save</Button> : <Button type='button' disabled={true} variant="primary">Save</Button>}
                  {isReadyPublish ? <a href='javascript:void(0)' className='btn btn-success' onClick={() => dispatch(callPublish())}>Publish</a> : 
                  <a href='javascript:void(0)' className='btn'>Publish</a>
                  }
                </div>
              
              </Form>
            </div>
          </section>
        </main>
      </section>
    )
}

BlogPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'blogForm',
  validate
})(BlogPage);
