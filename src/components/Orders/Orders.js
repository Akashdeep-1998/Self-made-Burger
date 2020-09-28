import React, { Component } from 'react';
import axios from '../../hoc/Order';
import SingleOrder from './SingleOrder'

class Orders extends Component {
    state={
        orders:[],
        loading:true,
    }
    componentDidMount(){
            axios.get('/orders.json').then(response=>{
                const fetchOrders=[];
                for(let key in response.data){
                    fetchOrders.push({...response.data[key], id:key});   //Putiing the object data into array with keys as an id.
                    this.setState({loading:false, orders:fetchOrders});
                }
            }).catch(error=>{
                this.setState({loading:false});
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order=>(
                    <SingleOrder key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price}    />
                ))}
            </div>
        );
    }
}

export default Orders;
