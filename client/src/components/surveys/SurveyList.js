/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  componentDidUpdate() {
    this.props.fetchSurveys();
  }

  renderSurveys = () => {
    if (this.props.surveys.length < 1)
      return (
        <p>
          You have not created any survey yet, please click the "+" button to
          create a new survey
        </p>
      );
    else
      return this.props.surveys.reverse().map(survey => {
        return (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
              <a
                className="right"
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => this.props.deleteSurvey(survey._id)}
              >
                Delete
              </a>
            </div>
          </div>
        );
      });
  };

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey }
)(SurveyList);
