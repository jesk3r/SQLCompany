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
    getDepartmentsList()
    getEmployeesList()
    getRolesList()

    inquirer.prompt(questions).then((response) => {
       
        if(response.userAction === 'view all departments'){
            showAllDepartments()
        }

        if(response.userAction === 'view all roles'){
            showAllRoles()
        }

        if(response.userAction === 'view all employees'){
            showAllEmployees()
        }

    
        if(response.userAction !== 'quit'){
            q = true;
            return AskUserOptions();
        }

    })
}

async function UserAddDeparment(newData){
    promisPool.query(`INSERT INTO Deparment (deparment_name) Values (${departmentName})`)
}

async function UserAddRole(NewData){

}

async function UseraddEmployee(NewData){

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

        // showAllDepartments()
        
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
    
    // console.log(RoleList)
    
    RoleList.forEach((element) => {
        console.log(`${String(element.role_id).padEnd(2)} ${String(element.role_title).padEnd(16)}${ String((DeparmentList.find((ele) => ele.deparment_id === element.department_id)).deparment_name).padEnd(16) }${element.role_salary}`)
    })

    console.log('\n')
}

function showAllEmployees(){
    
    // console.log( (RoleList.find((e) => e.role_id === 3)).role_salary)

    console.log('id first_name last_name department   salary  manager')
    console.log('-- ---------- --------- -----------  -------  --------')


    EmployeeList.forEach((element) => {
        console.log(`${element.employee_id} ${element.employee_first_name.padEnd(11)} ${element.employee_last_name.padEnd(9)} ${ (RoleList.find((ele) => ele.role_id === element.role_id) ).role_salary.padEnd(11) }`)
    })

}


AskUserOptions()

console.log('zxcvzxcv')

