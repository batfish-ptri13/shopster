/*
  presentational component
  adds headers for Questionnaire Forms
*/

import React from 'react';

const FormHeader = () => (
  <div className='questions-grid questionnaire-header'>
    <p className='questions-grid-item1'></p>
    <p className='questions-grid-item2'>Rarely</p>
    <p className='questions-grid-item3'>Often</p>
    <p className='questions-grid-item4'>All the time</p>
  </div>
);

export default FormHeader;