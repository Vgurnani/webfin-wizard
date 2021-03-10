import React from 'react'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import basicPlan from '../homepage/assets/images/mana.svg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const MultipleSlider = () =>  (
    <Carousel responsive={ responsive }>
        <div>
            <div className="plan-detail">
                <div className="plan-detail-inner">
                    <div className="plan-img">
                        <img src={ basicPlan } alt="Basic Plan" />
                    </div>
                    <h4 className="plan-name">Wizrd</h4>
                    <ul className="plan-feature">
                        <li>Get a beautiful blog in seconds!</li>
                        <li>1 Website + 1 Custom Sub-Domain</li>
                        <li>1,000 Views / Month</li>
                        <li>1 user</li>
                        <li>100 MB of space </li>
                        <li>2 Blog posts / Month </li>
                        <li>No credit card required </li>
                    </ul>
                    <div className="plan-price">Free</div>
                    <div className="plan-action">
                        <button className="btn btn-secondary">Try Now</button>
                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="plan-detail">
                <div className="plan-detail-inner">
                    <div className="plan-img">
                        <img src={ basicPlan } alt="Basic Plan" />
                    </div>
                    <h4 className="plan-name">Wizrd</h4>
                    <ul className="plan-feature">
                        <li>Get a beautiful blog in seconds!</li>
                        <li>1 Website + 1 Custom Sub-Domain</li>
                        <li>1,000 Views / Month</li>
                        <li>1 user</li>
                        <li>100 MB of space </li>
                        <li>2 Blog posts / Month </li>
                        <li>No credit card required </li>
                    </ul>
                    <div className="plan-price">Free</div>
                    <div className="plan-action">
                        <button className="btn btn-secondary">Try Now</button>
                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="plan-detail">
                <div className="plan-detail-inner">
                    <div className="plan-img">
                        <img src={ basicPlan } alt="Basic Plan" />
                    </div>
                    <h4 className="plan-name">Wizrd</h4>
                    <ul className="plan-feature">
                        <li>Get a beautiful blog in seconds!</li>
                        <li>1 Website + 1 Custom Sub-Domain</li>
                        <li>1,000 Views / Month</li>
                        <li>1 user</li>
                        <li>100 MB of space </li>
                        <li>2 Blog posts / Month </li>
                        <li>No credit card required </li>
                    </ul>
                    <div className="plan-price">Free</div>
                    <div className="plan-action">
                        <button className="btn btn-secondary">Try Now</button>
                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="plan-detail">
                <div className="plan-detail-inner">
                    <div className="plan-img">
                        <img src={ basicPlan } alt="Basic Plan" />
                    </div>
                    <h4 className="plan-name">Wizrd</h4>
                    <ul className="plan-feature">
                        <li>Get a beautiful blog in seconds!</li>
                        <li>1 Website + 1 Custom Sub-Domain</li>
                        <li>1,000 Views / Month</li>
                        <li>1 user</li>
                        <li>100 MB of space </li>
                        <li>2 Blog posts / Month </li>
                        <li>No credit card required </li>
                    </ul>
                    <div className="plan-price">Free</div>
                    <div className="plan-action">
                        <button className="btn btn-secondary">Try Now</button>
                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="plan-detail">
                <div className="plan-detail-inner">
                    <div className="plan-img">
                        <img src={ basicPlan } alt="Basic Plan" />
                    </div>
                    <h4 className="plan-name">Wizrd</h4>
                    <ul className="plan-feature">
                        <li>Get a beautiful blog in seconds!</li>
                        <li>1 Website + 1 Custom Sub-Domain</li>
                        <li>1,000 Views / Month</li>
                        <li>1 user</li>
                        <li>100 MB of space </li>
                        <li>2 Blog posts / Month </li>
                        <li>No credit card required </li>
                    </ul>
                    <div className="plan-price">Free</div>
                    <div className="plan-action">
                        <button className="btn btn-secondary">Try Now</button>
                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                    </div>
                </div>
            </div>
        </div>
    </Carousel>
)

export default MultipleSlider
