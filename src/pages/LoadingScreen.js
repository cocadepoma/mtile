import React from 'react'
import { Loading } from '../components/ui/Loading'

export const LoadingScreen = () => {
    return (
        <div className="loading-screen-wrapper animate__animated animate__fadeIn animate__faster">
            <Loading />
        </div>
    )
}
