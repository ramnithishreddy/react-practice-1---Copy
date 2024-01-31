import React from "react";
//import  ReactDOM  from 'react-dom/client';

const Home = () => {
  const Employees = [
    {
      Name: "Ram Nithish",
      Eid: 2023032,
      Date: "24-05-2023",
      age: 22,
      Gender: "Male",
      Location: "Vijayawada",
      status: true,
    },
    {
      Name: "Manikanta",
      Eid: 2022521,
      Date: "21-12-2022",
      age: 21,
      Gender: "Male",
      Location: "Chittoor",
      status: true,
    },
    {
      Name: "Sangeetha",
      Eid: 2022852,
      Date: "24-11-2022",
      age: 21,
      Gender: "Female",
      Location: "Hyderabad",
      status: true,
    },
    {
      Name: "Mayur",
      Eid: 2020245,
      Date: "24-11-2020",
      age: 30,
      Gender: "Male",
      Location: "Rajasthan",
      status: true,
    },
    {
      Name: "Ravi kumar",
      Eid: 2023045,
      Date: "02-05-2023",
      age: 22,
      Gender: "Male",
      Location: "Vijayawada",
      status: false,
    },
    {
      Name: "Sathish",
      Eid: 2023012,
      Date: "12-01-2023",
      age: 23,
      Gender: "Male",
      Location: "Vijayawada",
      status: false,
    },
    {
      Name: "Rajiv",
      Eid: 2023001,
      Date: "24-04-2023",
      age: 23,
      Gender: "Male",
      Location: "Vijayawada",
      status: false,
    },
  ];

  /*const fEmployees = []
   for(let i=0; i<Employees.length ; i++){
     const employee = Employees[i]
     if(status){
      if(employee.status){
        fEmployees.push(employee)
      }
      else{
        fEmployees.push(employee)
      }
         
     }
   }*/

  const fEmployees = Employees.filter((employee) => employee.status);

  return (
    <div className="home">
      <h1>Employees</h1>

      {/* First Table */}
      <h2>First Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Eid</th>
            <th>Date</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {Employees.map((employee) => (
            <tr key={employee.Eid}>
              <td>{employee.Name}</td>
              <td>{employee.Eid}</td>
              <td>{employee.Date}</td>
              <td>{employee.age}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Second Table */}
      <h2>Second Table </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Eid</th>
            <th>Date</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fEmployees.map((employee) => (
            <tr key={employee.Eid}>
              <td>{employee.Name}</td>
              <td>{employee.Eid}</td>
              <td>{employee.Date}</td>
              <td>{employee.age}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Location}</td>
              <td>{employee.status ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Third Table */}
      <h2>Third Table </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Eid</th>
            <th>Date</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Employees.map((employee) => (
            <tr key={employee.Eid}>
              <td>{employee.Name}</td>
              <td>{employee.Eid}</td>
              <td>{employee.Date}</td>
              <td>{employee.age}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Location}</td>
              <td className={employee.status ? "active" : "inactive"}>
                {employee.status ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

/* import React from 'react';
import './Home.css';

const Home = ({ Employees, status, sstatus }) => {
  //const fEmployees = Employees.filter((employee) => employee.status);

  return (
    <div className="home">
      <h1>Employees Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Eid</th>
            <th>Date</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Location</th>
            {status && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {Employees.map((employee) => (
            <tr key={employee.Eid}>
              <td>{employee.Name}</td>
              <td>{employee.Eid}</td>
              <td>{employee.Date}</td>
              <td>{employee.age}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Location}</td>
              {status && (
                <td className={employee.status ? 'active' : 'inactive'}>
                  {sstatus ? (
                    <span className={employee.status ? 'active-status' : 'inactive-status'}>
                      {employee.status ? 'Active' : 'Inactive'}
                    </span>
                  ) : (
                    employee.status ? 'Active' : 'Inactive'
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;



   
   /* const[a1]=items
    const num=[1,2,3]9760255952
    const num1=[4,5,6]
    const numadd=[...num, ...num1]
    const x =5 
    const myElement= <h1>{(x)< 10 ? "Hello" : "Good Bye" }</h1>
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(myElement)

    return (
      <div>
        <h1>Home</h1>
        {
            items.map((items) => {
            return <h1>{items}</h1>;
          })
        }
        {
            <h1>{a1}</h1>
        }
      </div>
    );
  };*/
