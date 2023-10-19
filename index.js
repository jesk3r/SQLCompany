const inquirer = require('inquirer');
const mysql = require('mysql2');

var q = false
var actionChoices = [
  "view all departments",
  "view all roles",
  "view all employees",
  "add a department",
  "add a role",
  "add an employee",
  "update an employee role",
  "quit",
];

const employeeQuary = `SELECT Employee.employee_id, Employee.employee_first_name, Employee.employee_last_name, role_title, deparment_name, role_salary, manenger.employee_first_name as manenger
FROM Employee JOIN Role 
on Role.role_id = Employee.role_id
LEFT JOIN Deparment 
on Role.department_id = Deparment.deparment_id
LEFT JOIN Employee as manenger
ON manenger.employee_id = Employee.manenger_id `

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
    password: 'password',
    database: 'company_mod12',
    connectionLimit: 10, // You can adjust the connection limit as needed.
});

var promisPool = connection.promise()

function updateDataTable(){
    // getDepartmentsList()
    // getEmployeesList()
    // getRolesList()
    console.log('updated tables')
}

// updateDataTable()

//Select Employee.employee_first_name,Deparment.deparment_name from Employee Join Role ON Employee.role_id = Role.role_id Join Deparment on Deparment.deparment_id = Role.department_id;

