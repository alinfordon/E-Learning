import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";
import { Layout } from "antd";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navigation"])),
    },
  };
}

const { Content, Footer, Header } = Layout;

const StudentRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();
  const { t } = useTranslation();

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
              createCourse={t("navigation:create-course")} 
              onlineCourse={t("navigation:online-course")} 
              instructorT={t("navigation:instructor")} 
              becomeInstructor={t("navigation:become-instructor")} 
              logoutT={t("navigation:logout")}
              dashboard={t("navigation:dashboard")}
        />
      </Header>      
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">{children}</div>
      )}     
    </Layout>    
  );
};

export default StudentRoute;
