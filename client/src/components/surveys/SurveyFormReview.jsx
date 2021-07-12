import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitSurvey } from '../../actions';
import formFields from './formFields';
import { useHistory } from 'react-router-dom';

const SurveyFormReview = ({ onCancel }) => {
  const formValues = useSelector((state) => state.form.surveyForm.values);
  const dispatch = useDispatch();
  const history = useHistory();

  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => dispatch(submitSurvey(formValues, history))}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default SurveyFormReview;
