import React from 'react';
import { Error404Screen } from '../../pages/Error404Screen';
import { render, fireEvent, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { prettyDOM } from '@testing-library/dom';
import { Router, BrowserRouter as RouterP } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

describe('tests on Error404Screen', () => {

    afterEach(() => {
        cleanup();
    });

    test('should render correctly', () => {
        const history = createBrowserHistory();

        const { container, getByText } = render(
            <Router history={history}>
                <Error404Screen />
            </Router>
        );

        expect(container).toMatchSnapshot();
        getByText('Volver al Dashboard');
        getByText('Volver atrás');

    });

    test('should redirect to dashboard if user clicks the button', () => {
        const history = createBrowserHistory();
        const route = '/dashboard/eue';
        history.push(route);

        const { getByText } = render(
            <Router history={history}>
                <Error404Screen />
            </Router>
        );
        expect(global.window.location.pathname).toEqual('/dashboard/eue');

        const button = getByText('Volver al Dashboard');
        fireEvent.click(button);
        expect(global.window.location.pathname).toEqual('/');
    });


});
