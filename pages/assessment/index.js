import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import withPublicRoute from '../../components/hoc/withPublicRoute'
import StepOne from  '../../components/assessment/StepOne';
import StepTwo from  '../../components/assessment/StepTwo';
import StepThree from  '../../components/assessment/StepThree';
import StepFour from  '../../components/assessment/StepFour';
import TemplateLayout from  '../../components/assessment/TemplateLayout';

import { getAssessment } from '../../actions/assessments/';
const AssessmentPage = (props) => {
  const dispatch  = useDispatch()
  const [ step, setStep ] = useState(1)
  const { assessmentData } = useSelector((state) => state.assessment)
  const {  
    niches ,
    colorPalette,
  } = assessmentData
  useEffect(() =>{
    dispatch(getAssessment())
  },[])
  const nextPage = (data) => {
    setStep(step+1)
  }

  const prevPage = () =>  {
      setStep(step-1)
  }

  const handleView = () => {
    switch(step){
    case 1:
        return <StepOne  kindOfBuild={niches} onSubmit={nextPage} />
    case 2: 
      return <TemplateLayout onSubmit={nextPage} />
    case 3:
        return <StepTwo  colorPalette={colorPalette} prevPage={prevPage} onSubmit={nextPage} />
    case 4:
        return <StepThree  assessmentData={assessmentData} prevPage={prevPage} onSubmit={nextPage} />
    case 5:
        return <StepFour  assessmentData={assessmentData} prevPage={prevPage} onSubmit={nextPage} />
    default:
        return null
    }
}
  return(
   
    <section className="main-section">
      {handleView()}
    </section>
)
}
AssessmentPage.propTypes = {
};

export default withPublicRoute(AssessmentPage)

