import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthOrApp from './AuthOrApp'

export default props => (

    <Switch>
        <Route path="/" exact={true} component={AuthOrApp} />
        <Route path="/products/" component={AuthOrApp} />
        <Redirect from="*" to="/" />
    </Switch>

)