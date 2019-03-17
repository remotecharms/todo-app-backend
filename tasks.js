const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require ('cors');

app.use(express.json());
app.use(cors());

const databaseService = require('./databaseservice');

app.get('/tasks', function (request, response) {

  databaseService.getTasks()
  .then(function(tasks) {
    //we got the Tasks ok
    response.json(tasks);

  })
  .catch (function (error) {
    // soemthing went weong when getting the tasks
    response.status(500);
    response.json(error);
  });

})

app.post('/tasks', function (request, response) {

  const description = request.body.description;
  databaseService.saveTasks(description)
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

app.put('/tasks/:taskId', function (request, response) {

  const taskId = request.params.taskId
  databaseService.doneTasks(taskId)
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