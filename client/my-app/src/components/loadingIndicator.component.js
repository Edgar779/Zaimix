import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import React from 'react'
export const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        
        promiseInProgress && <div style={{width: "100%", height: "100", position: 'absolute', textAlign: 'center', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} >
                
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
            </div>
    )
}
