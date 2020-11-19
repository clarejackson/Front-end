import React, { useEffect, useState } from "react";
import * as yup from "yup";
import formSchema from "./registrationSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RegistrationForm.css";

function RegistrationForm(props) {
  const initialForm = { name: "", email: "", password: "", checkbox: false };
  const [formValues, setFormValues] = useState(initialForm);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const submitForm = (event) => {
    event.preventDefault();
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormValues({ ...formValues, [event.target.name]: value });
  };

 
  function inputChange(event) {
    /* Destructuring the  name and value from the form inputs. */
    const { name, value } = event.target;
    /* 'reach' grabs requirements for the form label equal to form event in formSchema (e.g. name, email, password). 
        'validate' checks that the value/user input is valid-based on requirements in formSchema.
        'then' is what happens when successful (in this case, nothing, since there is nothing in the ()). 
        'catch' is what happens when the inputs are not valid per the formSchema (e.g. logs the message in the .required()). */
    if (name === "checkbox") {
      yup
        .reach(formSchema, name)
        .validate(event.target.checked)
        .then(() => {})
        .catch((error) => {});

      setFormValues({
        ...formValues,
        [name]: event.target.checked,
      });
    } else {
      yup
        .reach(formSchema, name)
        .validate(value)
        .then(() => {})
        .catch((error) => {});

      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  }

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <form className="form" onSubmit={submitForm}>
        <h1 className="head1">Register</h1>
        <div className="name">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            placeholder="John Doe"
            onChange={inputChange}
          />
        </div>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            placeholder="johndoe@email.com"
            onChange={inputChange}
          />
        </div>
        <div className="password">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            placeholder="Runner124##"
            onChange={inputChange}
          />
        </div>
        <div className="terms">
          <a href="#">Terms of Service</a>
          <input
            id="check"
            type="checkbox"
            name="checkbox"
            value={formValues.checkbox}
            onChange={inputChange}
          />
        </div>
        
        <div className="submit">
        <Link to='/login'>
          <button id="button" type="submit" disabled={buttonDisabled}>
            Submit
          </button>
          </Link>
        </div>
        
        </form>
    </div>
  );
}

export default RegistrationForm;
