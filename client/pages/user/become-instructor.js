import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button, Layout } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../../components/TopNav";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["become"])),
    },
  };
}

const { Content, Footer, Header } = Layout;

const BecomeInstructor = (props) => {
  // state
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  

  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Header style={{ padding: 0}}>
        <TopNav 
            becomeInstructor={t("become:become-instructor")} 
            onlineCourse={t("become:online-course")} 
            login={t("become:login")} 
            register={t("become:register")} 
            logoutT={t("become:logout")}
            dashboard={t("become:dashboard")}
        />
      </Header>
      <h1 className="jumbotron text-center square">{t("become:become-instructor")}</h1>
      <Content style={{ padding: '0 50px'}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>{t("become:setup-payout")}</h2>              
              <p className="lead text-warning">
              {t("become:partners")}
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : t("become:payout-setup")}
              </Button>

              <p className="lead">
              {t("become:will-be-redirected")}
              </p>
            </div>
          </div>
        </div>
      </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>--© {(new Date().getFullYear())} WebNode, All Rights Reserved</Footer>
    </Layout>
  );
};

export default BecomeInstructor;
