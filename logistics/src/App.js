import React, {Fragment,useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import NavBar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import axios from 'axios'
import PendingOrders from './pages/PendingOrders/PendingOrders';
import FulfilledOrders from './pages/FulfilledOrders/FulfilledOrders';
import CancelledOrders from './pages/CancelledOrders/CancelledOrders';
import OrderUpdate from './pages/OrderUpdate/OrderUpdate'
import OrderDetails from './pages/OrderDetails/OrderDetails'

function App() {

  const clientRootUrl = "http://localhost:7000/";
  const apiRootUrl = "http://localhost:9000/";
  const token = localStorage.getItem('wpt');
  const errorMessage = "An error occured. Please try again!";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myClass,setMyClass] = useState('');

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
      axios.get(`${apiRootUrl}logistics/verify`,{
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
          <NavBar toggleSidebar = {toggleSidebar} clientRootUrl = {clientRootUrl} />
          <Sidebar  myClass = {myClass} closeSidebar = {closeSidebar} clientRootUrl = {clientRootUrl} />
          <ScrollToTop />
          <Switch>
            <Route path = "/" exact = {true} component = {()=><Home apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} />}/>
            <Route path = "/login" component = { ()=><Login apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  token = {token} errorMessage = {errorMessage} verifyAuth = {verifyAuth} />} />
            <Route path = "/pending-orders" component = {()=><PendingOrders apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  token = {token} errorMessage = {errorMessage} requireAuth = {requireAuth} />} />
            <Route path = "/fulfilled-orders" component = {()=><FulfilledOrders apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  token = {token} errorMessage = {errorMessage} requireAuth = {requireAuth} />} />
            <Route path = "/cancelled-orders" component = {()=><CancelledOrders apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  token = {token} errorMessage = {errorMessage} requireAuth = {requireAuth} />} />
          <Route path = "/update/order/:orderId" exact = {true} component = {({match})=><OrderUpdate apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} match = {match} />} />
          <Route path = "/order/:orderId" exact = {true} component = {({match})=><OrderDetails apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} match = {match} />} />
          
          <Route path = "/logout" exact = {true} component = {()=><Logout requireAuth = {requireAuth} />} />
          <Route render = {()=>{
            return (
                <Fragment>
                  <main>
                    <div className = "main__container">
                      <h1>404 Error: Page Not Found</h1>
                    </div>
                  </main>
                </Fragment>
              )
            }}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;