import React, { Component } from "react";
import classes from "./contactData.css";
import MyButton from "../../../components/UI/Button/Button";
import axios from "../../../hoc/Order"; //Self making file for specially axios access
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Inputs/Input";
class contactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    loading: false,
    formIsValid:false
  };

  orderHandler = (event) => {
    this.setState({ loading: true });
    const formData = {};
    for (let formKeys in this.state.orderForm) {
      formData[formKeys] = this.state.orderForm[formKeys].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      }); // Firebase needs to mention the correct format (json). it is special in firebase. it is endpoint(json).
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedElements = { ...updatedForm[inputIdentifier] };
    updatedElements.value = event.target.value;
    updatedElements.valid = this.checkValidity(
      updatedElements.value,
      updatedElements.validation
    );
    updatedElements.touched = true;
    updatedForm[inputIdentifier] = updatedElements;
    let formIsValid=true;
    for(let key in updatedForm){
      formIsValid=updatedForm[key].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({ orderForm: updatedForm, formIsValid:formIsValid});
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            touched={el.config.touched}
            changed={(event) => this.inputChangedHandler(event, el.id)} //We need element keys(email, country etc).
          />
        ))}
        <MyButton btnType="Success" disabled={!this.state.formIsValid}>Order Now</MyButton>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.contactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default contactData;
