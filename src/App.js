import logo from './logo.svg';
import './App.css';
import React from 'react';
import Menu from './Components/Menu';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import ProfileScreen from './Components/ProfileScreen';
import Create_Post from './Components/Create-Post';
import CreateBlog from './Components/Create-Blog';
import Blog from './Components/Blog';
class App extends React.Component {
 render(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Login title = 'Login' message = "Don't have Account " button = "Click Here"/>}/>
    <Route path='/homepage' element={<Menu/>} />
    <Route path='/profile' element={<ProfileScreen/>}/>
    <Route path='/create-post' element={<Create_Post/>}/>
    <Route path='/create-blog' element={<CreateBlog/>}/>
    <Route path='/blog' element={<Blog/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
}

export default App;
