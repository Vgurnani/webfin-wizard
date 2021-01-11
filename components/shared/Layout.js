import React, { useEffect } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { addBodyClass } from '../../utils/helpers'

const TemplateWrapper = (props) => {
  const pathname = props?.pathname
  useEffect(()=> {
    addBodyClass(pathname)
  },[pathname])
  return (
    <div>
      <Navbar pathname={pathname} />
      <div>{props.children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
