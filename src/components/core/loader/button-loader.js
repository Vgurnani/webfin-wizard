import React from 'react';
const ButtonLoader = (props)=> {
    const { loading , loadButton, button } = props
    if(loading){
        return (<>{ loadButton }<div className="small-up-loader btn-loader">
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>  </>)
    }
    else{
        return button
    }
}

export default ButtonLoader;