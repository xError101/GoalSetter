const express = require('express')
const router = express.Router()
const {getGoals,setGoal, updateGoal, deleteGoals} = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoals)

module.exports = router