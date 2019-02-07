const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {

  const taskList= {
  
      task: [ {
        TaskId: 1,
        Description: "Learn JavaScript",
        Completed: false
      },
      {
        TaskId: 2,
        Description: "Learn MySQL",
        Completed: false
      },
      {
        TaskId: 3,
        Description: "Find out if Mary had a little Lambda",
        Completed: false
      }
    ]};
  
  /*const username = request.query.username;

  /*const taskList = {
    message: "Hello " + username
  };
  */
  response.json(taskList);
})

app.delete('/tasks/:taskId', function (request, response) {

  const taskIdToBeDeleted = request.params.taskId;

  const someResponse = {
    message: "You executed a delete request for ID: " + taskIdToBeDeleted
  };

  response.json(someResponse);

});

module.exports.handler = serverless(app);