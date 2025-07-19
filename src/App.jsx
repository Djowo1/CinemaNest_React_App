import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const navigate = useNavigate();

useEffect(()=>{
onAuthStateChanged(auth, async (user) =>{
if(user){
  console.log("Logged In");
  navigate('/');
}else{
  console.log("Logged Out")
  navigate('/login');
}
})
}, [])

  return (
    <div>
      <ToastContainer theme='dark' />
     <Router>
       <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/login' element={ <Login />}/>
        <Route path='/player/:id' element={ <Player />}/>
      </Routes>
      </Router>
    
    </div>
  )
}

export default App;
