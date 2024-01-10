import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormHeader from './FormHeader.jsx';
import QuestionForm from './QuestionForm.jsx';
import { updateAnswers, fetchQuestionsData, saveAnswersData } from '../slices/questionnaireSlice.js';

const Questionnaire = () => {
  const questions = useSelector(state => state.questionnaire.questions);
  const answers = useSelector(state => state.questionnaire.answers);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function dispatchUpdateAnswers(ID, value) {
    dispatch(updateAnswers({ ID, value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    for (const key in answers) {
      if (!answers[key]) return alert('Respond to all questions before submit');
    }
    await dispatch(saveAnswersData(answers));
    navigate('/recommendation');
  }

  const category = questions[0] ? questions[0].category : '';

  const questionForms = questions.map(q => {
    return <QuestionForm
      key={q._id}
      id={q._id}
      text={q.question}
      answer={answers[q._id]}
      dispatchUpdateAnswers={dispatchUpdateAnswers}
    />
  });

  useEffect(() => {
    dispatch(fetchQuestionsData());
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className='questionnaire-sticky-header'>
        <h1>QUESTIONNAIRE - PART {category}</h1>
        <h4>How often have you experienced in the past 6 months…</h4>
        <FormHeader/>
      </div>
      <div className='questionnaire-main-forms'>
        {questionForms}
        <button className='questionnaire-submit-button'>Submit</button>
      </div>
    </form>
  ); 
}

export default Questionnaire;