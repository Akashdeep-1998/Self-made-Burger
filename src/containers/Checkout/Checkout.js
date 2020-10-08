import React, { Component } from "react";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import ContactData from './contactData/contactData';
class Checkout extends Component {
checkoutCancelHandler=()=>{
    this.props.history.goBack();                        // It returns back the last page you have enntered.
  }

checkoutContinueHandler=()=>{
    this.props.history.replace("/checkout/contact-data")    //Replacing the prev route with current route.
}
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} 
        checkoutCancel={this.checkoutCancelHandler}
        checkoutContinue={this.checkoutContinueHandler}/>
        <Route path={this.props.match.path +'/contact-data'} component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    ingredients: state.ingredients,    //In state.ingredients, ingredients will be named same as it is written in reducer(in our redux).
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps, null)(Checkout);  //mapstatetoprops must be first args always.
