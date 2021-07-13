import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSurveys } from '../../actions';

export default function SurveyList() {
  const surveys = useSelector((state) => state.surveys);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderSurveys = () => {
    if (!surveys.length) {
      return <div>No surveys yet</div>;
    }
    return surveys.reverse().map((survey) => {
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
          </div>
        </div>
      );
    });
  };

  return <div>{renderSurveys()}</div>;
}
