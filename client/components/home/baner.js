import React from "react";

const HomeBaner = () => {


    return(
        <div className="main-banner-two">
            <div className="d-table">
                <div className="d-table-cell">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="main-banner-content">
                                    <h1>Free online courses</h1>
                                    <p>Enter the online educational platform, dedicated to everyone for free, 
                                        and you will receive the support and information you lacked to fulfill your dreams!</p>
                                    <div className="banner-btn">
                                        <a className="default-btn-one" href="/user">E-Learning Platform<span></span></a>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="creative-shape">
                    <img src="/images/home-shape-2-45ee2697b879b410f36107f5fc7773ee.png" alt="main-image"/>
                </div>
                <div className="shape-img1">
                    <img style={{borderRadius: '100%', height: '600px'}}  src="/images/happy-children.jpg" alt="main-image"/>
                </div>                
        </div>
    )
}

export default HomeBaner;