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

module.exports.handler = serverless(app);