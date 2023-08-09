import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  SyncOutlined, 
  EditOutlined,
  PieChartOutlined,
  FileOutlined,
  QrcodeOutlined,
  MenuOutlined, } from "@ant-design/icons";
import AdminNav from "../nav/AdminNav";
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

const AdminRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // router
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    fetchUser();
  }, []);

  const onCollapse = collapsed => {
    console.log(collapsed);
    if(collapsed){
      setCollapsed(true);
    }else{
      setCollapsed(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-admin");
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
          <div className="logo" />
          <div style={{minHeight: "60px"}}>{!collapsed && <h4 className="text-light text-center pt-2">Admin</h4>}</div>
          <Menu theme="dark" defaultSelectedKeys={[current]} mode="inline" >
            <Menu.Item key="/admin" onClick={(e) => setCurrent(e.key)}  icon={<PieChartOutlined />}>
            <Link href="/admin">
              Dashboard
            </Link>
            </Menu.Item>              
            <Menu.Item key="/admin/create-instructor" onClick={(e) => setCurrent(e.key)} icon={<EditOutlined />}>
            <Link href="/admin/create-instructor" >              
                User Rights            
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
      <Content style={{ margin: '16px 16px' }}>  
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Disclaimer />
        <hr />
        --© {(new Date().getFullYear())} Rainbo, All Rights Reserved</Footer>   
      </Layout>   
    </Layout>
  );
};

export default AdminRoute;
