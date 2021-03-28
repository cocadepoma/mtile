import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export const Error404Screen = () => {

    const history = useHistory();

    console.log(history)
    return (
        <div>
            error 404ddddddsss
            <Link to='/'>Volver al Dashboard</Link>
            <button onClick={() => { history.goBack() }}>Volver atrás</button>
        </div>
    )
}
