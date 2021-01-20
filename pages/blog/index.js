import React from 'react';
import RichTextEditor from './rte';
import  Link from 'next/link'
import { 
  DashboardMenuIcon,
  EditSiteMenuIcon,
  BlogMenuIcon,
  MarketingMenuIcon,
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  Instagram
} from '../../utils/svg'

import { 
  Form, 
  Row,
  ProgressBar, 
} from 'react-bootstrap';
import profilePic from '../../public/images/media/media-1.jpg';

const BlogPage =(props) => {

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

    return(
      <section className="dashboard-wrapper">
        <aside className="dashboard-menu">
          <ul>
            <li>
              <a href="/">
              Dashboard
                <DashboardMenuIcon />
              </a>
            </li>
            <li>
              <a href="/">
              Edit Site
                <EditSiteMenuIcon />
              </a>
            </li>
            <li>
              <a href="/">
              Blog
                <BlogMenuIcon />
              </a>
            </li>
            <li>
              <a href="/">
              Marketing
                <MarketingMenuIcon />
              </a>
            </li>
          </ul>
        </aside>
        <main className="dashboard-data">
          <section className="dashboard-body">
            <div className="blog-creation">
              <Form>  
                <div className="blog-creation-head">
                  <div className="blog-creation-head-left">
                  <Form.Group className="blog-title-group">
                        <Form.Control  placeholder='Blog post title'/>
                        <Form.Text>
                        March 25, 2020 / 4 min read / Author Name
                        </Form.Text>
                    </Form.Group>
                    <div className="upload-feature-img-wrap">
                    <div className="upload-feature-img">
                      Click here to edit feature image
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
                          <span>Jason Miller</span>
                          <a>+ Add Jason</a>
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
                  <RichTextEditor readOnly={false} initialValue={initialValue} />
                  </div>
                </div>
              </Form>
            </div>
          </section>
        </main>
      </section>
    )
}

export default BlogPage;