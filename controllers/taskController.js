const Task = require('../models/taskModel')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')

exports.getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find()
    res.status(201).json({ tasks })
})

exports.createTask = asyncWrapper(async (req, res, next) => {
    const newTask = await Task.create(req.body)
    res.status(201).json({ newTask })
})

exports.getTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }
    res.status(200).json({ task: task })
})

exports.updateTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }
    res.status(200).json({ task: task })
})

exports.deleteTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404))
    }
    res.status(200).json({ task })
})