import React, {useState , useEffect } from 'react'
import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts'

const Apicalling = () => {
  const [ data, setData ] = useState([])
  const [ axiosdata, setAxiosData ] = useState([])
  const [ ndata, setNdata ] = useState({
    id: '',
    name: '',
    issue: '',
    reason: ''
  })
  const [ addEm, setAddEm ] = useState(false)
  const [ btn, setBtn ] = useState(false)
  const [ Update, setUp ] = useState(null)
  const [ id, setId ] = useState(0)
  const [ load, setLoad ] = useState(false)

   useEffect(() => {
    setTimeout(() =>{
    axios.get(url).then(res => setAxiosData(res.data)) 
    setLoad(true)
   }, 2000)
  
  },[])

   const Deletedata = (id) => {
    let filterdata = data.filter(items => items.id !== id)
    setData(filterdata)
   }

   const Updatedata = (id) => {
    setUp(id)
    let edit = data.find(items => items.id === id)
    setNdata({ ...edit})
    setAddEm(true)
   }

   const AddData = () => {
    setUp(null)
    setAddEm(true)
   }

   const change = (e) => {
    setNdata({ ...ndata,[e.target.name]: e.target.value} )
   }

   const Submit = (e) => {
    e.preventDefault()
    if(Update !== null){
      setData((prev) =>
      prev.map((item) => item.id === Update ? ndata : item))
    } else{
      setId(id + 1)
      setData((prev) => [ ...prev,{...ndata, id: id + 1 }])
      setBtn(true)
    }
    setNdata({ id:'', name:'', issue:'', reason:''})
    setUp(null)
    setAddEm(false)
   }

  return (      
    <>
    <h1>Updation</h1>
   {
    data.length > 0 ? 
      <table>
      <thead>
        <th>id</th>
        <th>name</th>
        <th>issue</th>
        <th>reason</th>
        <th>Delete Operation</th>
        <th>Update Operation</th>
      </thead>
      <tbody>
        {
          data.map(items => {
            return(
              <tr>
                <td>{items.id}</td>
                <td>{items.name}</td>
                <td>{items.issue}</td>
                <td>{items.reason}</td>
                <td><button onClick={() => Deletedata(items.id)}> Delete </button></td>
                <td><button onClick={() => Updatedata(items.id)}> Update </button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    :  ''
   }
    {
      addEm ? (
        <form onSubmit={Submit}>
          <input type='text' name='name' placeholder='Enter your name' value={ndata.name} onChange={change} required />
          <input type='text' name='issue' placeholder='Enter your issue' value={ndata.issue} onChange={change} required />
          <input type='text' name='reason' placeholder='Enter your reason' value={ndata.reason} onChange={change} required />
          <button type='submit'>{btn ? 'Update' : 'save'}</button>
        </form>
      ) : (
        <button onClick={AddData}> Add Data </button>
      )
    }
    { load    ? 
<table>
      <thead>
        <th>userId</th>
        <th>id</th>
        <th>title</th>
        <th>body</th>
      </thead>
      <tbody>
        {
          axiosdata.splice(0,14).map(items => {
            return(
              <tr key={items.id}>
                <td>{items.userId}</td>
                <td>{items.id}</td>
                <td>{items.title}</td>
                <td>{items.body}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
   : 
   'Loading...'
}
    </>

  )
     
}
 export default Apicalling