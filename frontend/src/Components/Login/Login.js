import React, { useState } from "react";
import "./Login.css";
import { loginForm } from "../utils/formInput";
import { checkValidity } from "../utils/validation";
import Input from "../Input/Input";
const Login = () => {
  const [form, setForm] = useState(loginForm.loginForm);
  const [formValid, setFormValid] = useState(false);
  const [inputs] = useState([]);
  const inputhandler = (event, indentifier) => {
    const updatedFormData = {
      ...form,
    };
    const formElement = { ...updatedFormData[indentifier] };
    formElement.value = event.target.value;
    formElement.touched = true;
    updatedFormData[indentifier] = formElement;
    let validityChecked = checkValidity(
      formElement.value,
      formElement.validation,
      "",
      "Login",
      formElement.name
    );
    formElement.valid = validityChecked.isValid;
    formElement.error = validityChecked.errorMessage;
    let formValid = true;
    for (let indentifier in updatedFormData) {
      formValid = updatedFormData[indentifier].valid && formValid;
    }
    const updatedUpdatedFormdata = { ...updatedFormData };
    setForm(updatedUpdatedFormdata);
    setFormValid(formValid);
  };
  const submithandler = () => {
    let updatedFormData = { ...form };
    let formData = {};
    for (let elementdata in updatedFormData) {
      formData[elementdata] = updatedFormData[elementdata].value;
    }
    let data = {
      email: formData.email,
      password: formData.password,
    };
    if (data.email === "user" && data.password === "user@123") {
      alert("Successful");
    } else {
      alert("Invalid creadentials");
    }
  };
  let formToArray = [];
  for (let key in form) {
    formToArray.push({
      id: key,
      config: form[key],
    });
  }
  return (
    <>
      <main>
        <div className="container login-container">
          <div className="row">
            <div className="col-md-12">
              <p className="title-1">Covid 19</p>
              <p className="sub-heading">
                Welcome back! Please sign in to your account
              </p>

              <div className="form-container">
                {formToArray.map((element) => (
                  <Input
                    key={element.id}
                    elementtype={element.config.elementType}
                    elementconfig={element.config.elementConfig}
                    reference={(input) => (inputs[element.id] = input)}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                    error={element.config.error}
                    name={element.config.name}
                    changed={(event) => inputhandler(event, element.id)}
                  />
                ))}
                <button
                  className="primary-button box-shadow-effect"
                  disabled={!formValid}
                  onClick={submithandler}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
