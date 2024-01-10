/*
  presentational component
  generates Questionnaire forms consisting of a question and 3 radio buttons
*/

import React from 'react';

const QuestionForm = ({ id, text, answer, dispatchUpdateAnswers }) => {

  function handleChange(event) {
    const { value } = event.target;
    dispatchUpdateAnswers(id, value);
  }

  return (  
    <div className='questions-grid'>
      <p className='questions-grid-item1'>{text}</p>
      <input
        className='radio-button questions-grid-item2'
        type='radio' 
        name={`answer${id}`}
        value='1-2 times'
        checked={answer === '1-2 times'}
        onChange={handleChange}
      />
      <input 
        className='radio-button questions-grid-item3'
        type='radio' 
        name={`answer${id}`}
        value='half days'
        checked={answer === 'half days'}
        onChange={handleChange}
      />
      <input 
        className='radio-button questions-grid-item4'
        type='radio' 
        name={`answer${id}`}
        value='every day'
        checked={answer === 'every day'}
        onChange={handleChange}
      />
    </div>
  )
};

export default QuestionForm;