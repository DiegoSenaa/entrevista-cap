import React, { Component } from 'react'
import Modal from 'react-modal';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

         this.state = {listaProdutos: [], itemEditar: [], showModal: false, nome: "", quantidade: "", preco: "", idProduto: "", activitie: ""};
         this.getProducts = this.getProducts.bind(this);
         this.editarItem = this.editarItem.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);

         this.handleOpenModal = this.handleOpenModal.bind(this);
         this.handleCloseModal = this.handleCloseModal.bind(this);

         this.handleChangeNome = this.handleChangeNome.bind(this);
         this.handleChangeQuantidade = this.handleChangeQuantidade.bind(this);
         this.handleChangePreco = this.handleChangePreco.bind(this);
    }

      componentWillMount(){
         this.getProducts();
      }

      handleOpenModal() {     
         this.setState({ showModal: true, nome: "", quantidade: "", preco: "", idProduto: "", activitie: "" });
      }
   
      handleCloseModal() {
         this.setState({ showModal: false, nome: "", quantidade: "", preco: "", idProduto: "", activitie: "" });
      } 

      handleChangeNome(event) {
            this.setState({nome: event.target.value});
      }

      handleChangeQuantidade(event) {
            this.setState({quantidade: event.target.value});
      }
      handleChangePreco(event) {
         this.setState({preco: event.target.value});
      }


    getProducts() {
         var validToken = sessionStorage.getItem("access_token") || document.location.reload(true);

         var config = {
            headers: { Authorization: "bearer " + validToken }
         };

        axios.get('https://productsales-api.herokuapp.com/products', config)
        .then(resp => {
            this.setState({listaProdutos: resp.data});
        }, err =>{
            toast.error("Não foi possível pegar a lista de produtos.");
        });

    }

    handleSubmit(event) {

         var validToken = sessionStorage.getItem("access_token") || document.location.reload(true);
         var payload = { name: this.state.nome, cost: this.state.preco, quantity: this.state.quantidade }
         
         var config = {
            headers: { Authorization: "bearer " + validToken }
         };
         
         if(this.state.activitie==="novo"){
            axios.post('https://productsales-api.herokuapp.com/products', payload, config)
            .then(resp => {
               toast.success("Cadastro efetuado com sucesso!!!");
               this.getProducts();
               this.handleCloseModal();
            }, err =>{
               toast.error("Ops, algo deu errado. Contacte o administrador.");
            })
         }else if(this.state.activitie==="editar"){
            axios.put('https://productsales-api.herokuapp.com/products/' + this.state.idProduto, payload, config)
            .then(resp => {
               toast.success("Atualização realizada com sucesso!!!");
               this.getProducts();
               this.handleCloseModal();
            }, err =>{
               toast.error("Ops, algo deu errado. Contacte o administrador.");
            })
         }else{
            return null;
         }

         event.preventDefault();
    }

    editarItem(item){
       console.log("item editar", item);
       this.handleOpenModal();
       this.setState({activitie: "editar", nome:item.name, quantidade: item.quantity, preco: item.cost, idProduto: item.id});
    }

    deleteProduct(item){

      confirmAlert({
         title: 'Atenção',
         message: 'Tem certeza que deseja excluir o item "'+item.name+'"?',
         buttons: [
           {
             label: 'Excluir',
             onClick: () => {
                  
                  var validToken = sessionStorage.getItem("access_token") || document.location.reload(true);

                  var config = {
                     headers: { Authorization: "bearer " + validToken }
                  };
         
                  axios.delete('https://productsales-api.herokuapp.com/products/' + item.id, config)
                  .then(resp => {
                     toast.success("Exclusão realizada com sucesso!!!");
                     this.getProducts();         
                  }, err =>{
                     toast.error("Ops, algo deu errado. Contacte o administrador.");
                  })

             }
           },
           {
             label: 'Cancelar',
             onClick: () => { }
           }
         ]
       });


    }


   newProduto(){
      this.handleOpenModal();
      this.setState({activitie: "novo"});
   }

    renderProducts(){       
      var products = this.state.listaProdutos || []

      var compProduct = products.length>0? products.map(item=>{
         return (
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.name}</td>
               <td>{item.cost}</td>
               <td>{item.quantity}</td>
               <td>
                  <button type="button" className="btn btn-primary" onClick={() => this.editarItem(item)}>Editar</button>
                  <button type="button" className="btn btn-warning" onClick={() => this.deleteProduct(item)}>Remover</button>
               </td>
            </tr>
         )
      }) : null

      return compProduct;
    }

    logoff(){
       sessionStorage.clear();
       document.location.reload(true);
    }

    render() {

        return (
         
            <div>
               <ToastContainer />

               <div className="col-md-12">

                  <div className="col-md-12"><center><h2>Lista de Produtos</h2></center></div>

                  <div className="col-md-12">
                  <div className="col-md-2"></div>
                  <div className="col-md-3"><button type="button" className="btn btn-primary" onClick={() => this.newProduto()}>Adicionar Produto</button></div>
                  <div className="col-md-4"></div>
                  <div className="col-md-1"><button type="button" className="btn btn-danger" onClick={() => this.logoff()}>Logoff</button></div>
                  <div className="col-md-2"></div>
                  </div>

                  <div className="col-md-2"></div>

                  <div className="col-md-8">

                     <div className="col-md-12">
                        <br /><br />
                        <table id="tableProducts" className="display">
                           <thead>
                              <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Ações</th>
                              </tr>
                           </thead>
                           <tbody>
                              {this.renderProducts()}
                           </tbody>
                        </table>
                     </div>

                  </div>
                  <div className="col-md-2"></div>

                  </div>


                  <Modal
                     isOpen={true}
                     style={customStyles}
                     contentLabel="Modal Produto"
                     overlayClassName="ModalLogin"
                     ariaHideApp={false}
                     isOpen={this.state.showModal}
                     onRequestClose={this.handleCloseModal}
                     >
                     
                     <form onSubmit={this.handleSubmit} method="post">

                           <div className="col-md-12 form-group">
                              <h3>Criar Novo Produto</h3>
                           </div>
                           <div className="col-md-12 form-group">
                              <label>Nome</label>
                              <input type="text" value={this.state.nome} required="required" onChange={this.handleChangeNome} className="form-control"/>                              
                           </div>

                           <div className="col-md-12 form-group">
                              <label>Quantidade</label>
                              <input type="number" value={this.state.quantidade} required="required" onChange={this.handleChangeQuantidade} className="form-control"/>                              
                           </div>

                           <div className="col-md-12 form-group">
                              <label>Preço</label>
                              <input type="text" value={this.state.preco} required="required" onChange={this.handleChangePreco} className="form-control"/>                              
                           </div>            

                           <div className="col-md-12">
                              <button type="submit" className="btn btn-primary btn-block btn-flat">Cadastrar</button>                            
                           </div>
                     </form>                    
                  </Modal> 
            </div>
        )
    }

}

export default Login;