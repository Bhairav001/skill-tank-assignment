import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
// import WithSubnavigation from './components/WithSubnavigation';

function App() {
  return (
    <Routes>
       {/* <Route path='/' element={<WithSubnavigation/>}></Route> */}
       <Route path='/' element={<Signup/>}></Route>
       <Route path='/register' element={<Signup/>}></Route>
       <Route path='/login' element={<Login/>}></Route>
    </Routes>
  );
}

export default App;
