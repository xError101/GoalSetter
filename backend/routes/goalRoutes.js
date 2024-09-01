const express = require('express')
const router = express.Router()
const {getGoals,setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')


router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoals)

module.exports = router