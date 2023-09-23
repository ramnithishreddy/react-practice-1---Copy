import React, { useState } from 'react';

const EmployeeForm = () => {
  const [ showform, setShowForm ] = useState(true)
  const [ submitdata, setSubmitData ] = useState([])
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    Designation: '',
    contact: '',
    address: '',
    Dateofbirth: '',
    email: '',
    skills: [],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      const updatedSkills = checked
        ? [...employeeData.skills, value]
        : employeeData.skills.filter((skill) => skill !== value);

      setEmployeeData({ ...employeeData, skills: updatedSkills });
    }  else if (type === 'number') {
      setEmployeeData({ ...employeeData, [name]: parseFloat(value) });
    }  else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitData([...submitdata, employeeData]);
    setEmployeeData({
      firstName: '',
      lastName: '',
      gender: '',
      Designation: '',
      contact: '',
      address: '',
      Dateofbirth: '',
      email: '',
      skills: [],
    });
    setShowForm(false)
  };
  const isformEmpty = () => {
    return (
      Object.values(employeeData).some(value => value === '') ||
      employeeData.skills.length === 0
    )
  }
  const handleshowform = () => {
    setShowForm(showform === true ? false : true)
  }

  return (
    <div>
   {/*  { showform ?  */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                placeholder='First Name'
                value={employeeData.firstName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                placeholder='Last Name'
                value={employeeData.lastName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Gender:
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={employeeData.gender === 'male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={employeeData.gender === 'female'}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={employeeData.gender === 'other'}
                  onChange={handleChange}
                />
                Other
              </label>
            </label>
          </div>
          <div>
            <label>
              Designation:
              <select
                name="Designation"
                value={employeeData.Designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="hr manager">HR Manager</option>
                <option value="ui developer">UI Developer</option>
                <option value="ui designer">UI Designer</option>
                <option value="data analyst">Data Analyst</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Contact:
              <input
                type="number"
                name="contact"
                placeholder='Contact'
                value={employeeData.contact}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Address:
              <textarea
                name="address"
                placeholder='Address'
                value={employeeData.address}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Date of birth:
              <input
                type="date"
                name="Dateofbirth"
                value={employeeData.Dateofbirth}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={employeeData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Skills:
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="HTML5"
                  checked={employeeData.skills.includes('HTML5')}
                  onChange={handleChange}
                />
                HTML5
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="CSS"
                  checked={employeeData.skills.includes('CSS')}
                  onChange={handleChange}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="JavaScript"
                  checked={employeeData.skills.includes('JavaScript')}
                  onChange={handleChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="C"
                  checked={employeeData.skills.includes('C')}
                  onChange={handleChange}
                />
                C
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="C++"
                  checked={employeeData.skills.includes('C++')}
                  onChange={handleChange}
                />
                C++
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="Java"
                  checked={employeeData.skills.includes('Java')}
                  onChange={handleChange}
                />
                Java
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="Python"
                  checked={employeeData.skills.includes('Python')}
                  onChange={handleChange}
                />
                Python
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="React"
                  checked={employeeData.skills.includes('React')}
                  onChange={handleChange}
                />
                React
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="Angular"
                  checked={employeeData.skills.includes('Angular')}
                  onChange={handleChange}
                />
                Angular
              </label>
            </label>
          </div>
          <div>
            <button type="submit" disabled={isformEmpty()}>Submit</button>
          </div>
        </form>
 
 { submitdata.length > 0 ?
      <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Designation</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Date of Birth</th>
          <th>Email</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
      {submitdata.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.gender}</td>
              <td>{item.Designation}</td>
              <td>{item.contact}</td>
              <td>{item.address}</td>
              <td>{item.Dateofbirth}</td>
              <td>{item.email}</td>
              <td>{item.skills.join(', ')}</td>
            </tr>
          ))}
          <td><button onClick={handleshowform}> {showform ?  "hideform" : "showform" }</button></td>
      </tbody>
    </table>
    : 'Data Not Found'
}
    </div>
  );
};

export default EmployeeForm;