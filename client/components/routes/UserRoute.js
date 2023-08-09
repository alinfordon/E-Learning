import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { SyncOutlined, EditOutlined, PieChartOutlined, DollarOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";
import { Layout, Menu } from "antd";
import Disclaimer from "../home/Disclaimer";


export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["user"])),
    },
  };
}

const { Content, Footer, Header, Sider } = Layout;

const UserRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // router
  const router = useRouter();
  const { t } = useTranslation();

  const onCollapse = collapsed => {
    console.log(collapsed);
    if(collapsed){
      setCollapsed(true);
    }else{
      setCollapsed(false);
    }
  };

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
      <Sider className="d-none d-lg-block" collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="mt-2" />
            <div style={{minHeight: "60px"}}>{!collapsed && <h4 className="text-light text-center pt-2">Subscriber</h4>}</div>
          <Menu theme="dark" defaultSelectedKeys={[current]} mode="inline" >
            <Menu.Item key="/user" onClick={(e) => setCurrent(e.key)}  icon={<PieChartOutlined />}>
              <Link href="/user">
                Dashboard
              </Link>
              </Menu.Item>    
            <Menu.Item key="/user/edit" onClick={(e) => setCurrent(e.key)}  icon={<EditOutlined />}>
              <Link href="/user/edit">
              {t("user:edit-user")}
              </Link>
            </Menu.Item> 
          </Menu>
        </Sider>  
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
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
            <Content style={{ margin: '16px 16px' }}>  
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {children}
              </div>
            </Content>
          )}      
        <Footer style={{ textAlign: 'center' }}>
          <Disclaimer />
          <hr />
          --© {(new Date().getFullYear())} WebNode, All Rights Reserved</Footer> 
      </Layout>  
    </Layout>
  );
};

export default UserRoute;
