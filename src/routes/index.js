import React, { useEffect, useContext } from 'react'
import { Route, BrowserRouter as Router, withRouter, Switch } from 'react-router-dom'
import Header from '../components/organisms/Header'
import Home from '../views/Home'

const Routes = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </>
    )
}
export default withRouter(Routes)
