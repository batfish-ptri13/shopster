const express = require('express');

const questionnaireController = require('../controllers/questionnaireController.js');

const router = express.Router();

router.get('/:part', questionnaireController.getQuestions, (req, res) => {
  res.status(200).json(res.locals.questions);
});

router.post('/answers', questionnaireController.saveQuestionnaire, questionnaireController.saveAnswers, questionnaireController.saveTotalScore, (req, res) => {
  res.status(200).json(res.locals.questionnaire_date);
});

// router.post('/scores', questionnaireController.getQuestionnaires, (req, res) => {
//   res.status(200).json(res.locals.questionnaires);
// });

router.post('/scores', questionnaireController.getQuestionnaires, questionnaireController.getRecommendations, (req, res) => {
  res.status(200).json({
    questionnaires: res.locals.questionnaires,
    recommendations: res.locals.recommendations
  });
});

module.exports = router;