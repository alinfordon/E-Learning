import { useState, useEffect } from "react";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";
import { Layout, Menu, Avatar } from "antd";
import { SyncOutlined, CheckCircleFilled, MinusCircleFilled, DollarOutlined } from "@ant-design/icons";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["Login", "home"])),
    },
  };
}

const { Content, Footer, Header, Sider } = Layout;
const { Item } = Menu;

const StudentNav = ({clicked, setClicked, course, completedLessons }) => {  
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    console.log(collapsed);
    if(collapsed){
      setCollapsed(true);
    }else{
      setCollapsed(false);
    }
  };
 
  return (
    
        <Sider className="d-none d-lg-block" theme="light"  collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="mt-2" />
        <div >{!collapsed && <h4 className="text-light text-center pt-2">Student</h4>}</div>
            <Menu theme="dark" defaultSelectedKeys={[clicked]} mode="inline"  >
                {course.lessons.map((lesson, index) => (
                        <Item
                            onClick={() => setClicked(index)}
                            key={index}
                            icon={<Avatar>{index + 1}</Avatar>}
                        >
                            {lesson.title.substring(0, 30)}{" "}
                            {completedLessons.includes(lesson._id) ? (
                            <CheckCircleFilled
                                className="float-right text-primary ml-2"
                                style={{ marginTop: "13px" }}
                            />
                            ) : (
                            <MinusCircleFilled
                                className="float-right text-danger ml-2"
                                style={{ marginTop: "13px" }}
                            />
                            )}
                        </Item>
                    ))}   
            </Menu>
        </Sider>  
    
  );
};

export default StudentNav;
