import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    HashRouter as Router,
    Switch,
} from "react-router-dom";
import { finishChecking, startChecking } from "../actions/auth";
import { LoadingScreen } from "../pages/LoadingScreen";
import { LoginScreen } from "../pages/LoginScreen";
import { MainRouter } from "./MainRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(startChecking());
        } else {
            dispatch(finishChecking());
        }

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

                </Switch>
            </div>
        </Router>
    )
}
