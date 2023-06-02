import { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import user from "../../server/models/user";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../components/TopNav";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register"])),
    },
  };
}

const { Content, Footer, Header } = Layout;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
    setLanguage(router.locale.toString());
  }, [user]);

  console.log(language)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        language,
        email,
        password,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Registration successful. Please login.");
      setName("");
      setEmail("");
      setLanguage("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Header style={{ padding: 0}}>
        <TopNav 
            becomeInstructor={t("register:become-instructor")} 
            onlineCourse={t("register:online-course")} 
            login={t("register:login")} 
            register={t("register:register")} 
            logoutT={t("register:logout")}
            dashboard={t("register:dashboard")}
        />
      </Header>
      <h1 className="jumbotron text-center bg-primary square">{t("register:register")}</h1>
      <Content style={{ padding: '0 50px'}}> 
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("register:enter-name")}
            required
          />

          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("register:enter-email")}
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("register:enter-password")}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : t("register:submit")}
          </button>
        </form>

        <p className="text-center p-3">
        {t("register:already-registered")}{" "}
          <Link href="/login">
            <a>{t("register:login")}</a>
          </Link>
        </p>
      </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>--© {(new Date().getFullYear())} WebNode, All Rights Reserved</Footer>
    </Layout>
  );
};

export default Register;
