import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './components/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          </Layout>
      </div>
    );
  }
}

export default App;
