import React from 'react';
import './style.sass'
const Loader = (props)=> {
    const {isLoading} = props
    if(isLoading){  
        return (
            <div className="global-loader">
                <div class="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        )
    }
    else{
        return null
    }
}

export default Loader;