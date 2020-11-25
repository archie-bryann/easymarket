import { Fragment, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';

function App() {

  const clientRoorUrl = "http://localhost:3000/";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myClass,setMyClass] = useState('');
  // const [loggedIn, setLoggedIn] = useState(true);

  function toggleSidebar() {
    if(!sidebarOpen) {
      setMyClass('sidebar_responsive');
      setSidebarOpen(true);
    }
  }

  function closeSidebar() {
    if(sidebarOpen) {
      setMyClass('');
      setSidebarOpen(false);
    }
  }

  return (
    <div className = "container">
      <Router>
          <NavBar toggleSidebar = {toggleSidebar}  />
          <Sidebar myClass = {myClass} closeSidebar = {closeSidebar} />
        <ScrollToTop />
        <Switch>
          <Route path = "/login" component = { ()=><Login clientRootUrl = {clientRoorUrl} />} /> 
          <Route path = "/" exact = {true} component = {Main}/>
          <Route path = "/users" exact = {true} component = {()=><Users />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;