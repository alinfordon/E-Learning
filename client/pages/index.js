import { useState, useEffect } from "react";
import { Select, Layout, Menu, Breadcrumb } from 'antd';
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
import HomeNav from "../components/home/HomeNav";



const { Option } = Select;
const { Content, Footer, Header } = Layout;

const Index = ({courses}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      console.log(window.scrollY)
      isTop = window.scrollY < 300;      
          setIsTop(!isTop)      
    });
  }, [isTop]);

  console.log(isTop)
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
            <div id="home"><HomeBaner /></div>
            <div id="about"><AboutUs /></div>
            <div id="projects"><OurProjects  />  </div>  
      <Content>    
        
      </Content>
      <div id="partners"><OurPartners  />  </div>
      <Footer style={{ textAlign: 'center' }}> 
      <ul className="nav justify-content-end">
              {router.locales.map((locale) => (
                <li className="nav-item" key={locale}>
                  <Link href={router.asPath} locale={locale}>
                    <a className="nav-link">{locale}</a>  
                  </Link>  
                </li>
              ))}
        </ul>
        --© {(new Date().getFullYear())} WebNode, All Rights Reserved
      </Footer>
    </Layout>    
  );
};


export async function getServerSideProps({locale}) {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}

export default Index;
