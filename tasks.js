const serverless = require('serverless-http');
const express = require('express');
const app = express();

const databaseService = require('./databaseservice');

app.get('/tasks', function (request, response) {

  databaseService.getTasks()
  .then(function(results) {
    //we got the Tasks ok
    response.json(results);

  })
  .catch (function (error) {
    // soemthing went weong when getting the tasks
    response.status(500);
    response.json(error);
  });

})

app.delete('/tasks/:taskId', function (request, response) {

  const taskId = request.params.taskId
  databaseService.deleteTasks(taskId)
  .then(function(results) {
    //we got the Tasks ok
    response.json(results);

  })
  .catch (function (error) {
    // soemthing went weong when getting the tasks
    response.status(500);
    response.json(error);
  });
})

module.exports.handler = serverless(app);