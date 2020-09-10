var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_listdb"
});

connection.connect(function (err) {
    if (err) throw err;
    init();
});

function init() {
    console.log("Welcome to the Employee managment software!")
    inquirer.prompt([
            {
                type: 'list',
                name: 'reptile',
                message: 'Which is better?',
                choices: ['alligator', 'crocodile'],
            },
        ])
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments?",
                "Add a department?",
                "View all roles?",
                "Add a role?",
                "View an employee?",
                "Add an employee?",
                "Update an employee's role?",
            ]
        })
    // .then(function (answer) {
    //     switch (answer.action) {
    //         case "View all departments?":
    //             viewDepartments();
    //             break;

    //         case "Add a department?":
    //             addDepartments();
    //             break;

    //         case "View all roles?":
    //             viewRoles();
    //             break;

    //         case "Add a role?":
    //             addRole();
    //             break;

    //         case "View employee list?":
    //             viewEmployees();
    //             break;

    //         case "Add an employee?":
    //             addEmployee();
    //             break;

    //         case "Update an employee's role?":
    //             updateRole();
    //             break;
    //     }
    // });
}

init();
function viewDepartments() {
    console.log()
};