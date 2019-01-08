import React from "react";
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

export default function Dashboard() {
  return (
    <div>
      <SurveyList/>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons teal accent-4">add</i>
        </Link>
      </div>
    </div>
  );
}
