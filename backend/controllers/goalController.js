const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get Goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) =>{
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc Set Goals
// @route POST /api/goals
// @access Private

const setGoal = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
})

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)
        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }

        //Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        //make sure logged in user matches the goal user
        if(goal.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorised')
        }

        const updatedToal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
    res.status(200).json(updateGoal)
})

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async (req, res) =>{
        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }

        //Check for user
        if(!req.user){
            res.status(401)
            throw new Error('User not found')
        }

        //make sure logged in user matches the goal user
        if(goal.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorised')
        }

        await Goal.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoals
}