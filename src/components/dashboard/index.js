import React,{ useState , useEffect } from 'react'
import SocialMedia from './socialMedia'
import PropTypes  from 'prop-types'
import { createSocialMedia, getSocialMedia } from 'middleware/blog'
import { useDispatch , useSelector } from 'react-redux';
import{
    Button,
}from 'react-bootstrap';
const Dashboard =(props) => {
    const { site } = props
    const dispatch = useDispatch()
    const connecting = useSelector((state) => state.blog.connecting)
    const socialMediaLinks = useSelector((state) => state.blog.socialMediaLinks)
    const [ openModal ,setOpenModal ] = useState(false)
    useEffect(() => {
        if(site){
            dispatch(getSocialMedia())
        }
    },[ site ])

    const connectData = (values) => {
        const data = {
            type:'social-media-links',
            content: values,
            imageUrl: 'https://static.helpjuice.com/helpjuice_production/uploads/upload/image/2747/125355/social_media_icons.jpg',
            title: 'Social Media Links',
            slug: 'social-media-links'
        }
        dispatch(createSocialMedia(data, setOpenModal))
    }
    return(
        <div className="blog-dashboard-data">
            <div className="blog-dashboard-report">
                <div className="data-box">
                    <div className="data-box-title">
                        <h3>Next steps</h3>
                    </div>
                    <ul className="blog-dashboard-steps">
                        <li>
                            <h4>1. Connect Social</h4>
                            <Button onClick={ () => { setOpenModal(!openModal)} }>connect</Button>
                            <SocialMedia socialMediaLinks={ socialMediaLinks } connecting={ connecting } connectData={ connectData } openModal={ openModal } setOpenModal={ setOpenModal } />
                        </li>
                        <li>
                            <h4>2. Try Blog Trends </h4>
                            <Button>connect</Button>
                        </li>
                        <li>
                            <h4>1. Connect Social</h4>
                            <Button>connect</Button>
                        </li>
                    </ul>
                </div>
                <div className="data-box">
                    <div className="data-box-title">
                        <h3>Email Marketing</h3>
                    </div>
                    <ul className="dashboard-reports-percent">
                        <li>
                            <h4>10</h4>
                            <span>Weekly Sign-ups</span>
                        </li>
                        <li>
                            <h4>12%</h4>
                            <span>Conversion rate</span>
                        </li>
                        <li>
                            <h4>80</h4>
                            <span>Total Subscribers</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blog-dashboard-graph">
                <div className="data-box">
                    <div className="data-box-title">
                        <h3>Site Analytics</h3>

                    </div>
                    <ul className="dashboard-reports-percent">
                        <li>
                            <h4>10</h4>
                            <span>Views</span>
                        </li>
                        <li>
                            <h4>6</h4>
                            <span>Visits</span>
                        </li>
                        <li>
                            <h4>8m 30s</h4>
                            <span>Avg Session</span>
                        </li>
                        <li>
                            <h4>25%</h4>
                            <span>Bounce rate</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    site: PropTypes.object
}

export default Dashboard