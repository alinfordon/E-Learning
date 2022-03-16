import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";


export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["user"])),
      },
    };
  }


const AdminIndex = () => {
    const { t } = useTranslation();
    const {
        state: { user },
      } = useContext(Context);
      const [loading, setLoading] = useState(false);


    return(
        <AdminRoute>
            {loading && (
            <SyncOutlined
                spin
                className="d-flex justify-content-center display-1 text-danger p-5"
            />
            )}
            <h1 className="text-center p-4">{t("user:user-dashboard")}</h1>
        </AdminRoute>
    )
}

export default AdminIndex;