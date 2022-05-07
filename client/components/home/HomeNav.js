import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";




const HomeNav = () => {
    const [toggle, setToggle] = useState(false);

    console.log(toggle)
    return(
        <>
            <div id="navbar" className="navbar-area">
                <div className="main-nav">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">                           
                                <img src="/images/rainbo_logo-194x85.png" className="white-logo" alt="logo" />                            
                            <button onClick={() => setToggle(!toggle)} className={"navbar-toggler navbar-toggler-right collapsed"} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={toggle ? "collapsed navbar-collapse" : "collapse navbar-collapse"} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#home">Home </a>                                       
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link" href="#about">About us</a>
                                    </li>
                                       
                                    <li className="nav-item">
                                        <a className="nav-link" href="#projects">Projects </a>                                        
                                    </li>  
                                    <li className="nav-item">
                                        <a className="nav-link" href="#contact">Contact Us</a>
                                    </li>
                                </ul>
                                <div className="others-options">
                                <Link href="/user"><a className="default-btn">E-Learnig Platform<span></span></a></Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeNav;