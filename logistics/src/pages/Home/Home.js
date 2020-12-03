import React, { Fragment, useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

function Home({requireAuth,apiRootUrl,token}) {

   
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    axios.get(`${apiRootUrl}miscellaneous/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({data})=>{
      setLoading(false);
      setData(data);
    }).catch(err=>{
      setLoading(false);
    })
  }, [apiRootUrl])

  return (
    <Fragment>
        {requireAuth()}
        {loading&&<Loader/>}
        <main>
          <div className = "main__container">
            <div className = "main__title">
              <img src = "assets/images/hello.svg" />
              <div className = "main_greeting">
                <h1>Hello Admin</h1>
                <p>Welcome to your dashboard</p>
              </div>
            </div>

            <div className = "main__cards">

              <Link to = "/" className = "d">
                <div className = "card">
                  <i className = "fas fa-burn fa-2x text-red"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Total Orders</p>
                    <big><b>{data.orders}</b></big>
                  </div>
                </div>
              </Link>

              <Link to = "/pending-orders" className = "d">
                <div className = "card">
                  <i className = "fas fa-bone fa-2x text-yellow"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Pending Orders</p>
                    <big><b>{data.pendingOrders}</b></big>
                  </div>
                </div>
              </Link>
          
              <Link to = "/fulfilled-orders" className = "d">
                <div className = "card">
                  <i className = "fas fa-book-reader fa-2x text-red"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Fulfilled Orders</p>
                    <big><b>{data.fulfilledOrders}</b></big>
                  </div>
                </div>
              </Link>

              <Link to = "/cancelled-orders" className = "d">
                <div className = "card">
                  <i className = "fas fa-brain fa-2x text-green"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Cancelled Orders</p>
                    <big><b>{data.cancelledOrders}</b></big>
                  </div>
                </div>
              </Link>

            </div>

            {/* <div className = "charts">
              
              <div className = "charts__left">
                <div className = "charts__left__title">
                  <div>
                    <h1>Daily Reports</h1>
                    <p>Cupertino, California, USA</p>
                  </div>
                </div>
                <div className = "charts__right__cards">
                  <div className = "card1">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>

                  <div className = "card2">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>

                  <div className = "card3">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>

                  <div className = "card4">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>
                </div>


              </div>
              
              <div className = "charts__right">
                  <div className = "charts__right__title">
                    <div>
                      <h1>Daily Reports</h1>
                      <p>Cupertino, California, USA</p>
                    </div>
                  </div>

                <div className = "charts__right__cards">
                  <div className = "card1">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>

                  <div className = "card2">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>

                  <div className = "card3">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>

                  <div className = "card4">
                    <h1>Income</h1>
                    <p>$75,300</p>
                  </div>
                </div>
              </div>

            </div> */}



        </div>  
      </main>
    </Fragment>
    )
}

export default Home
