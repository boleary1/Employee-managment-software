var mysql = require("mysql2");
var inquirer = require("inquirer");
const { lastIndexOf } = require("mysql2/lib/constants/charset_encodings");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_listDB"
});

function init() {
    console.log("Welcome to the Employee managment software!");
    homeScreen();
};

function homeScreen() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments?",
                "Add a department?",
                "View all roles?",
                "Add a role?",
                "View employee list?",
                "Add an employee?",
                "Update an employee's role?",
                "Quit the program"
            ]
        })
        .then(function (answer) {
            console.log(answer)
            switch (answer.action) {
                case "View all departments?":

                    viewDepartments();
                    break;

                case "Add a department?":
                    addDepartments();
                    break;

                case "View all roles?":
                    viewRoles();
                    break;

                case "Add a role?":
                    addRole();
                    break;

                case "View employee list?":
                    viewEmployees();
                    break;

                case "Add an employee?":
                    addEmployee();
                    break;

                case "Update an employee's role?":
                    updateRole();
                    break;

                case "Quit the program":
                    connection.end();
                    break;
            }
        });
}

connection.connect(function (err) {
    if (err) console.log(err);
    init();
});


function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        homeScreen();
    });
};
function addDepartments() {
    let current_id = 0
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        current_id = (res.slice(-1).pop()).id;
    });

    inquirer
        .prompt({
            name: "addDepartment",
            type: "input",
            message: "What Depatment would you like to add?",

        })
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    id: (current_id + 1),
                    department_name: answer.addDepartment
                },
                function (err) {
                    if (err) console.log(err);
                    console.log("Your department was created successfully!");
                })
            console.log(answer)
            homeScreen();

        });
};

function viewRoles() {
    connection.query("SELECT * FROM employee_role", function (err, res) {
        if (err) console.log(err);
        // Log all results of the SELECT statement
        console.table(res);
        homeScreen();
    });
};

function addRole() {
    let current_id = 1
    let department_list = [];
    connection.query("SELECT * FROM employee_role", function (err, res) {
        if (err) console.log(err);
        current_id = (res.slice(-1).pop()).id; //finds current id
    });
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) console.log(err);
        res.forEach(department => {
            department_list.push(department.department_name);
        });
    });

    inquirer
        .prompt([
            {
                name: "addRole",
                type: "input",
                message: "What is the job title that you would you like to add?",
            },
            {
                name: "addRole_salary",
                type: "input",
                message: "What is the salary for the job that you're adding?",
            },
            {
                name: "addRole_department",
                type: "list",
                message: "What department is the job in?",
                choices: department_list,

            },
        ])
        .then(function (answer) {

            connection.query(
                "INSERT INTO employee_role SET ?",
                {
                    id: (current_id + 1),
                    title: answer.addRole,
                    department_name: answer.addRole_department, //needs to be a variable
                    salary: answer.addRole_salary,
                },
                function (err) {
                    if (err) console.log(err);
                    console.log("Your role was created successfully!");
                })
            homeScreen();
        });
};



function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) console.log(err);
        // Log all results of the SELECT statement
        console.table(res);
        homeScreen();
    });
};


function addEmployee() {
    let current_id = 1
    let role_list = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) console.log(err);
        current_id = (res.slice(-1).pop()).id; //finds current id
    });
    connection.query("SELECT * FROM employee_role", function (err, res) {
        if (err) console.log(err);
        res.forEach(employee_role => {
            role_list.push(employee_role.title);
        });
    });

    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is new Employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is new Employee's last name?",
            },
            {
                name: "select_role",
                type: "list",
                message: "What job are they hired for?",
                choices: role_list
            },
            {
                name: "employee_manager",
                type: "input",
                message: "What is the ID of this employee's manager?",
            },
        ])
        .then(function (answer) {

            connection.query(
                "INSERT INTO employee SET ?",
                {
                    id: (current_id + 1),
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_title: answer.select_role,
                    manager_id: answer.employee_manager, //needs to be a variable
                },
                function (err) {
                    if (err) console.log(err);
                    console.log("Your role was created successfully!");
                })
            homeScreen();
        });
};

function updateRole() {
    let role_list = [];
    connection.query("SELECT * FROM employee_role", function (err, res) {
        if (err) console.log(err);
        res.forEach(employee_role => {
            role_list.push(employee_role.title);
        });
    });
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) console.log(err);
        // Log all results of the SELECT statement
        inquirer
            .prompt([
                {
                    name: "select_employee",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].first_name);
                        }
                        console.log("res" + res)
                        return choiceArray;
                    },
                    message: "What Employee would you like to change the job for?"
                },
                {
                    name: "select_role",
                    type: "list",
                    message: "What is there new job?",
                    choices: role_list
                },
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenEmployee;
  
                for (var i = 0; i < res.length; i++) {
                    if (res[i].first_name === answer.select_employee) {
                        chosenEmployee = res[i];
                        connection.query(
                            "UPDATE employee SET ? WHERE ?",
                            [
                                { role_title : answer.select_role },
                                { first_name: chosenEmployee.first_name }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("Role updated!");
                                homeScreen();
                            }
                        )
                    }
                }
            });
    });


};