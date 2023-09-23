import React, { useState } from "react";
function Table() {
  let [empinfo, setinfo] = useState([
    {
      Name: "Ram Nithish",
      Eid: 2023032,
      Date: "2023-05-24",
      age: 22,
      Gender: "Male",
      Location: "Vijayawada",
    },
    {
      Name: "Manikanta",
      Eid: 2022521,
      Date: "2022-12-21",
      age: 21,
      Gender: "Male",
      Location: "Chittoor",
    },
    {
      Name: "Sangeetha",
      Eid: 2022852,
      Date: "2022-11-22",
      age: 21,
      Gender: "Female",
      Location: "Hyderabad",
    },
    {
      Name: "Mayur",
      Eid: 2020245,
      Date: "2020-11-24",
      age: 30,
      Gender: "Male",
      Location: "Rajasthan",
    },
    {
      Name: "Ravi kumar",
      Eid: 2023045,
      Date: "2023-05-03",
      age: 22,
      Gender: "Male",
      Location: "Vijayawada",
    },
    {
      Name: "Sathish",
      Eid: 2023012,
      Date: "2023-01-23",
      age: 23,
      Gender: "Male",
      Location: "Vijayawada",
    },
    {
      Name: "Rajiv",
      Eid: 2023001,
      Date: "2023-04-24",
      age: 23,
      Gender: "Male",
      Location: "Vijayawada",
    },
  ]);

  const [display, setDisplay] = useState("");
  const [ndata, setNdata] = useState({
    Name: "",
    Eid: "",
    Date: "",
    age: "",
    Gender: "",
    Location: "",
  });
  const [addEm, setAddEm] = useState(false);
  const [btn, setBtn] = useState(false);
  const [Update, setUp] = useState(null);

  const displaydata = (emp) => {
    setDisplay(emp);
  };
  const DeleteData = (Eid) => {
    let filterData = empinfo.filter((items) => items.Eid !== Eid);
    setinfo(filterData);
  };
  const Updatedata = (Eid) => {
    setUp(Eid);
    let edit = empinfo.find((items) => items.Eid === Eid);
    setNdata({ ...edit });
    setAddEm(true);
  };
  const AddData = () => {
    setUp(null);
    setAddEm(true);
  };
  const change = (e) => {
    setNdata({ ...ndata, [e.target.name]: e.target.value });
  };

  const Submit = (e) => {
    e.preventDefault();
    if (Update !== null) {
      setinfo((prev) =>
        prev.map((item) => (item.Eid === Update ? ndata : item))
      );
    } else {
      setinfo((prev) => [...prev, { ...ndata }]);
      setBtn(true);
    }
    setNdata({
      Name: "",
      Eid: "",
      Date: "",
      age: "",
      Gender: "",
      Location: "",
    });
    setUp(null);
    setAddEm(false);
  };

  return (
    <div>
      <h2>Employee Data </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Eid</th>
            <th>Date</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Delete Operation</th>
            <th>Update Operation</th>
          </tr>
        </thead>
        <tbody>
          {empinfo.map((emp) => (
            <tr key={emp.Eid} onClick={() => displaydata(emp)}>
              <td>{emp.Name}</td>
              <td>{emp.Eid}</td>
              <td>{emp.Date}</td>
              <td>{emp.age}</td>
              <td>{emp.Gender}</td>
              <td>{emp.Location}</td>
              <td>
                <button onClick={() => DeleteData(emp.Eid)}>Delete</button>
              </td>
              <td>
                <button onClick={() => Updatedata(emp.Eid)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h6>
        Name : {display.Name} Eid : {display.Eid} Date of Joining :{" "}
        {display.Date} Age : {display.age} Gender : {display.Gender} Location :{" "}
        {display.Location}
      </h6>

      {addEm ? (
        <form onSubmit={Submit}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={ndata.Name}
            onChange={change}
            required
          />
          <input
            type="number"
            name="Eid"
            placeholder="Eid"
            value={ndata.Eid}
            onChange={change}
            required
          />
          <input
            type="date"
            name="Date"
            value={ndata.Date}
            onChange={change}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={ndata.age}
            onChange={change}
            required
          />
          <input
            type="text"
            name="Gender"
            placeholder="Gender"
            value={ndata.Gender}
            onChange={change}
            required
          />
          <input
            type="text"
            name="Location"
            placeholder="Location"
            value={ndata.Location}
            onChange={change}
            required
          />
          <button type="submit">{btn ? "Update" : "save"}</button>
        </form>
      ) : (
        <button onClick={AddData}>Add Employee</button>
      )}
    </div>
  );
}

export default Table;
