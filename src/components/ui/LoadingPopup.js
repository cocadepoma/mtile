import React from 'react'
import { Loading } from './Loading'

export const LoadingPopup = ({ type = 'default' }) => {
    return (
        <>
            {type === 'default'
                ? <div className="loading-wrapper animate__animated animate__fadeIn animate__faster">
                    <Loading />
                </div>

                :
                <div className="loading-wrapper">
                    <Loading />
                </div>

            }

        </>
    )
}
