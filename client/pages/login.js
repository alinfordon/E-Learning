import { useState, useContext, useEffect } from "react";
import { Layout } from 'antd';
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../components/TopNav";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["Login", "home"])),
    },
  };
}

const { Content, Footer, Header } = Layout;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;

  // router
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/user");
      // setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Header style={{ padding: 0}}>
        <TopNav 
            becomeInstructor={t("Login:become-instructor")} 
            onlineCourse={t("Login:online-course")} 
            login={t("Login:login")} 
            register={t("Login:register")} 
            logoutT={t("Login:logout")}
            dashboard={t("Login:dashboard")}
        />
      </Header>
      <h1 className="jumbotron text-center bg-primary square">{t('Login:login')}</h1>
      <Content style={{ padding: '0 50px'}}>  
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Login:enter-email')}
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('Login:enter-password')}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : t('Login:submit')}
          </button>
        </form>

        <p className="text-center pt-3">
        {t('Login:not-yet-registered')}{" "}
          <Link href="/register">
            <a>{t('Login:register')}</a>
          </Link>
        </p>

        <p className="text-center">
          <Link href="/forgot-password">
            <a className="text-danger">{t('Login:forgot-password')}</a>
          </Link>
        </p>
      </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>--© {(new Date().getFullYear())} WebNode, All Rights Reserved</Footer>
    </Layout>
  );
};

export default Login;
