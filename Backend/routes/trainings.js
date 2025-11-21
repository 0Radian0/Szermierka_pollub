const express = require('express');
const router = express.Router();
const trainFunc = require('../functions/trainingFunction.js');

router.get('/AllTrainings', trainFunc.showTrainingsTable);
router.delete('/deleteTraining/:trainingID', trainFunc.deleteTraining);
router.post('/addTraining', trainFunc.addTraining);
router.put('/modifyTraining', trainFunc.modifyTraining);

module.exports = router;