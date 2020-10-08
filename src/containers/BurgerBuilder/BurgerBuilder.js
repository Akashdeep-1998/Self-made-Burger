import React, { Component } from "react";
import {connect} from 'react-redux';
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionType from '../../Store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return (sum > 0);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          ordered={this.purchaseHandler}
          price={this.props.totalPrice}
        />
      </Aux>
    );
  }
}
// 

const mapStateToProps=(state)=>{
  return {
    ingredients:state.ingredients,    //Getting access from the reducer, not locally (from this file)..
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onIngredientAdded:(ingName)=>dispatch({type: actionType.ADD_INGREDIENTS, ingredientName:ingName}),
    onIngredientRemoved:(ingName)=>dispatch({type: actionType.REMOVE_INGREDIENTS, ingredientName:ingName}),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