function AskUserOptions(){
   

    inquirer.prompt(questions).then((response) => {
       
        if(response.userAction === 'add a department'){
            // askUserAddDepartment()
            const deparmentQuestions = [
            {
                type: 'input',
                message: 'What is the name of the department:',
                name: 'departmentName',
              
            }]
           
            inquirer.prompt(deparmentQuestions).then( (response) =>
                {
                    console.log(response)
                    promisPool.query(`INSERT INTO Deparment (deparment_name) Values ('${response.departmentName}')`)
                }
            ).then(AskUserOptions)

        }
        
        if(response.userAction === 'add a role'){
            

            promisPool.query('SELECT * FROM Deparment;').then(result => {
    
                [data, schemea] = result;
                
                let deparment = data.map(role => role.deparment_name)
                
                const roleQuestions = [
                    {
                        type: 'input',
                        message: 'What is the name of the role:',
                        name: 'roleName',
                      
                    }, 
                    {
                        type: 'number',
                        message: 'What is the salary of the role:',
                        name: 'roleSalary',
                      
                    }, 
                    {
                        type: 'list',
                        message: 'What department does the role belong to:',
                        name: 'department',
                        choices: deparment
                    },

                    ] 

                   
                    inquirer.prompt(roleQuestions).then( (response) =>{
                        // console.log(data)
                        chosenDeparment = data.find((element) => element.deparment_name === response.department)
                        console.log(response)
                        // console.log(`INSERT INTO Role (role_title,role_salary,department_id) Values '('${response.roleName}, ${response.roleSalary}, ${chosenDeparment.deparment_id}')'`)
                        promisPool.query(`INSERT INTO Role (role_title,role_salary,department_id) Values ('${response.roleName}', ${response.roleSalary}, ${chosenDeparment.deparment_id});`)

                        }
                        
                    ).then(AskUserOptions)
             }
            )

        }

        if(response.userAction === 'add an employee'){
            
            promisPool.query('SELECT * FROM Role; ').then(roleResult => {
                [data, schemea] = roleResult;
                
                let roles = data.map(role => role.role_title)

                promisPool.query('SELECT * FROM Employee; ').then( (employeeResult) => {
                   
                    [Employeedata, Emplooyeeschemea] = employeeResult;
                    
                    let employeeFristName = Employeedata.map(employee => employee.employee_first_name)
                    employeeFristName.push('None')
                    console.log(employeeFristName)

                    const employeeQuestions = [
                        {
                            type: 'input',
                            message: 'What is the employees first name?:',
                            name: 'FirstName',
                          
                        }, 
                        {
                            type: 'input',
                            message: 'What is the employees last name?',
                            name: 'LastName',
                          
                        }, 
                        {
                            type: 'list',
                            message: 'What role would you give',
                            name: 'role',
                            choices: roles
                        },
                        {
                            type: 'list',
                            message: 'Who is their manenger',
                            name: 'manenger',
                            choices: employeeFristName
                        },
    
                        ]
                        
                    inquirer.prompt(employeeQuestions).then((response) => {
                        // add employee
                        
                        chosenRole = data.find((element) => element.role_title === response.role)



                        if(response.manenger != 'None'){
                            chosenManenger = Employeedata.find((element) => element.employee_first_name === response.manenger)
                            promisPool.query(`INSERT INTO Employee (employee_first_name,employee_last_name,role_id,manenger_id) Values ('${response.FirstName}','${response.LastName}',${chosenRole.role_id},${chosenManenger.employee_id})`)
                        }else{
                            promisPool.query(`INSERT INTO Employee (employee_first_name,employee_last_name,role_id) Values ('${response.FirstName}', '${response.LastName}',${chosenRole.role_id})`)
                        }
                    }).then(AskUserOptions)
                } )
             }
            )


           
           
        }

        if(response.userAction === 'view all roles'){
            promisPool.query('SELECT role.role_id, role.role_title, role.role_salary, deparment_name FROM `Role` INNER JOIN `Deparment` on deparment_id = role_id; ').then(result => {
    
                [data, schemea] = result;
                
                RoleList = data
                
                console.log('id title           department      salary')
                console.log('-- -------------   -----------     -------')
                
                // console.log(RoleList)
                
                RoleList.forEach((element) => {
                    console.log(`${String(element.role_id).padEnd(2)} ${String(element.role_title).padEnd(16)}${ String( element.deparment_name).padEnd(16) }${element.role_salary}`)
                })
            
                console.log('\n')
        
             }
            ).then(AskUserOptions);
        }

        if(response.userAction === 'view all employees'){
            promisPool.query(employeeQuary).then(result => {

                [data, schemea] = result;
            
                EmployeeList = data
                
                console.log('id first_name last_name     department   salary   manager')
                console.log('-- ---------- -----------   -----------  -------  --------')
            
               
                EmployeeList.forEach((element) => {
                    console.log(`${String(element.employee_id).padEnd(2)} ${element.employee_first_name.padEnd(11)} ${element.employee_last_name.padEnd(13)} ${ element.deparment_name.padEnd(12) } ${ element.role_salary.padEnd(9) } ${element.manenger}`)
                    
                })

                console.log('\n')

            }).then(AskUserOptions)
        }

        if(response.userAction === 'view all departments'){
            promisPool.query("SELECT * FROM Deparment;").then((result) => {
        
                [data, schemea] = result;
        
                DeparmentList = data
        
                console.log('got department list')
                
                console.log('id name')
                console.log('-- -------------')
                
                DeparmentList.forEach((element) => {
                  console.log(`${element.deparment_id}  ${element.deparment_name}`)
                })

                console.log('\n')

            }).then(AskUserOptions);
        }

        if(response.userAction === 'update an employee role'){
            promisPool.query('SELECT * FROM Employee;').then( (result) =>{
                [Employeedata, schemea] = result;

                employeeName = Employeedata.map( d =>  d.employee_first_name.concat(" ", d.employee_last_name))
                


                promisPool.query('SELECT * FROM Role;').then( (roleResult) =>{

                    [data, schemea] = roleResult;
                    
                    let roles = data.map(role => role.role_title)



                    updateChoices = [{
                        type: 'list',
                        message: 'Who would you like to update?:',
                        name: 'employee',
                        choices: employeeName
                    },
                    {
                        type: 'list',
                        message: 'New role to assign?:',
                        name: 'role',
                        choices: roles
                    }]

                    
                 

                    inquirer.prompt(updateChoices).then((response) => {
                        // promisPool.query(`UPDATE Employee SET role_id = ${1} WHERE CustomerID = {1};`).then()
                        // firstname = response.employee.split(' ')

                        // console.log(firstname)

                        chosenRole = data.find((element) => element.role_title === response.role)
                        chosenEmployeee = Employeedata.find((element) => element.employee_first_name == response.employee.split(" ")[0])
                        // console.log(chosenEmployeee)
                        // console.log(chosenRole)
                        
                        
                        promisPool.query(`UPDATE Employee SET Employee.role_id = ${chosenRole.role_id} WHERE Employee.employee_id = ${chosenEmployeee.employee_id};`).then(AskUserOptions)

                    })
                    }
                
                )   
            })
        }
    
        if(response.userAction === 'quit'){
            q = true;
            process.exit()
            // return AskUserOptions();
        }

    })

    // updateDataTable()
}





AskUserOptions()
