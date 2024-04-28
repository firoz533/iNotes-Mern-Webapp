import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (msg,type) =>{
    setAlert({
      msg:msg,
      type:type
    });
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  
  return (
    <div className="App" style={{ backgroundColor: '#f8f9fa' ,minHeight:"100dvh" }}>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path='/' element={<Home  alert={alert} showAlert={showAlert}/>} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login alert={alert} showAlert={showAlert}/>} />
            <Route exact path='/signup' element={<Signup alert={alert} showAlert={showAlert}/>} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
