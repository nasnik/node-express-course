const express = require('express');
const {getAllTasks, createTask, deleteTask, updateTask, getTask} = require("../controllers/tasks");
const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);


module.exports = router;