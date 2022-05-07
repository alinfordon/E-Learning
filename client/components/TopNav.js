import { useState, useEffect, useContext } from "react";
//const fs = require('fs');
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  ShopOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LanguageSwitcher from "./nav/LanguageSwitcher";
import Register from "../pages/register";



const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = ({becomeInstructor, createCourse, instructorT, onlineCourse, login, register, dashboard, logoutT}) => {
  const [current, setCurrent] = useState("");
  
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[current]}
      className="mb-2"
      
    >      
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      <Item
        key="/course/shop"
        onClick={(e) => setCurrent(e.key)}
        icon={<ShopOutlined />}
      >
        <Link href="/course/shop">
          <a>{onlineCourse}</a>
        </Link>
      </Item>
      
      {user && user.role && user.role.includes("999U999") && (
        <Item
          key="/admin"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/admin">
            <a>Admin Staff</a>
          </Link>
        </Item>
      )}
      
      
      {user === null && (
        <>
          <Item
            className="float-right"
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>{register}</a>
            </Link>
          </Item>

          <Item
            className="float-right"
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>{login}</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <a>{dashboard}</a>
              </Link>
            </Item>
            {user && user.role && user.role.includes("Instructor") && (
            <Item
              key="/instructor"
              onClick={(e) => setCurrent(e.key)}
              //icon={<TeamOutlined />}
              //className="float-right"
            >
              <Link href="/instructor">
                <a>{instructorT}</a>
              </Link>
            </Item>
      )}
            <Item onClick={logout}>{logoutT}</Item>
          </ItemGroup>
        </SubMenu>
      )}      
    </Menu>
  );
};

export default TopNav;
// <Item className="float-right" style={{float: "right"}}><LanguageSwitcher /></Item>