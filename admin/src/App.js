import { Fragment, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter as Router, Redirect, Route,Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import axios from 'axios'
import UserDetails from './pages/UserDetails/UserDetails'
import CreateCategory from './pages/CreateCategory/CreateCategory'
import CategoryDetails from './pages/CategoryDetails/CategoryDetails'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Categories from './pages/Categories/Categories';
import AddProduct from './pages/AddProduct/AddProduct';
import Orders from './pages/Orders/Orders';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import OrderUpdate from './pages/OrderUpdate/OrderUpdate';
import Logout from './pages/Logout/Logout';
import Search from './pages/Search/Search';

function App() {

  const clientRootUrl = "http://localhost:6200/";
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
        <NavBar toggleSidebar = {toggleSidebar} clientRootUrl = {clientRootUrl} />
        <Sidebar  myClass = {myClass} closeSidebar = {closeSidebar} clientRootUrl = {clientRootUrl} />
        <ScrollToTop />
        <Switch>
          <Route path = "/login" component = { ()=><Login apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  token = {token} errorMessage = {errorMessage} verifyAuth = {verifyAuth} />} /> 
          <Route path = "/" exact = {true} component = {()=><Home apiRootUrl = {apiRootUrl}  token = {token} requireAuth = {requireAuth} />}/>
          <Route path = "/users" exact = {true} component = {()=><Users apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} />} />
          <Route path = "/user/:userId" exact = {true} component = {({match})=><UserDetails apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} match = {match} errorMessage = {errorMessage} />} />
          <Route path = "/create-category" exact = {true} component = {()=><CreateCategory apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} />} /> {/** redirect to categorydetails */}
          <Route path = "/category/:categoryId" exact = {true} component = {({match})=><CategoryDetails apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} match = {match} />} />
          <Route path = "/product/:productId" exact = {true} component = {({match})=><ProductDetails apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} match = {match} />} />
          <Route path = "/categories" exact = {true} component = {()=><Categories apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} />}  />
          <Route path = "/add-product" exact = {true} component = {({location})=><AddProduct apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} location = {location} />} />
          <Route path = "/orders" exact = {true} component = {()=><Orders apiRootUrl = {apiRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage}/>} />
          <Route path = "/order/:orderId" exact = {true} component = {({match})=><OrderDetails apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} match = {match} />} />
          <Route path = "/update/order/:orderId" exact = {true} component = {({match})=><OrderUpdate apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} match = {match} />} />
          <Route path = "/logout" exact = {true} component = {Logout} />
          <Route path = "/search" exact = {true} component = {({location})=><Search apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} token = {token} requireAuth = {requireAuth} errorMessage = {errorMessage} location = {location} />} />
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