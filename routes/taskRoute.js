const taskController = require('../controllers/taskController')
const express = require('express')
const router = express.Router()

router.route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)

router.route('/:id')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)


module.exports = router