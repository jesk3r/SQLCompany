const inquirer = require('inquirer');
const mysql = require('mysql2');

var q = false
var actionChoices = ['view all departments','view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']

const questions = [
    {
        type: 'list',
        message: 'What would you like to do:',
        name: 'userAction',
        choices: actionChoices
    }
];

var EmployeeList
var RoleList
var DeparmentList

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Senorita4$',
    database: 'company_mod12',
    connectionLimit: 10, // You can adjust the connection limit as needed.
});

var promisPool = connection.promise()

function init(){


}

function AskUserOptions(){
    inquirer.prompt(questions).then((response) => {
       

    
        if(response.userAction !== 'quit'){
            q = true;
            return AskUser();
        }

    })
}

function askUserAddDeparment(){

}

function askUserAddRole(){}

function addEmployee(){}

data = [{
    deparment_name: 'Tech'
}]




async function insertDeparment(departmentName){
   promisPool.query(`INSERT INTO Deparment (deparment_name) Values (${departmentName})`)
   
}

async function insertRole(roleTitle, roleSalary, deparmentID){
    promisPool.query(`INSERT INTO Role (role_title, role_salary, department_id) Values (${roleTitle, roleSalary, deparmentID})`)
    
} 

async function insertEmployee(employeeFristName, employeeLastName, employeeManenger,){
    promisPool.query(`INSERT INTO Employee (employee_first_name, employee_last_name, manenger_id) Values (${employeeFristName, employeeLastName, employeeManenger})`)
    
}

async function getDepartmentsList(){
    promisPool.query("SELECT * FROM Deparment;").then((result) => {
        
        [data, schemea] = result;

        DeparmentList = data

        // console.log(DeparmentList)

        showAllDepartments()
    });
}

async function getRolesList(){
    promisPool.query('SELECT * FROM Role; ').then(result => {
    
        [data, schemea] = result;
        
        RoleList = data
       
        // console.log(RoleList)
     }
    )
}

async function getEmployeesList(){
    promisPool.query('SELECT * FROM Employee;').then(result => {

        [data, schemea] = result;
    
        EmployeeList = data
        
        // console.log(EmployeeList)
    })
}

function showAllDepartments(){
    

    console.log('id name')
        console.log('-- -------------')
        
    DeparmentList.forEach((element) => {
        console.log(`${element.deparment_id}  ${element.deparment_name}`)
    })
}

function showAllRoles(){
   

    console.log('id title           department      salary')
    console.log('-- -------------   -----------     -------')
    
    console.log(RoleList)
    
    RoleList.forEach((element) => {
        console.log(`${element.role_id}  ${element.role_title}                         ${element.role_salary}`)
    })

    
}

function showAllEmployees(){
    

    [data, schemea] = result;

   
    console.log('id first_name last_name  title            department   salary  manager')
    console.log('-- ---------- ---------  -------------    -----------  -------  --------')


    EmployeeList.forEach((element) => {
        console.log(`${element.deparment_id}  ${element.deparment_name}`)
    })

}

// insertTable()

getDepartmentsList()
getRolesList()
getEmployeesList()

// showAllDepartments()
// showAllRoles()
// showAllEmployees()

console.log('zxcvzxcv')

