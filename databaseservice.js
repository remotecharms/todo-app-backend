const mysql = require("mysql"); 

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}
//getDatabaseConntection function estabilishes the connection to the database
//it's a JSON object with keys: host, user, password and database
//environment variables - you wouldn't hard code the password or the username, because anyone could connect to the database
// with the creditentials. Used for security and allows code to flex for the enviornment e.g. Dev vs Prod etc. 
function getTasks() {
    const connection = getDatabaseConnection();
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM Tasks", function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end()
                    return resolve(results);  
            }                
            });
    });
}

    function saveTasks(description){
        const connection = getDatabaseConnection(); 

        return new Promise(function(resolve, reject) {

            const postData = {
                description: description,
                completed: false,
                userId: 1
            }

            connection.query("INSERT INTO Tasks SET ?", postData, function(error, results, fields) {
                if (error) {
                    connection.destroy();
                    return reject(error);
                } 
                else {
                    connection.end(function () {
                        return resolve(results);
                    }); 
                }
            });
        });
    }

    function doneTasks(taskId) {
        const connection = getDatabaseConnection();

        return new Promise(function(resolve, reject) {
            connection.query("UPDATE Tasks SET Completed = TRUE TaskId =?", taskId, function(error, results, fields) {
                if (error) {
                    connection.destroy();
                    return reject(error);
                } 
                else {
                    connection.end(function () {
                        return resolve(results);
                    });
                };
            });
        });
    }
   function deleteTasks(taskId) {
        const connection = getDatabaseConnection();

        return new Promise(function(resolve, reject) {
            connection.query("DELETE FROM Tasks WHERE TaskId =?", taskId, function(error, results, fields) {
                if (error) {
                    connection.destroy();
                    return reject(error);
                } 
                else {
                    connection.end(function () {
                        return resolve(results);
                    });
                };
            });
        });
    }

// the above brings in promises and MySQL 
// call back function - it returns 3 things if there is an error, if it succeeded then it gets the results 
// if there is an error first of all we make sure that the connection is terminated and then it returns
// if it works in the else return the resolve and then the results
// we need to end the connection - if the app stays up and running, when the app starts you estabilish the connection to the database
// you tend to keep ipen the connections to the database
// it's a TCP Handshake 
// with Lambda the code does not exist until someone calls it everytime a query is issued to the database you need to restart the connection
// you're waiting for Javascripts garabage collection to timeout, `If you were using a server app intialise a pool of connection 
// it will keep open multiple connections. 
// logs can be found on the server so that our can see termianted connections. 
// fields is an array of fields that you are querying from the database 
module.exports = {
 getTasks,
 deleteTasks,
 saveTasks,
 doneTasks
}

