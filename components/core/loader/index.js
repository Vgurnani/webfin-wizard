import React from 'react';
import './style.sass'
const Loader = (props)=> {
    const {isLoading} = props
    if(isLoading){  
        return (
            <div className={`loader-cs d-flex justify-content-center website-loader`}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    else{
        return null
    }
}

export default Loader;