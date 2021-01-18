import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useDispatch , useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import withPublicRoute from '../../components/hoc/withPublicRoute'
import StepOne from  '../../components/assessment/StepOne';
import StepTwo from  '../../components/assessment/StepTwo';
import StepThree from  '../../components/assessment/StepThree';
import StepFour from  '../../components/assessment/StepFour';
import Preview from  '../../components/assessment/Preview';
import { ROUTES } from '../../constants/appRoutes'
import { getAssessment } from '../../actions/assessments/';
const AssessmentPage = (props) => {
  const dispatch  = useDispatch()
  const [ step, setStep ] = useState(1)
  const { assessmentData } = useSelector((state) => state.assessment)
  const assessmentForm = useSelector((state) => state.form.assessmentForm)
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

  const saveData = () =>{
    const values = assessmentForm.values
    if(values){
      localStorage.setItem('assessmentForm', JSON.stringify(values))
    }
  }

  const finalSubmit = (data) =>{
    Router.push(ROUTES.LOGIN)
  }

  const handleView = () => {
    switch(step){
    case 1:
        return <StepOne  kindOfBuild={niches} saveData={saveData} onSubmit={nextPage} />
    case 2:
        return <StepTwo  colorPalette={colorPalette} saveData={saveData} prevPage={prevPage} onSubmit={nextPage} />
    case 3:
        return <StepThree  assessmentData={assessmentData} saveData={saveData} prevPage={prevPage} onSubmit={nextPage} />
    case 4:
        return <Preview  assessmentData={assessmentData} saveData={saveData} prevPage={prevPage} onSubmit={finalSubmit} />
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

