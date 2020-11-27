import { Fragment, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Redirect, Route,Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import axios from 'axios'
import UserDetails from './pages/UserDetails/UserDetails'
import CreateCategory from './pages/CreateCategory/CreateCategory'

function App() {

  const clientRootUrl = "http://localhost:6200/";
  const apiRootUrl = "http://localhost:9000/";
  const token = localStorage.getItem('wpt');
  const errorMessage = "An error occured. Please try again!";

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

  function requireAuth() {
    const login = <Redirect to = "/login" />
    if(!token) {
      return login;
    } else {
      axios.get(`${apiRootUrl}admin/verify`,{
        headers:{
          Authorization:`Basic ${token}`
        }
      }).then(res=>{
        if(res.data.valid === 1) {

        } else {
          localStorage.removeItem('wpt');
          return login;
        }
      }).catch(err=>{
        return login;
      })
    }
  }

  function verifyAuth() {
    if(token) {
      return <Redirect to = "/" />
    }
  }


  return (
    <div className = "container">
      <Router>
          <NavBar toggleSidebar = {toggleSidebar}  />
          <Sidebar myClass = {myClass} closeSidebar = {closeSidebar} />
        <ScrollToTop />
        <Switch>
          <Route path = "/login" component = { ()=><Login apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  token = {token} errorMessage = {errorMessage} verifyAuth = {verifyAuth} />} /> 
          <Route path = "/" exact = {true} component = {()=><Main apiRootUrl = {apiRootUrl}  token = {token} requireAuth = {requireAuth} />}/>
          <Route path = "/users" exact = {true} component = {()=><Users apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} />} />
          <Route path = "/user/:userId" exact = {true} component = {({match})=><UserDetails apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} match = {match} errorMessage = {errorMessage} />} />
          {/* logo */}
          <Route path = "/create-category" exact = {true} component = {()=><CreateCategory apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} />} /> {/** redirect to categorydetails */}
          {/* categories, categorydetails, {{ products under it -> productDetails }} && all actions e.g. starred || [check_well] */}
          {/* orders, order -> [can update orders status] */}
          {/** search for users -> users, product, categories, orders */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;