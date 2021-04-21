import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoadingScreen } from "../pages/LoadingScreen";
import { LoginScreen } from "../pages/LoginScreen";
import { MainRouter } from "./MainRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return (<LoadingScreen />);
    }
    return (
        <Router basename='/' >
            <div>
                <Switch>

                    <PublicRoute exact path="/login" isAuthenticated={!!uid} component={LoginScreen} />
                    <PrivateRoute path="/" isAuthenticated={!!uid} component={MainRouter} />

                    <Route path="*">Hola</Route>
                </Switch>
            </div>
        </Router>
    )
}
