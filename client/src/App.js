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

function App() {
    
  const title = "Restful Market";
  const clientRootUrl = "http://localhost:3000/";
  const apiRootUrl = "http://localhost:9000/";

  const token = localStorage.getItem('myToken');
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
      
  }, [token])

  return (
    <React.Fragment>
        <Router>
          <ScrollToTop />
          <Switch>
            
            <Route path = "/" exact = {true} component = {()=>(<Home title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} />
            )} />

            <Route path = "/categories" exact = {true} component = {()=><Categories title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} />} />

            <Route path = "/search" exact = {true} component = {({location})=><Search title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} location = {location} />} />

            <Route path = "/category/:categoryId" exact = {true} component = {(match)=>(<CategoryDetails title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} />)} />
            {/* categories --> all categories(4 per one) -> see all */}

            <Route path = "/product/:productId/:categoryId" exact = {true} component = {(match)=>(<ProductDetails title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} />)}  /> 

            <Route path = "/forgot_password" exact = {true} component = {()=><ForgotPassword title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} />} />

            <Route path = "/reset_password/:email/:token" exact = {true} component = {({match})=><ResetPassword title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} match = {match} />} />

            <Route path = "/cart" exact = {true} component = {()=><Cart title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} />} />


            <Route path = "/orders" exact = {true} component = {()=><Orders title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} />} />

            <Route path = "/order/:orderId" exact = {true} component = {()=><Order title = {title} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl}  />} />

            <Route path = "/products" exact = {true} component = {()=><Products title = {title}/>} clientRootUrl = {clientRootUrl} />

            <Route path = "/product-details" exact = {true} component = {()=><ProductDetails title = {title} clientRootUrl = {clientRootUrl} />} />

            <Route path = "/account" exact = {true} component = {()=><Account title = {title} clientRootUrl = {clientRootUrl} />} />

            {/* <Route render = {()=><ErrorPage error = {404} />} /> */}
            
            <Route render = {()=><ErrorPage title = {title} clientRootUrl = {clientRootUrl} />} />
            
          </Switch>
        </Router>
      <Footer title = {title} clientRootUrl = {clientRootUrl}/>
    </React.Fragment>
  );
}

export default App;