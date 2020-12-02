import React, { Fragment, useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';

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
                <h1>Hello Precious</h1>
                <p>Welcome to your admin dashboard</p>
              </div>
            </div>

            <div className = "main__cards">
              <div className = "card">
                <i className = "fas fa-user fa-2x text text-lightblue"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Number of Users</p>
                  <big><b>{data.users}</b></big>
                  {/* <span className = "font-bold text-title">578</span> */}
                </div>
              </div>

              <div className = "card">
                <i className = "fas fa-burn fa-2x text-red"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Number of Orders</p>
                  <big><b>{data.orders}</b></big>
                  {/* <span className = "font-bold text-title">2478</span> */}
                </div>
              </div>


              <div className = "card">
                <i className = "fas fa-video fa-2x text-yellow"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Fulfilled Orders</p>
                  <big><b>{data.fulfilledOrders}</b></big>
                  {/* <span className = "font-bold text-title">340</span> */}
                </div>
              </div>

              <div className = "card">
                <i className = "fas fa-video fa-2x text-yellow"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Pending Orders</p>
                  <big><b>{data.pendingOrders}</b></big>
                  {/* <span className = "font-bold text-title">340</span> */}
                </div>
              </div>

              <div className = "card">
                <i className = "fa fa-thumbs-up fa-2x text-green"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Cancelled Orders</p>
                  <big><b>{data.cancelledOrders}</b></big>
                  {/* <span className = "font-bold text-title">645</span> */}
                </div>
              </div>

              <div className = "card">
                <i className = "fas fa-user fa-2x text text-lightblue"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Number of Categories</p>
                  <big><b>{data.categories}</b></big>
                  {/* <span className = "font-bold text-title">578</span> */}
                </div>
              </div>

              <div className = "card">
                <i className = "fas fa-user fa-2x text text-lightblue"></i>
                <div className = "card__inner">
                  <p className = "text-primary">Number of Products</p>
                  <big><b>{data.products}</b></big>
                  {/* <span className = "font-bold text-title">578</span> */}
                </div>
              </div>
                        
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
