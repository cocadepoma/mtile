import React from 'react'
import { AppRouter } from './router/AppRouter'

import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/styles.scss';


export const MtileApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
