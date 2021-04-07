import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';

import { Navbar } from '../components/ui/Navbar';
import { TopBar } from '../components/ui/TopBar';

import { DashboardScreen } from '../pages/DashboardScreen';
import { AdminScreen } from '../pages/AdminScreen';
import { OrderScreen } from '../pages/OrderScreen';
import { CalendarScreen } from '../pages/CalendarScreen';
import { CrewScreen } from '../pages/CrewScreen';
import { WarehouseScreen } from '../pages/WarehouseScreen';
import { HistoricalScreen } from '../pages/HistoricalScreen';
import { StatisticsScreen } from '../pages/StatisticsScreen';
import { Error404Screen } from '../pages/Error404Screen';
import { DocsScreen } from '../pages/DocsScreen';
import { NewOrderScreen } from '../pages/NewOrderScreen';
import { useDispatch } from 'react-redux';
import { startLoadOrderEvents } from '../actions/calendar';

export const MainRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadOrderEvents());
    }, [dispatch])


    return (
        <div className="wrapper-nav-main">
            <Navbar />
            {/* toggle-container adds margin-left when Navbar is expanded  */}
            <main>
                <TopBar />
                <div className='container main-container'>
                    <Switch>
                        <Route exact path="/" component={DashboardScreen} />
                        <Route exact path="/admin" component={AdminScreen} />
                        <Route exact path="/neworder" component={NewOrderScreen} />
                        <Route exact path="/order/id/:id" component={OrderScreen} />
                        <Route exact path="/calendar" component={CalendarScreen} />
                        <Route exact path="/crew" component={CrewScreen} />
                        <Route exact path="/docs" component={DocsScreen} />
                        <Route exact path="/warehouse" component={WarehouseScreen} />
                        <Route exact path="/statistics" component={StatisticsScreen} />
                        <Route exact path="/history" component={HistoricalScreen} />

                        <Route path="*">
                            <Error404Screen />
                        </Route>

                    </Switch>
                </div>
            </main>
        </div>
    )
}
