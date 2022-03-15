import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";
import { Layout } from "antd";


export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["user"])),
    },
  };
}

const { Content, Footer, Header } = Layout;

const UserRoute = ({ children, showNav = true }) => {
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
              createCourse={t("user:create-course")} 
              onlineCourse={t("user:online-course")} 
              instructorT={t("user:instructor")} 
              becomeInstructor={t("user:become-instructor")} 
              logoutT={t("user:logout")}
              dashboard={t("user:user-dashboard")}
        />
      </Header>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <Content style={{ padding: '0 50px'}}> 
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{showNav && <UserNav dashboard={t("user:user-dashboard")} />}</div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
        </Content>
        )}        
    </Layout>
  );
};

export default UserRoute;
