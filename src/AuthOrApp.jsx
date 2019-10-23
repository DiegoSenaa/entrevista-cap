import React, { Component } from 'react'
import App from './App'
import Login from './login/Login'


export default class AuthOrApp extends Component {

    render() {
        var validToken = sessionStorage.getItem("access_token") || false;

        if (validToken) {
            return <App>{this.props.children}</App>
        } else if (!validToken) {
            return <Login>{this.props.children}</Login>
        } else {
            return false
        }

    }
}
