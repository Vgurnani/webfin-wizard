import React,{ useState  } from 'react'
import SocialMedia from './socialMedia'
import PropTypes  from 'prop-types'
import { createSocialMedia } from 'middleware/blog'
import { useDispatch , useSelector } from 'react-redux';
import{
    Button,
}from 'react-bootstrap';
const Dashboard =(props) => {
    const { site } = props
    const dispatch = useDispatch()
    const [ errors, setErrors ] = useState({})
    const connecting = useSelector((state) => state.blog.connecting)
    const [ openModal ,setOpenModal ] = useState(false)

    const connectData = (values) => {
        if(!Object.values(errors).includes(true)){
            dispatch(createSocialMedia(site.id,{ socialMediaLinks: values }, setOpenModal))
        }
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
                            <SocialMedia errors={ errors } setErrors={ setErrors }  socialMediaLinks={ site?.socialMediaLinks || {} } connecting={ connecting } connectData={ connectData } openModal={ openModal } setOpenModal={ setOpenModal } />
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
                {/*
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
                */}
            </div>
            {/*
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
        */}
        </div>
    )
}

Dashboard.propTypes = {
    site: PropTypes.object
}

export default Dashboard