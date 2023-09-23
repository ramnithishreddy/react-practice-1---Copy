import React from 'react';
import './App.css'
import Home from './amazon/Home'
import Grocery from './amazon/Grocery'
import Mobiles from './amazon/Mobiles'
import Fashion from './amazon/Fashion'
import ItemDetails from './amazon/ItemDetails';
import Cart from './amazon/Cart';
/* import Table from './Pages/Table';
import Layout from './Pages/Layout';
import EmployeeForm from './Pages/EmployeeForm';
import Contact from './Pages/Contact';
import Apicalling  from './Pages/Apicalling';
import Home from './Pages/Home'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Checkout from './amazon/Checkout';
import Nav from './amazon/Nav'
 /* import Parentcom from './components/Parentcom'; */
 /* import Homework from './components/Homework' */

const App = () => {
  return (
   
   

  <BrowserRouter>
      <div className='App'>
        <h1> amazon </h1>
        <Nav />
       {/*  <Homework /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Grocery' element={<Grocery />} />
          <Route path='Mobiles' element={<Mobiles />} />
          <Route path='Fashion' element={<Fashion />} />
          <Route path='ItemDetails' element={<ItemDetails />} />
          <Route path='Cart' element={<Cart />} />
          <Route path='Checkout' element={<Checkout />} />
  </Routes>
        {/*  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route path='Home' element={<Home />}/>
      <Route path='Table' element={<Table />}/>
      <Route path='Apicalling' element={<Apicalling />}/>
      <Route path='EmployeeForm' element={<EmployeeForm />}/>
      <Route path='Contact' element={<Contact />}/>
      </Route>
    </Routes>
    </BrowserRouter> */}

    {/*    <Parentcom />  */}
      </div>
      </BrowserRouter>
     
  )
  }
  export default App;
 

/*   const Employees = [
   {Name:'Ram Nithish',Eid: 2023032, Date: '24-05-2023', age: 22, Gender: 'Male',   Location: 'Vijayawada', status: true },
   {Name:'Manikanta',  Eid: 2022521, Date: '21-12-2022', age: 21, Gender: 'Male',   Location: 'Chittoor',   status: true },
   {Name:'Sangeetha',  Eid: 2022852, Date: '24-11-2022', age: 21, Gender: 'Female', Location: 'Hyderabad',  status: true },
   {Name:'Mayur',      Eid: 2020245, Date: '24-11-2020', age: 30, Gender: 'Male',   Location: 'Rajasthan',  status: true },
   {Name:'Ravi kumar', Eid: 2023045, Date: '02-05-2023', age: 22, Gender: 'Male',   Location: 'Vijayawada', status: false },
   {Name:'Sathish',    Eid: 2023012, Date: '12-01-2023', age: 23, Gender: 'Male',   Location: 'Vijayawada', status: false },
   {Name:'Rajiv',      Eid: 2023001, Date: '24-04-2023', age: 23, Gender: 'Male',   Location: 'Vijayawada', status: false },
 ]; */
/*  let [showContent, setContent] = useState(true)
 const [count, setCount] = useState(0)
 let [name, setName] = useState('RAM')
 const [carDetails, setCarDetails] = useState({
   carName: 'Benz',
   carColor: 'White',
   carModel: '2019',
   carCost:  '50lac'
 })
 let { carName , carColor , carModel , carCost } = carDetails
 
 const handleClick = () => {
    setCount( count + 1 )
 }
 const ChangeName = () => {
   let s = name === 'RAM' ? 'NITHISH' : 'RAM'
    setName( s)
 }
 const ChangeColor = () => {
   setCarDetails(prev => {
     return {...prev, carColor: 'Black'}
    })
 }
const  hideData = () => {
   setContent(!showContent)
 }
 return (
   <div className={showContent? 'Hide':'Show'} >
     <h1>React Training</h1>

     {
       showContent ?

         <div>
           <button onClick={handleClick}> click me </button> {count}
           <h2>{ name }</h2>
           <button onClick={ChangeName}> Change Name </button> 

           <h2>{carName}</h2>
           <h2>{carColor}</h2>
           <h2>{carModel}</h2>
           <h2>{carCost}</h2>
           <button onClick = {ChangeColor} > Change color of car to Black </button>
          
         </div>
         : 'Data is Hidden'
     }
    
     <button onClick={hideData}>{showContent ? 'Hide' : 'Show'}</button> */
/* <Home /> */
/* <Table />
<Table2 /> */
/* <Home /> */


/* <List /> */
/* <h1>React  training</h1>
 
<Display name='sangeetha' data="A1" items={[2, 4, 5, 6, 7, 8, 6, 4, 6, 9, 7]} />

<Display name="nitish" isgoal={true} />


<Display name="manikinda" />

<Display name="mayur" />

<button onClick={message}>click me</button>

<button onClick={((event) => Shoot("gloal", event))}>shoot me</button> */

/* import './App.css';
import Home from './Home';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
    <h1>Hi Welcome to React JS</h1>
    <Home />
    <Navbar/>
    </div>
  );
}

export default App;
 */