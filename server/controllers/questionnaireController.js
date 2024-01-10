const db = require('../models/soloProjectModels.js');
const { get } = require('../routes/questionnaireRouter.js');

const questionnaireController = {};

questionnaireController.getQuestions = (req, res, next) => {
  const { part } = req.params;

  const getQuestionsQuery = `SELECT * FROM questions WHERE category = '${part}'`;
  db.query(getQuestionsQuery)
    .then(data => {
      res.locals.questions = data.rows;
      next();
    });
};

// creates entry in  db 'questionnaires', keeps date to send to frontend 'lastQuestionnaireDate' state
questionnaireController.saveQuestionnaire = (req, res, next) => {
  const addQuestionnaireQuery = 'INSERT INTO questionnaires DEFAULT VALUES RETURNING _id, created_at';
  db.query(addQuestionnaireQuery)
    .then(data => {
      res.locals.questionnaire_id = data.rows[0]._id;

      const fullDate = data.rows[0].created_at;
      const dateOnly = new Date(fullDate).toISOString().split('T')[0];
      res.locals.questionnaire_date = dateOnly;

      next();
    });
};

// gets questionnaire records from db 'questionnaires' and saves to send to frontend for <Result/> component
questionnaireController.getQuestionnaires = (req, res, next) => {
  const date = req.body.date;
  const getQuestionnairesQuery = `SELECT * FROM questionnaires WHERE created_at::date = '${date}'`;
  db.query(getQuestionnairesQuery)
    .then(data => {
      res.locals.questionnaires = data.rows;
      next();
    })
};

// gets all recommendations for all categories where score criteria is met, and sends recommendations back to frontend
questionnaireController.getRecommendations = async (req, res, next) => {
  let recommendations = [];

  for (let questionnaire of res.locals.questionnaires) {
    // imbalance in each category if more than 3 symptoms in that category
    if (questionnaire.total_score >= 3) {
      const getRecommendationsQuery = `SELECT * FROM recommendations WHERE category = '${questionnaire.category}'`;
      const data = await db.query(getRecommendationsQuery);
      console.log('INSIDE LOOP: DATA:   ', data.rows);
      recommendations = recommendations.concat(data.rows);
      console.log('INSIDE LOOP: RECOMMENDATIONS:   ', recommendations);
    }
  }
  console.log('AFTER LOOP: RECOMMENDATIONS:   ', recommendations);
  res.locals.recommendations = recommendations;
  next();
};

questionnaireController.saveAnswers = async (req, res, next) => {
  const newAnswers = req.body;
  const addAnswerQuery = 'INSERT INTO answers (questionnaire_id, question_id, score) VALUES ($1, $2, $3)';
  let score;
  let totalScore = 0;
  // questionsID is used in saveTotalScore controller to grab correct 'category', as newAnswers comes in form { questionID: answer }
  let questionID; 

  for (let key in newAnswers) {
    if (newAnswers[key] === '1-2 times') score = 0;
    else if (newAnswers[key] === 'half days') score = 0.5;
    else if (newAnswers[key] === 'every day') score = 1;
    else score = null;

    if (score !== null) totalScore += score; 
    questionID = key;

    const values = [res.locals.questionnaire_id, key, score];
    await db.query(addAnswerQuery, values);
  }

  res.locals.totalScore = totalScore;
  res.locals.questionID = questionID;
  next();
};

// saves total_score in db 'questionnaires' table
questionnaireController.saveTotalScore = async (req, res, next) => {
  const getCategoryQuery = `SELECT category FROM questions WHERE _id = ${res.locals.questionID}`;
  const categoryData = await db.query(getCategoryQuery);
  const category = categoryData.rows[0].category;
  
  const updateTotalScore = `UPDATE questionnaires SET category = '${category}', total_score = ${res.locals.totalScore} WHERE _id = ${res.locals.questionnaire_id}`;
  db.query(updateTotalScore)
    .then(() => next());
};

module.exports = questionnaireController;