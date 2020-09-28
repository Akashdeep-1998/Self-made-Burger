import React, { Component } from "react";
import {Route} from 'react-router-dom';
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import ContactData from './contactData/contactData';
class Checkout extends Component {
  state = {
    ingredients:null,
    price:0
  }
componentWillMount(){
    console.log(this.props.history);
    const query=new URLSearchParams(this.props.location.search) //It search for all the quesry string..URLSearchparams is constructor.
    const ingredients={}
    let price=0;
    for(let i of query.entries())                               //this returns the array of key-value pair
    {
      if(i[0]==='price')
      {
        price=i[1];
      }
      else{
        ingredients[i[0]]= +i[1];
      }
    }
    this.setState({ingredients:ingredients, totalPrice:price});
}
checkoutCancelHandler=()=>{
    this.props.history.goBack();                        // It returns back the last page you have enntered.
  }

checkoutContinueHandler=()=>{
    this.props.history.replace("/checkout/contact-data")    //Replacing the prev route with current route.
}
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} 
        checkoutCancel={this.checkoutCancelHandler}
        checkoutContinue={this.checkoutContinueHandler}/>
        <Route exact path={this.props.match.path +'/contact-data'} render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}/>
      </div>
    );
  }
}

export default Checkout;
