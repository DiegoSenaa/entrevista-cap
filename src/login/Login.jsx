import React, { Component } from 'react'
import Modal from 'react-modal';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../index.css"

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxWidth              : '500px'
      }
  }
  

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {email: '', password: ''};
            
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }

    handleSubmit(event) {
        
        var payload = { email: this.state.email, password: this.state.password }
        axios.post('https://productsales-api.herokuapp.com/auth/login', payload)
        .then(resp => {
            toast.success("Login efetuado com sucesso. Redirecionando...");
            sessionStorage.setItem("access_token", resp.data.access_token);
            setTimeout(function(){
                document.location.reload(true);
            },1000)

        }, err =>{
            toast.error("Dados incorretos.");
        })
        
        event.preventDefault();

    }
    
    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePass(event) {
        this.setState({password: event.target.value});
    }

    render() {

        return (
        
            <div>
                <ToastContainer />
                <Modal
                    isOpen={true}
                    style={customStyles}
                    contentLabel="Modal Login"
                    overlayClassName="ModalLogin"
                    ariaHideApp={false}
                    >
                    
                    <form onSubmit={this.handleSubmit} method="post">

                        <div className="col-md-12 form-group">
                            <h3>Login React JWT</h3>
                        </div>
                        <div className="col-md-12 form-group">
                            <label>E-mail:</label>
                            <input type="email" value={this.state.email} required="required" onChange={this.handleChangeEmail} className="form-control"/>
                            
                        </div>

                        <div className="col-md-12 form-group">
                            <label>Senha:</label> 
                            <input type="password" value={this.state.password} required="required" onChange={this.handleChangePass} className="form-control"/>
                        </div>                     
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary btn-block btn-flat">Entrar</button>                            
                        </div>
                    </form>                    
                </Modal>  


            </div>
        )
    }

}

export default Login;