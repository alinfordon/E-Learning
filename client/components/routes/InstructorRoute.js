import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { SyncOutlined, EditOutlined, PieChartOutlined, QuestionCircleOutlined  } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";
import { Layout, Menu } from "antd";


export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navigation"])),
    },
  };
}

const { Content, Footer, Header, Sider } = Layout;
const { Item, SubMenu, ItemGroup } = Menu;

const InstructorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // router
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const onCollapse = collapsed => {
    console.log(collapsed);
    if(collapsed){
      setCollapsed(true);
    }else{
      setCollapsed(false);
    }
  };

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      console.log("INSTRUCTOR ROUTE => ", data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>  
     <Sider className="d-none d-lg-block" collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="mt-2" />
          <div style={{minHeight: "60px"}}>{!collapsed && <h4 className="text-light text-center pt-2">Instructor</h4>}</div>
        <Menu theme="dark" defaultSelectedKeys={[current]} mode="inline" >
          <Item key="/instructor" onClick={(e) => setCurrent(e.key)}  icon={<PieChartOutlined />}>
            <Link href="/instructor">
              Dashboard
            </Link>
          </Item>
          <SubMenu icon = {<EditOutlined />} title = "Courses">
            <Item key="/instructor/course" onClick={(e) => setCurrent(e.key)}>
              <Link href="/instructor/course" >              
                My Courses           
              </Link>
            </Item> 
            <Item key="/instructor/course/category" onClick={(e) => setCurrent(e.key)}>
              <Link href="/instructor/course/category" >              
                Create Module           
              </Link>
            </Item> 
            <Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)}>
              <Link href="/instructor/course/create" >              
                Create Course           
              </Link>
            </Item> 
          </SubMenu>
          <SubMenu icon = {<QuestionCircleOutlined />} title = "Quizz">
          <Item key="/instructor/quizz" onClick={(e) => setCurrent(e.key)}>
              <Link href="/instructor/quizz" >              
                My Quizz           
              </Link>
            </Item> 
            <Item key="/instructor/quizz/create" onClick={(e) => setCurrent(e.key)}>
              <Link href="/instructor/quizz/create" >              
                Create New Quizz           
              </Link>
            </Item> 
          </SubMenu>
        </Menu>
      </Sider> 
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
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
              <Content style={{ margin: '16px 16px' }}>  
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {children}
              </div>
            </Content>
        )}
        <Footer style={{ textAlign: 'center' }}>--© {(new Date().getFullYear())} Rainbo, All Rights Reserved</Footer> 
      </Layout>
    </Layout>
  );
};

export default InstructorRoute;
