import React, {useEffect,useState} from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Account from './pages/Account/Account';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home'
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';
import Categories from './pages/Categories/Categories';
import Search from './pages/Search/Search';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ErrorPage from './pages/ErrorPage/ErrorPage'
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Orders from './pages/Orders/Orders'
import Order from './pages/Order/Order'
import axios from 'axios'
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Verify from './pages/Verify/Verify';
import './App.css'
import Logout from './pages/Logout/Logout';
import { LastLocationProvider } from 'react-router-last-location';


export const UserContext = React.createContext();
export const PageContext = React.createContext();


function App() {
    
  const title = "FoodNet"; // FoodNet
  const clientRootUrl = "http://localhost:3000/";
  const apiRootUrl = "http://localhost:9000/";
  const email = "support@foodnet.ng";

  const token = localStorage.getItem('wpt');
  const [loggedInStatus, setLoggedInStatus] = useState(null);

  useEffect(() => {
    
    if(token) {
      // verify token
      axios(`${apiRootUrl}user/verify`, {
        headers: {
          'Authorization':`Basic ${token}`
        }
      })
      .then(res=>{
        console.log(res.data)
        if(res.data.valid === 1) {
          // user is valid
          setLoggedInStatus(true);
        } else {
          setLoggedInStatus(false);
        }
      })
      .catch(err=>{
        // error
        setLoggedInStatus(false);
      })
    } else {
      setLoggedInStatus(false);
    }

  }, [token])

  
  function updateLogStatus(status) {
    setLoggedInStatus(status);
    console.log(status)
  }

  return (
    <React.Fragment>
        <Router>
          <LastLocationProvider>
          <ScrollToTop />
          <Switch>
            <Route path = "/" exact = {true} component = {({match})=>(
              // <UserContext.Provider value = {loggedInStatus}>
                <Home loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  match = {match}  />
              // </UserContext.Provider>
            )} />

            <Route path = "/categories" exact = {true} component = {({match})=><Categories loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  match = {match} />} />


            <Route path = "/about" exact = {true} component = {({match})=><About loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} /> }  />

            <Route path = "/contact" exact = {true} component = {({match})=><Contact loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} email = {email}match = {match} />} />

            <Route path = "/search" exact = {true} component = {({location,match})=><Search loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} location = {location} match = {match} />} email = {email} updateLogStatus = {updateLogStatus} />

            <Route path = "/category/:categoryId" exact = {true} component = {({match})=>(<CategoryDetails loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} />)} />
            {/* categories --> all categories(4 per one) -> see all */}

            <Route path = "/product/:productId/:categoryId" exact = {true} component = {({match})=>(<ProductDetails loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} loggedInStatus = {loggedInStatus} />)}  /> 

            <Route path = "/forgot_password" exact = {true} component = {({match})=><ForgotPassword title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} match = {match} />} />

            <Route path = "/reset_password/:email/:token" exact = {true} component = {({match})=><ResetPassword loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} />} />

            <Route path = "/cart" exact = {true} component = {({match})=><Cart loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} match = {match} />} />

            <Route path = "/orders" exact = {true} component = {({match})=><Orders loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} match = {match} />} />

            <Route path = "/order/:orderId" exact = {true} component = {({match})=><Order loggedInStatus = {loggedInStatus} title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} match = {match} />}  />

            <Route path = "/products" exact = {true} component = {({match})=><Products loggedInStatus = {loggedInStatus} title = {title} clientRootUrl = {clientRootUrl} match = {match} />} />

            <Route path = "/product-details" exact = {true} component = {({match})=><ProductDetails loggedInStatus = {loggedInStatus} title = {title} clientRootUrl = {clientRootUrl} match = {match} />} />

            <Route path = "/account" exact = {true} component = {({match})=><Account title = {title} clientRootUrl = {clientRootUrl} apiRootUrl = {apiRootUrl} match = {match} loggedInStatus = {loggedInStatus} />  } />

            <Route path = "/verify/:email/:token" exact = {true} component = {({match})=><Verify title = {title} clientRootUrl = {clientRootUrl} apiRootUrl = {apiRootUrl} match = {match} loggedInStatus = {loggedInStatus} />} />

            <Route path = "/logout" exact = {true} component = {(v)=><Logout title = {title} clientRootUrl = {clientRootUrl} apiRootUrl = {apiRootUrl} loggedInStatus = {loggedInStatus} v = {v} />} />

            {/* <Route render = {()=><ErrorPage error = {404} />} /> */}
            
            <Route render = {()=><ErrorPage title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus}  />} />
            
          </Switch>
          </LastLocationProvider>
        </Router>
      <Footer title = {title} clientRootUrl = {clientRootUrl}/>
    </React.Fragment>
  );
}

export default App;