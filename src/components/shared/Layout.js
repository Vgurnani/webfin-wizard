import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import { addBodyClass, isLoading } from '../../utils/helpers'
import Loader from  '../../components/core/loader'

const TemplateWrapper = (props) => {
  const state = useSelector((state)=> state);
  const pathname = props.location.pathname
  useEffect(()=> {
    addBodyClass(pathname)
  },[pathname])
  return (
    <div>
      <Loader isLoading={ isLoading(state)} />
      <Navbar pathname={pathname} />
      <div>{props.children}</div>
      <Footer />
    </div>
  )
}

export default withRouter(TemplateWrapper)
