import { useState, useEffect } from "react";
import { Select, Layout, Modal, Breadcrumb } from 'antd';
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import { useRouter } from "next/router";
import Link from "next/link";
import locale from "antd/lib/date-picker/locale/en_US";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../components/TopNav";
import HomeBaner from "../components/home/baner";
import OurCourses from "../components/home/OurCourses";
import AboutUs from "../components/home/AboutUs";
import OurProjects from "../components/home/OurProjects";
import OurPartners from "../components/home/OurPartners";
import Contact from "../components/home/Contact";
import Disclaimer from "../components/home/Disclaimer";
import HomeNav from "../components/home/HomeNav";
import { FacebookFilled , TwitterSquareFilled , FacebookOutlined, TwitterOutlined } from "@ant-design/icons";



const { Option } = Select;
const { Content, Footer, Header } = Layout;

const Index = ({courses}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const [isTop, setIsTop] = useState(false);  
  const { pathname, asPath, query } = router


  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      //console.log(window.scrollY)
      isTop = window.scrollY < 300;      
          setIsTop(!isTop)      
    });
  }, [isTop]);

  function handleChange(value) {    
    //locale={value};       
    router.push({ pathname, query }, asPath, { locale: value })
  }

  console.log("LOCAL", router.locale)
/*
  const [courses, setCourses] = useState([]);

   useEffect(() => {
     const fetchCourses = async () => {
       const { data } = await axios.get("/api/courses");
       setCourses(data);
     };
     fetchCourses();
   }, []);
*/
  return (    
    <Layout style={{ minHeight: '100vh' }}>   
    <div id="navbar" className={isTop ? "navbar-area is-sticky" : "navbar-area" }>
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
                                        <a className="nav-link" href="#home">{t('homepage:home')} </a>                                       
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link" href="#about">{t('homepage:about-us')}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#projects">{t('homepage:about-project')} </a>                                        
                                    </li>  
                                    <li className="nav-item">
                                        <a className="nav-link" href="#contact">{t('homepage:contact-us')}</a>
                                    </li>
                                    <li  className="">
                                    <Select className="nav-language" defaultValue={router.locale.toString()} style={{ width: 80 }} onChange={handleChange}>
                                    {router.locales.map((locale) => (
                                      <Option value={locale} className="nav-item text-dark" key={locale}>
                                        {locale}
                                      </Option>
                                    ))}                                      
                                    </Select>
                                    </li>
                                </ul>
                                <div className="others-options">
                                <Link href="/course/shop"><a className="default-btn">{t('homepage:e-learning')}<span></span></a></Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>    
            <div id="home"><HomeBaner /></div>
            <div id="about"><AboutUs /></div>
            <div id="projects"><OurProjects  /></div>  
            <div id="partners"><OurPartners  />  </div>
            <div id="contact"><Contact  />  </div>      
      <Footer className="footer-root">       
      <section className="footer-section">
        <div className="container">            
            <div className="row">
              <div className="col-md-2">                
                <ul className="list-unstyled">
                    <li><span className="h5"> {t('homepage:follow-us')}: </span></li>                                    
                    <li className="p-2">
                      <a href="https://twitter.com/Ka2Rainbo?fbclid=IwAR1nghwB16-psE6Fd2EtbnBPmvO-kIo2LiQ8NjfwVWx4KhaSfcEUQSVQE2s" target="_blank" > <TwitterSquareFilled   className="h5" /></a>
                      <a href="https://www.facebook.com/Rainboproject" target="_blank"> <span className="ml-2"> <FacebookFilled  className="h5" /> </span></a>
                    </li> 
                    <hr />       
                    <li className="h6"><a href="#">Terms & Conditions</a></li>                                        
                </ul>  
            </div>
            <div className="col-md-10">            
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className="productive-content">                            
                            <div className="section-footer-logo">
                                <img src="/images/eramus.png" className="footer-logo" alt="logo" /> 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">                        
                            <strong>The European Commission support for the production of this publication does not constitute an endorsement of 
                                the contents which reflects the views only of the authors, and the Commission cannot be held responsible for 
                                any use which may be made of the information contained therein.</strong>   
                    </div>
                </div>
            </div>
          </div>
          </div>          
        </div>
        </section>               
        <hr />                 
        <span className="text-center">--© {(new Date().getFullYear())} Rainbo Project, {t('homepage:rights')}</span>
      </Footer>
    </Layout>    
  );
};


export async function getServerSideProps({locale}) {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
      ...(await serverSideTranslations(locale, ["homepage"])),
    },
  };
}

export default Index;
