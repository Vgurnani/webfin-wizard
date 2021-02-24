import React, { useState } from 'react'
import PropTypes from 'prop-types';
import WebTemplates ,{ Header,Home, Banner,Blogs, Card } from 'web-templates';
import { Modal, Row, Col, Button } from 'react-bootstrap'
import ColorPicker from 'components/core/color-picker'
import { Field } from 'redux-form';
import { renderFileDrop } from 'utils/formUtils'
import blogBanner from 'images/blog-banner.png'
const CustomColor = (props) => {
    const { data, handleColorsData, backFun } = props
    const [ objColors,  setObjColors ] = useState({})
    const [ colors ,setColors ] = useState(data.colors && JSON.parse(data.colors) || { })
    const [ active,setActiveBox ] = useState('top-menu')
    // const [ loading, setLoading ] = useState(false)
    const handleChangeColor = (d) => {
        const colorsData =  Object.assign({}, colors)
        colorsData[ active ] = d.hex
        setColors(colorsData)
        setObjColors(d)
    }
    const handleChange = (event,name) => {
        const colorsData =  Object.assign({}, colors)
        colorsData[ name ] = event.target.value
        setColors(colorsData)
        setActiveBox(name)
    }
    const handleClick = (name) => {
        setActiveBox(name)
    }
    const handleRadio = (event) => {
        if(event.target.checked){
            const colorsData =  Object.assign({}, colors)
            colorsData[ event.target.name ] = event.target.value
            setColors(colorsData)
        }
    }
    const radioView = (name,value1,value2) => {
        const colorsData =  Object.assign({}, colors)
        return(<div style={ { display: 'inline-flex' } }>
            <div className="custom-radio">
                <div className="radio-item">
                    <input type="radio" onChange={ handleRadio } value={ value1 } name={ name } id={ `${ name }-black` } checked={ colorsData[ name ] === value1 } required />
                    <label className="label-icon option-black" htmlFor={ `${ name }-black` }>A</label>
                </div>
            </div>
            <div className="custom-radio">
                <div className="radio-item">
                    <input type="radio" onChange={ handleRadio } value={ value2 } name={ name } id={ `${ name }-white` } checked={ colorsData[ name ] === value2 } required />
                    <label className="label-icon option-white" htmlFor={ `${ name }-white` }>A</label>
                </div>
            </div>
        </div>)
    }

    const inputViews = () => {

        return(<>
            <div>
                Top Menu
                <div onClick={ () => handleClick('top-menu') } className={ `color-box-view ${ active ==='top-menu' ? 'active' : '' }` }>
                    <span style={ { background: colors[ 'top-menu' ] } } ></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'top-menu') }
                        className='form-control'
                        defaultValue={ colors[ 'top-menu' ] }
                        value={ colors[ 'top-menu' ] }
                    />
                </div>
                {radioView('top-menu-font','#000000','#FFFFFF')}
            </div>
            <div>
                Button
                <div onClick={ () => handleClick('button') } className={ `color-box-view ${ active ==='button' ? 'active' : '' }` }>
                    <span style={ { background: colors[ 'button' ] } }></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'button') }
                        className='form-control'
                        defaultValue={ colors[ 'button' ] }
                        value={ colors[ 'button' ] }
                    />
                </div>
                {radioView('button-font','#000000','#FFFFFF')}
            </div>
            <div>
                Background
                <div onClick={ () => handleClick('background') } className={ `color-box-view ${ active ==='background' ? 'active' : '' }` }>
                    <span style={ { background: colors[ 'background' ] } }></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'background') }
                        className='form-control'
                        defaultValue={ colors[ 'background' ] }
                        value={ colors[ 'background' ] }
                    />
                </div>
                {radioView('background-font','#000000','#FFFFFF')}
            </div>
            <div>
                Home Background
                <div onClick={ () => handleClick('home-background') } className={ `color-box-view ${ active ==='home-background' ? 'active' : '' }` }>
                    <span style={ { background: colors[ 'home-background' ] } } ></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'home-background') }
                        className='form-control'
                        defaultValue={ colors[ 'home-background' ] }
                        value={ colors[ 'home-background' ] }
                    />
                </div>
                {radioView('home-background-font','#000000','#FFFFFF')}
            </div>
            <div>
                Box Shadow
                <div onClick={ () => handleClick('box-shadow') } className={ `color-box-view ${ active ==='box-shadow' ? 'active' : '' }` }>
                    <span style={ { background: colors[ 'box-shadow' ] } } ></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'box-shadow') }
                        className='form-control'
                        defaultValue={ colors[ 'box-shadow' ] }
                        value={ colors[ 'box-shadow' ] }
                    />
                </div>
            </div>
        </>)
    }

    const selected = Object.assign({}, data);
    selected[ 'colors' ] = JSON.stringify(colors)

    return(
        <div className='color-palatte'>
            <a href='#' onClick={ backFun }>
                <span>
                    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 13.4999L9.5 7.49986L15.5 1.49986" stroke="#757575" strokeLinejoin="round"/>
                    </svg>
                    Back
                </span>
            </a>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className='col-8 color-palatte-preview wizard-preview col'>
                        <div className='color-preview wizard-home wizrd-blog-preview color-palate-preview'>
                            <WebTemplates data={ selected || props.data }>
                                <Header>
                                    <Header.Left />
                                    <Header.Right />
                                </Header>
                                <Home>
                                    <Banner>
                                        <h1>
                                            <span>Simple Recipes for Healthier Families</span>

                                        </h1>
                                        <h5>Welcome to the most reliable source for healthy recipes!</h5>
                                        <div className="wizrd-form-wrapper">
                                            <form className="wizrd-newsletter">
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Enter your email" type="text" />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Subscribe!</button>
                                            </form>
                                        </div>
                                    </Banner>
                                    <Blogs>
                                        <h2 className="wizrd-section-heading">
                                            Recent Blog Posts
                                            <a href="">View All</a>
                                        </h2>
                                        <ul className="wizrd-blog-list">
                                            <li>
                                                <Card
                                                    image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                >
                                                    <h3>The Joy of Cooking</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                </Card>
                                            </li>
                                            <li>
                                                <Card
                                                    image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                >
                                                    <h3>The Joy of Cooking</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                </Card>
                                            </li>
                                            <li>
                                                <Card
                                                    image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                >
                                                    <h3>The Joy of Cooking</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                </Card>
                                            </li>
                                        </ul>
                                    </Blogs>
                                </Home>
                            </WebTemplates>
                        </div>
                    </Col>
                    <Col className='col-md-4 custom-color-div'>
                        {radioView('header-color','#000000','#FFFFFF')}
                        <Field
                            name={ 'coverImage' }
                            component={ renderFileDrop }
                            placeholder={ "<a><i className='fa fa-plus'/> Change Header Image </a>" }
                            isDropText={ data.coverImage ? `<img src=${ data.coverImage } alt='cover' />` : `<img src=${ blogBanner } alt='cover' />` }
                        />
                        <ColorPicker  colors={ objColors } onChange={ handleChangeColor } />
                    </Col>

                </Row>
                <Row>
                    { inputViews() }

                </Row>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    <Button variant="primary" onClick={ () => handleColorsData(colors) }>Confirm</Button>
                </div>
            </Modal.Footer>
        </div>
    )
}

CustomColor.propTypes = {
    data: PropTypes.object,
    handleColorsData: PropTypes.func,
    backFun: PropTypes.func
};
export default CustomColor;