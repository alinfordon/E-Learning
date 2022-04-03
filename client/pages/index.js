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



const { Option } = Select;
const { Content, Footer, Header } = Layout;

const Index = ({courses}) => {
  const router = useRouter();
  const { t } = useTranslation();
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
        <Header style={{ padding: 0}}>
        <TopNav 
              becomeInstructor={t("home:become-instructor")} 
              onlineCourse={t("home:online-course")} 
              login={t("home:login")} 
              register={t("home:register")} 
              logoutT={t("home:logout")}
              dashboard={t("home:dashboard")}
              instructorT={t("home:instructor")}
              createCourse={t("home:create-course")}
        />
      </Header>
      <HomeBaner /> 
      <OurCourses />     
      <Content style={{ padding: '0 50px'}}>    
        
      </Content>
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
