import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import _ from "lodash";
import * as actions from "../../actions";
import { withRouter } from 'react-router-dom';

function SurveyFormReview(props) {
  const reviewFields = _.map(formFields, ({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{props.formValues[name]}</div>
    </div>
  ));
  return (
    <div>
      <h5>Please confirm your entries:</h5>
      {reviewFields}
      <button
        className="yellow btn-flat darken-3 white-text"
        onClick={props.onCancel}
      >
        Back
      </button>
      <button
        className="btn-flat green right white-text"
        onClick={() => props.submitForm(props.formValues, props.history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
