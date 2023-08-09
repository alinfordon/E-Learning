import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";
import { Layout } from "antd";
import Disclaimer from "../home/Disclaimer";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["default"])),
    },
  };
}

const { Content, Footer, Header } = Layout;

const StudentRoute = ({ children, showNav = true }) => {
  // state
  const { t } = useTranslation();
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();
 

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>   
      <Header style={{ padding: 0}}>
        <TopNav 
              createCourse={t("user:create-course")} 
              onlineCourse="Online Module" 
              instructorT="Instructor" 
              becomeInstructor={t("user:become-instructor")} 
              logoutT="Logout"
              dashboard="Dashboard"
        />
      </Header>      
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">{children} </div>
      )}  
       
      <Footer style={{ textAlign: 'center', marginTop: 25 }}>
      <Disclaimer />
        <hr />  
        --© {(new Date().getFullYear())} Rainbo Project, All Rights Reserved
      
      </Footer> 
    </Layout>    
  );
};



export default StudentRoute;
