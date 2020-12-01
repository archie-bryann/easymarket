import React, { Fragment } from 'react'
import './Main.css'

function Main({requireAuth}) {
    return (
      <Fragment>
          {requireAuth()}
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
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">578</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fas fa-burn fa-2x text-red"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Orders</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">2478</span> */}
                  </div>
                </div>


                <div className = "card">
                  <i className = "fas fa-video fa-2x text-yellow"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Categories</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">340</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fa fa-thumbs-up fa-2x text-green"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Products</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">645</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fas fa-user fa-2x text text-lightblue"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Users</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">578</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fas fa-burn fa-2x text-red"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Orders</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">2478</span> */}
                  </div>
                </div>


                <div className = "card">
                  <i className = "fas fa-video fa-2x text-yellow"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Categories</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">340</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fa fa-thumbs-up fa-2x text-green"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Products</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">645</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fas fa-user fa-2x text text-lightblue"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Users</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">578</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fas fa-burn fa-2x text-red"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Orders</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">2478</span> */}
                  </div>
                </div>


                <div className = "card">
                  <i className = "fas fa-video fa-2x text-yellow"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Categories</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">340</span> */}
                  </div>
                </div>

                <div className = "card">
                  <i className = "fa fa-thumbs-up fa-2x text-green"></i>
                  <div className = "card__inner">
                    <p className = "text-primary">Number of Products</p>
                    <big><b>340</b></big>
                    {/* <span className = "font-bold text-title">645</span> */}
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

export default Main
