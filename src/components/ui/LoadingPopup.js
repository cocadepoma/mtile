import React from 'react'
import { Loading } from './Loading'

export const LoadingPopup = () => {
    return (
        <div className="loading-wrapper animate__animated animate__fadeIn animate__fast">
            <Loading />
        </div>
    )
}
