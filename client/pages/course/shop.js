import { useState, useEffect } from "react";
import { Select, Layout, Menu, Breadcrumb } from 'antd';
import axios from "axios";
import CourseCard from "../../components/cards/CourseCard";
import ModuleCard from "../../components/cards/ModuleCard";
import { useRouter } from "next/router";
import Link from "next/link";
import locale from "antd/lib/date-picker/locale/en_US";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../../components/TopNav";




const { Option } = Select;
const { Content, Footer, Header } = Layout;

const Shop = ({courses}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [modules, setModules] = useState([]);
  const [modul, setModul] = useState("Module 1");
  const [isModules, isSetModules] = useState(true);

   useEffect(() => {
     const fetchModules = async () => {
       const { data } = await axios.get("/api/categorys");
       setModules(data);
     };
     fetchModules();
   }, []);

   console.log(modules)

   const filteredModuleByLanguage = modules.filter(filteredModule =>{
    return  router.locale.toString() === filteredModule.language;             
  }, []);

  const filteredByLanguage = courses.filter(filteredCourse =>{
    return  router.locale.toString() === filteredCourse.language;             
  }, []);

  const filteredByModule = filteredByLanguage.filter(filteredCourse =>{
    return  modul === filteredCourse.category;             
  }, []);


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
      <h1 className="jumbotron text-center ">
      {t("home:online-education-marketplace")}
      </h1>
      <Content style={{ padding: '0 50px'}}>    
         
      <div className="container-fluid">
        <div className="row dflex justify-content-around">
          {isModules ? 
           filteredModuleByLanguage.map((module) => (
            <div key={module._id} className=" ">
              <ModuleCard module={module} isSetModules={isSetModules} setModul={setModul} />
            </div>
          ))
          : 
          filteredByModule.map((course) => (
            <div key={course._id} className="">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        {!isModules && <button className="button-q mb-4 mt-4" onClick={(e) => isSetModules(true)}> Back to Module </button>}        
      </div>     
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
        --© {(new Date().getFullYear())} Rainbo Project, All Rights Reserved
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

export default Shop;
