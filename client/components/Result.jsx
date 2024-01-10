import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionnairesData, updateHasImbalance } from "../slices/resultsSlice.js";

const Result = () => {
  // when respond to '/answers', server should send back questionnaire entry date, frontend should save it to 'lastQuestionnaireDate' state
  // query from 'questionnaires' data subset for a particular user for 'lastQuestionnaireDate'. Iterate through received arr, generating <tr> grabbing category and total score 
  const questionnaireRecords = useSelector(state => state.results.questionnaireRecords);
  const lastQuestionnaireDate = useSelector(state => state.questionnaire.lastQuestionnaireDate);
  const hasImbalance = useSelector(state => state.results.hasImbalance);
  const categoryMap = useSelector(state => state.questionnaire.categoryMap);

  const dispatch = useDispatch();

  let resultPositive = 'Your score indicates the following hormonal imbalance: ';
  const resultNegative = 'Congratulations! Your hormones are in balance.';

  // creates <td/> els, generates resultPositive str for <p/> el
  const resultRows = questionnaireRecords.map(q => {
    let category = q.category;
    const hormoneImbalance = categoryMap[category];

    if (q.total_score >= 3) {
      if (hasImbalance) resultPositive += `, ${hormoneImbalance}`;
      else {
        dispatch(updateHasImbalance(true));
        resultPositive += hormoneImbalance;
      }
    }

    return (
      <tr key={q._id}>
        <td>Part {category} - {hormoneImbalance}: </td>
        <td>{q.total_score}</td>
      </tr>
    )
  });

  useEffect(() => {
    // fetches all parts of questionnaire for a particular date and saves in 'questionnaireRecords' state
    dispatch(fetchQuestionnairesData(lastQuestionnaireDate));
  }, []);

  return (
    <div>
      <h1>RESULTS</h1>
      <table>
        <tbody>
          {resultRows}
        </tbody>
      </table>
      <p>{hasImbalance ? resultPositive : resultNegative}</p>
    </div>
  )
};

export default Result;