import React,{useState, useEffect} from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';


const Home = () => {
 
  const Loc = useLocation()
  const [userInfo, setUserInfo] = useState(Loc.state);

  useEffect(() => {
    setUserInfo(Loc.state);
  }, [Loc.state]);
  
 // console.log(userInfo,'7')
 
 // console.log(userInfo,'1818Home')
  return (
    <div className='Style'>
       </div>
  );
};

export default Home;
