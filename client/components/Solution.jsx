import React from "react";
import { useSelector } from "react-redux";

const Solution = () => {
  const recommendations = useSelector(state => state.results.recommendations);
  const categoryMap = useSelector(state => state.questionnaire.categoryMap);

  // transform array data into obj {category: [array of recommendations]}
  const categorizedRecommendations = recommendations.reduce((acc, r) => {
    const categoryKey = `${categoryMap[r.category]} - Step ${r.protocol_step}`;
    if (!acc[categoryKey]) acc[categoryKey] = [];
    acc[categoryKey].push(r);
    return acc;
  }, {});

  const recsByCategory = [];
  for (let categoryKey in categorizedRecommendations) {
    const component = (
      <div key={categoryKey}>
        <h4>{categoryKey}</h4>
        <ul>
          {categorizedRecommendations[categoryKey].map(r => (
            <li key={r._id}>
              <p>
                <span className="solution-span">{r.overview}. </span>
                {r.details}                
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
    recsByCategory.push(component);
  };

  return (
    <div>
      <h2>Solution</h2>
      <p>Follow this protocol for 12 weeks and then retake the assessment.</p>
      {recsByCategory}
    </div>
  )
};

export default Solution;