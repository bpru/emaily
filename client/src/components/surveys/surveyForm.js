import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validatEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          {...field}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
        >
          {/* <Field type="text" name="surveyTitle" component="input" /> */}
          {this.renderFields()}
          <Link className="red btn-flat white-text" to="/surveys">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// reduxForm use this funciton to validate form
// if the returned errors object is not empty and the key matches the name of
// <Field/>, reduxForm automatically add the value of error to the meta property
// of that <Field/>
function validate(values) {
  const errors = {};

  errors.recipients = validatEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) errors[name] = "You must provide a value";
  });

  return errors;
}

export default reduxForm({
  validate, //validate: validate
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
