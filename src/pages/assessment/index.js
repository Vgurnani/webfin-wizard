import React, { useState, useEffect } from 'react'
import { reset } from 'redux-form';
// import Router from 'next/router'
import { useHistory  } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux'
// import withPublicRoute from '../../components/hoc/withPublicRoute'
import StepOne from  '../../components/assessment/StepOne';
import StepTwo from  '../../components/assessment/StepTwo';
import StepThree from  '../../components/assessment/StepThree';
import Preview from  '../../components/assessment/Preview';
import { ROUTES } from '../../constants/appRoutes'
import { getAssessment ,createAssessment } from '../../middleware/assessments';
import { isLoggedIn } from '../../utils/helpers'
import { AllColors } from 'constants/theme'

const AssessmentPage = () => {
    const history = useHistory();
    const dispatch  = useDispatch()
    const [ step, setStep ] = useState(1)
    const { assessmentData } = useSelector((state) => state.assessment)
    const assessmentForm = useSelector((state) => state.form.assessmentForm)
    const {
        niches ,
    } = assessmentData

    useEffect(() =>{
        dispatch(getAssessment())
        return () => {
            dispatch(reset('assessmentForm'))
        }
    },[])
    const saveData = () =>{
        const values = assessmentForm.values
        if(values){
            sessionStorage.setItem('assessmentForm', JSON.stringify(values))
        }
    }
    const nextPage = () => {
        setStep(step+1)
        saveData()
    }

    const prevPage = () =>  {
        setStep(step-1)
    }

    const finalSubmit = (data) =>{
        if(isLoggedIn()){
            dispatch(createAssessment(data))
        }else{
            sessionStorage.setItem('assessmentForm', JSON.stringify(data))
            history.push(ROUTES.REGISTER)
        }
    }

    const handleView = () => {
        switch(step){
        case 1:
            return <StepOne kindOfBuild={ niches } saveData={ saveData } onSubmit={ nextPage } />
        case 2:
            return <StepTwo  colorPalette={ AllColors() } saveData={ saveData } prevPage={ prevPage } onSubmit={ nextPage } />
        case 3:
            return <StepThree setStep={ setStep }  assessmentData={ assessmentData } saveData={ saveData } prevPage={ prevPage } onSubmit={ nextPage } />
        case 4:
            return <Preview   assessmentData={ assessmentData } saveData={ saveData } prevPage={ prevPage } onSubmit={ finalSubmit } />
        default:
            return null
        }
    }
    return(
        <>
            {handleView()}
        </>
    )
}
AssessmentPage.propTypes = {
};

export default AssessmentPage
