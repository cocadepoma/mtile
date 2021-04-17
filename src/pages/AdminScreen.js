import React from 'react'

export const AdminScreen = () => {
    return (
        <div className='admin-screen animate__animated animate__fadeIn'>
            <h1>Sección en construcción, sentimos las molestias...</h1>
            <div className="construction-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/construct.png)` }}></div>
        </div>
    )
}
