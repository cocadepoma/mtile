import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export const Error404Screen = () => {

    const history = useHistory();

    return (
        <div className='screen-404 animate__animated animate__fadeIn'>

            <div className="bg-black">
                <img className="bg-404" src={`${process.env.PUBLIC_URL}/assets/images/404.jpg`} alt="bg" />

                <div className="info-404">
                    <h1>404</h1>
                    <p className="text-info">Página no encontrada</p>

                    <div className="buttons-404">
                        <Link to='/'>Volver al Dashboard</Link>
                        <p onClick={() => { history.goBack() }}>Volver atrás</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
